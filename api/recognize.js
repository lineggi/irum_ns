// Vercel 서버리스 함수 — Google Gemini 프록시.
// 손글씨 인식용. API 키는 Vercel 환경변수(GEMINI_API_KEY)에만 저장되며,
// 브라우저로 노출되지 않는다. 브라우저는 이 함수(/api/recognize)만 호출한다.
//
// [Vercel 설정] 프로젝트 → Settings → Environment Variables 에
//   Name: GEMINI_API_KEY   Value: (aistudio.google.com/apikey 에서 발급한 키)
// 를 추가하고 재배포하면 활성화된다.

const ALLOWED_MODELS = ['gemini-2.5-flash', 'gemini-2.5-pro'];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'POST 요청만 허용됩니다.' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error: 'GEMINI_API_KEY 환경변수가 설정되지 않았습니다. Vercel 프로젝트 설정(Environment Variables)에 등록 후 재배포해주세요.',
    });
    return;
  }

  try {
    const body = req.body || {};
    const model = ALLOWED_MODELS.includes(body.model) ? body.model : 'gemini-2.5-flash';
    const contents = body.contents;
    const generationConfig = body.generationConfig || { temperature: 0, responseMimeType: 'application/json' };

    if (!contents) {
      res.status(400).json({ error: '요청 본문에 contents가 없습니다.' });
      return;
    }

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/'
      + encodeURIComponent(model) + ':generateContent?key=' + encodeURIComponent(apiKey);

    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents, generationConfig }),
    });

    const data = await r.json();
    // Gemini의 응답(성공/에러)을 그대로 상태코드와 함께 전달한다.
    res.status(r.status).json(data);
  } catch (e) {
    res.status(500).json({ error: '프록시 처리 오류: ' + String((e && e.message) || e) });
  }
}
