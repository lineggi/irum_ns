// Astro 서버 엔드포인트 (/api/recognize) — Google Gemini 프록시.
// Vercel 어댑터로 서버리스 함수로 배포된다. API 키는 Vercel 환경변수(GEMINI_API_KEY)에만
// 저장되며 브라우저로 노출되지 않는다. 브라우저는 이 엔드포인트만 호출한다.
//
// [Vercel 설정] 프로젝트 → Settings → Environments → Production 의
//   Environment Variables 에  GEMINI_API_KEY = (aistudio.google.com/apikey 발급 키)
// 를 추가하고 재배포하면 활성화된다.

export const prerender = false;

const ALLOWED_MODELS = ['gemini-2.5-flash', 'gemini-2.5-pro'];

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

export async function POST({ request }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return json({ error: 'GEMINI_API_KEY 환경변수가 설정되지 않았습니다. Vercel 프로젝트 설정(Environment Variables)에 등록 후 재배포해주세요.' }, 500);
  }

  let body;
  try { body = await request.json(); } catch (e) { body = {}; }

  const model = ALLOWED_MODELS.includes(body.model) ? body.model : 'gemini-2.5-flash';
  const contents = body.contents;
  const generationConfig = body.generationConfig || { temperature: 0, responseMimeType: 'application/json' };

  if (!contents) {
    return json({ error: '요청 본문에 contents가 없습니다.' }, 400);
  }

  try {
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/'
      + encodeURIComponent(model) + ':generateContent?key=' + encodeURIComponent(apiKey);
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents, generationConfig }),
    });
    // Gemini의 응답(성공/에러)을 상태코드와 함께 그대로 전달한다.
    const text = await r.text();
    return new Response(text, {
      status: r.status,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  } catch (e) {
    return json({ error: '프록시 처리 오류: ' + String((e && e.message) || e) }, 500);
  }
}

// GET 등으로 접근 시 안내
export function GET() {
  return json({ error: 'POST 요청만 허용됩니다.' }, 405);
}
