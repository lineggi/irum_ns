// Astro 서버 엔드포인트 (/api/recognize) — Google Gemini 프록시.
// Vercel 어댑터로 서버리스 함수로 배포된다. API 키는 Vercel 환경변수(GEMINI_API_KEY)에만
// 저장되며 브라우저로 노출되지 않는다.
//
// 모델 ID는 시간이 지나면 바뀌므로, ListModels로 "이 키에서 실제 사용 가능한" 모델을
// 조회해서 tier(flash/pro)에 맞는 최신 모델을 자동 선택한다. (모델 404 문제 방지)

export const prerender = false;

const API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

// tier별 선호 모델 후보 (앞쪽 우선). 목록에 없으면 키워드 매칭으로 대체.
const FLASH_CANDIDATES = [
  'gemini-flash-latest', 'gemini-2.5-flash', 'gemini-2.5-flash-lite',
  'gemini-flash-lite-latest', 'gemini-2.0-flash', 'gemini-1.5-flash',
];
const PRO_CANDIDATES = [
  'gemini-pro-latest', 'gemini-2.5-pro', 'gemini-1.5-pro',
];
// 인식에 부적합한 특수 모델 제외 키워드
const EXCLUDE = /(image|vision|tts|audio|live|thinking|embedding|embed|aqa|exp|preview)/i;

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

async function listModels(apiKey) {
  const r = await fetch(`${API_BASE}/models?key=${encodeURIComponent(apiKey)}&pageSize=1000`);
  if (!r.ok) return { ok: false, status: r.status, text: await r.text() };
  const data = await r.json();
  const models = (data.models || [])
    .filter((m) => (m.supportedGenerationMethods || []).includes('generateContent'))
    .map((m) => (m.name || '').replace(/^models\//, ''))
    .filter(Boolean);
  return { ok: true, models };
}

// 웜 인스턴스에서 모델 목록을 10분간 캐시해 지연·쿼터를 줄인다(인스턴스별 best-effort).
const MODEL_TTL = 10 * 60 * 1000;
let _modelCache = { at: 0, models: null };
async function getModels(apiKey) {
  if (_modelCache.models && (Date.now() - _modelCache.at) < MODEL_TTL) {
    return { ok: true, models: _modelCache.models };
  }
  const listed = await listModels(apiKey);
  if (listed.ok) _modelCache = { at: Date.now(), models: listed.models };
  return listed;
}

function chooseModel(available, tier) {
  const candidates = tier === 'pro' ? PRO_CANDIDATES : FLASH_CANDIDATES;
  for (const c of candidates) {
    if (available.includes(c)) return c;
  }
  const kw = tier === 'pro' ? 'pro' : 'flash';
  const matches = available
    .filter((n) => n.toLowerCase().includes(kw) && !EXCLUDE.test(n))
    .sort((a, b) => b.localeCompare(a, undefined, { numeric: true })); // 최신 버전 우선
  if (matches.length) return matches[0];
  return available[0] || null;
}

// 과부하 등으로 실패할 때 순서대로 시도할 모델 체인(최대 4개)
function buildCandidateChain(available, tier) {
  const kw = tier === 'pro' ? 'pro' : 'flash';
  const chain = [];
  const chosen = chooseModel(available, tier);
  if (chosen) chain.push(chosen);
  const pool = available
    .filter((n) => n.toLowerCase().includes(kw) && !EXCLUDE.test(n))
    .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  for (const m of pool) if (!chain.includes(m)) chain.push(m);
  return chain.slice(0, 4);
}

// 일시적/재시도 가능한 오류인지 (과부하·한도·5xx)
function isRetryable(status, msg) {
  if ([429, 500, 502, 503, 504].includes(status)) return true;
  return /high demand|overload|try again later|unavailable|temporarily|resource has been exhausted/i.test(msg || '');
}

// 진단용: GET /api/recognize?debug=1 → 사용 가능한 모델 목록
export async function GET({ request }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return json({ error: 'GEMINI_API_KEY 미설정' }, 500);
  const url = new URL(request.url);
  if (url.searchParams.get('debug') !== '1') return json({ error: 'POST 요청만 허용됩니다.' }, 405);
  const listed = await listModels(apiKey);
  if (!listed.ok) return json({ error: '모델 목록 조회 실패', status: listed.status }, 502);
  return json({
    count: listed.models.length,
    flash: chooseModel(listed.models, 'flash'),
    pro: chooseModel(listed.models, 'pro'),
    models: listed.models,
  }, 200);
}

export async function POST({ request }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return json({ error: 'GEMINI_API_KEY 환경변수가 설정되지 않았습니다. Vercel 설정에 등록 후 재배포해주세요.' }, 500);
  }

  let body;
  try { body = await request.json(); } catch (e) { body = {}; }

  const tier = body.tier === 'pro' ? 'pro' : 'flash';
  const contents = body.contents;
  const generationConfig = body.generationConfig || { temperature: 0, responseMimeType: 'application/json' };
  if (!contents) return json({ error: '요청 본문에 contents가 없습니다.' }, 400);

  // 1) 사용 가능한 모델 조회 (캐시 사용)
  const listed = await getModels(apiKey);
  if (!listed.ok) {
    let msg = 'HTTP ' + listed.status;
    try { const e = JSON.parse(listed.text); if (e.error && e.error.message) msg = e.error.message; } catch (_) {}
    return json({ error: '모델 목록 조회 실패(키 확인 필요): ' + msg }, 502);
  }
  if (!listed.models.length) {
    return json({ error: '이 API 키로 사용 가능한 인식 모델이 없습니다. 키/프로젝트 설정을 확인해주세요.' }, 502);
  }

  // 2) tier에 맞는 모델 체인 구성 (과부하 시 다음 모델로 폴백)
  const chain = buildCandidateChain(listed.models, tier);
  if (!chain.length) return json({ error: '사용할 모델을 찾지 못했습니다.', available: listed.models.slice(0, 30) }, 502);

  // 3) 체인을 순서대로 시도
  const reqBody = JSON.stringify({ contents, generationConfig });
  let lastMsg = '인식 실패';
  let lastStatus = 502;
  for (const model of chain) {
    try {
      const url = `${API_BASE}/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: reqBody,
      });
      const text = await r.text();
      if (r.ok) {
        return new Response(text, {
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8', 'X-Used-Model': model },
        });
      }
      let msg = 'HTTP ' + r.status;
      try { const e = JSON.parse(text); if (e.error && e.error.message) msg = e.error.message; } catch (_) {}
      lastMsg = `모델 '${model}': ${msg}`;
      lastStatus = r.status;
      if (!isRetryable(r.status, msg)) break; // 재시도 불가 오류면 즉시 중단
      // 과부하 등 → 다음 후보 모델로 계속
    } catch (e) {
      lastMsg = '프록시 처리 오류: ' + String((e && e.message) || e);
      lastStatus = 500;
    }
  }
  const suffix = chain.length > 1 ? ` (${chain.length}개 모델 시도했으나 모두 실패 — 대부분 일시적 과부하이니 잠시 후 다시 시도해주세요)` : '';
  return json({ error: lastMsg + suffix, triedModels: chain }, lastStatus === 404 ? 502 : lastStatus);
}
