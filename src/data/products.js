// 제품 카탈로그 (샘플). 실제 제품 사진/규격/가격으로 교체하세요.
// 구매는 GNB "구매하기"(스토어 홈)로만 연결 — 제품별 딥링크는 사용하지 않음.
export const categories = [
  { slug: 'nonslip', name: '논슬립', emoji: '🪜', desc: '계단·경사로 미끄럼 방지 핵심 제품' },
  { slug: 'finish', name: '마감재', emoji: '📏', desc: '깔끔한 끝단·모서리 마감용' },
  { slug: 'skirting', name: '굽도리', emoji: '🧱', desc: '벽과 바닥 경계 걸레받이/굽도리' },
  { slug: 'etc', name: '기타 부자재', emoji: '🧰', desc: '접착제·시공 공구 등 부자재' },
];

export const products = [
  // 논슬립
  { category: 'nonslip', name: '알루미늄 논슬립 50mm', spec: '폭 50mm · 길이 1m · 알루미늄', use: ['실내', '계단'], priceNote: '스토어 참조', img: '' },
  { category: 'nonslip', name: '고무 논슬립 40mm', spec: '폭 40mm · 길이 1m · 고무', use: ['실내', '실외', '계단'], priceNote: '스토어 참조', img: '' },
  { category: 'nonslip', name: '논슬립 테이프', spec: '폭 25/50mm · 롤', use: ['욕실', '경사로'], priceNote: '스토어 참조', img: '' },
  // 마감재
  { category: 'finish', name: '코너 마감재', spec: '길이 1m · PVC', use: ['모서리'], priceNote: '스토어 참조', img: '' },
  { category: 'finish', name: '엣지 몰딩', spec: '길이 2m · 알루미늄', use: ['끝단'], priceNote: '스토어 참조', img: '' },
  // 굽도리
  { category: 'skirting', name: '걸레받이 굽도리 60mm', spec: '높이 60mm · 길이 2.4m', use: ['벽면'], priceNote: '스토어 참조', img: '' },
  // 기타
  { category: 'etc', name: '전용 접착제', spec: '실내외 겸용', use: ['부자재'], priceNote: '스토어 참조', img: '' },
  { category: 'etc', name: '재단 커터/공구 세트', spec: '셀프 시공용', use: ['부자재'], priceNote: '스토어 참조', img: '' },
];
