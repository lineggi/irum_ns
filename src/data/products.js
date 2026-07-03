// 이룸NS 실제 제품 카탈로그 (상세페이지 이미지 기준)
// 구매는 GNB "구매하기"(스마트스토어 홈)로만 연결 — 제품별 딥링크 없음.
// 이미지 파일은 public/images/products/ 에 넣고 아래 img/detailImg 경로와 맞추세요.

export const categories = [
  { slug: 'nonslip', name: '논슬립', emoji: '🪜', desc: '계단·출입구 미끄럼 방지 핵심 제품(테이프/세라믹/알루미늄)' },
  { slug: 'finish', name: '마감재', emoji: '📏', desc: '타일·바닥 재료분리대 및 끝단 마감용 알루미늄 마감재' },
  { slug: 'skirting', name: '굽도리', emoji: '🧱', desc: '벽과 바닥 경계 걸레받이(월베이스/우드/무지)' },
  { slug: 'etc', name: '기타 부자재', emoji: '🧰', desc: '시공용 양면테이프·접착 부자재' },
];

// 색상 스와치용 근사 색 (표시는 참고용, 실제 색과 차이 있을 수 있음)
const C = {
  stone: '#d7d2c7', gray: '#9aa0a6', black: '#2b2b2b', yellow: '#f4c400',
  green: '#2e7d32', brown: '#6d3b2a', navy: '#23305e', red: '#9e2b25',
};

export const products = [
  // ── 논슬립 ─────────────────────────────
  {
    slug: 'ceramic-tape',
    category: 'nonslip',
    name: '세라믹 논슬립 테이프',
    tagline: '암석(세라믹) 재질 테이프 — 붙이기만 하면 끝나는 미끄럼 방지',
    features: [
      '테이프로 간편하게 부착, 누구나 할 수 있는 쉬운 시공',
      '가정·건물·일상생활 어디에나 사용 가능',
      '석재·철재·타일에도 잘 붙는 강한 접착력',
      '국내 생산, 해지지 않는 내구성',
    ],
    specs: [
      { label: '규격 ①', value: '폭 50mm × 길이 30m' },
      { label: '규격 ②', value: '폭 50mm × 길이 15m' },
      { label: '재질', value: '세라믹(암석입자)' },
    ],
    colors: [
      { name: '스톤', hex: C.stone }, { name: '회색', hex: C.gray },
      { name: '검정', hex: C.black }, { name: '노랑', hex: C.yellow },
      { name: '녹색', hex: C.green }, { name: '밤색(적갈색)', hex: C.brown },
      { name: '안전사선', stripe: true },
    ],
    applications: ['실내외 계단', '건물 출입구', '경사로', '가정 내 미끄럼 구간'],
    img: '/images/products/nonslip-tape.jpg',
    detailImg: '/images/products/nonslip-tape.jpg',
  },
  {
    slug: 'ceramic-62',
    category: 'nonslip',
    name: '세라믹 각 논슬립 62',
    tagline: 'ㄱ자 형태로 계단 코를 감싸는 세라믹 논슬립',
    features: [
      'ㄱ자 디자인으로 계단 모서리 확실히 보호',
      '테이프보다 미끄럼방지 기능 우수',
      '2mm 초슬립형 두께로 보행이 부드러움',
      '특수 광물입자 사용 · 내구성 우수',
    ],
    specs: [
      { label: '규격', value: '폭 62mm(W) × 높이 20mm(H)' },
      { label: '두께', value: '2mm 초슬립형' },
      { label: '재질', value: '특수 광물입자' },
    ],
    colors: [
      { name: '스톤', hex: C.stone }, { name: '회색', hex: C.gray },
      { name: '검정', hex: C.black }, { name: '노랑', hex: C.yellow },
      { name: '초록', hex: C.green }, { name: '밤색', hex: C.brown },
      { name: '안전사선', stripe: true },
    ],
    applications: [
      '대리석·타일·테라죠·철제 등 각종 실내외 계단',
      '산업 현장의 각종 계단',
      '바닥 면이 고른 계단(접착 공법)',
      '폭 계단(에폭시 시공) / 사라형 피스 시공',
    ],
    note: '에폭시 시공 시 뒷면 양면테이프 부착이 간편 (테이프 부착 별도 1M 500원)',
    img: '/images/products/ceramic-62.jpg',
    detailImg: '/images/products/ceramic-62.jpg',
  },
  {
    slug: 'al-60s',
    category: 'nonslip',
    name: '알루미늄 논슬립 AL 60-S',
    tagline: '넓은 고무 패드를 삽입한 알루미늄 ㄱ자 논슬립',
    features: [
      'ㄱ자 디자인',
      '넓은 고무 패드 삽입',
      '고온 열처리한 미끄럼방지 패드',
    ],
    specs: [
      { label: '규격', value: '폭 57mm(W) × 높이 27mm(H)' },
      { label: '재질', value: '알루미늄 + 고무 패드' },
    ],
    colors: [
      { name: '녹색', hex: C.green }, { name: '남색', hex: C.navy },
      { name: '검은색', hex: C.black }, { name: '노란색', hex: C.yellow },
      { name: '적색', hex: C.red }, { name: '밤색', hex: C.brown },
      { name: '회색', hex: C.gray },
    ],
    applications: ['호텔·빌딩·아파트', '관공서·학교·공공시설 등 건물 실내외 계단'],
    img: '/images/products/al-60s.jpg',
    detailImg: '/images/products/al-60s.jpg',
  },

  // ── 마감재 ─────────────────────────────
  {
    slug: 'deco-trim',
    category: 'finish',
    name: '데코트림 (알루미늄 마감재)',
    tagline: '타일·바닥 재료분리대 및 끝단 마감용',
    features: ['재료분리대', '타일 마감재', '바닥 마감재'],
    specs: [
      { label: '규격 ①', value: '3mm × 2400mm' },
      { label: '규격 ②', value: '3mm × 1900mm' },
      { label: '재질', value: '알루미늄(AL)' },
    ],
    applications: ['타일 마감', '바닥 재료 분리', '끝단 마감'],
    img: '/images/products/finish.jpg',
    detailImg: '/images/products/finish.jpg',
  },
  {
    slug: 'profile',
    category: 'finish',
    name: '프로파일 (알루미늄 마감재)',
    tagline: '깔끔한 끝단 처리를 위한 알루미늄 프로파일',
    features: ['재료분리대', '타일 마감재', '바닥 마감재'],
    specs: [
      { label: '규격', value: '3mm × 2400mm' },
      { label: '재질', value: '알루미늄(AL)' },
    ],
    applications: ['타일 마감', '바닥 재료 분리', '끝단 마감'],
    img: '/images/products/finish.jpg',
    detailImg: '/images/products/finish.jpg',
  },

  // ── 굽도리 ─────────────────────────────
  {
    slug: 'wall-base',
    category: 'skirting',
    name: '월베이스 (Wall Base)',
    tagline: '본드 시공용 벽·바닥 경계 걸레받이',
    features: ['본드 시공용', '호텔·빌딩·아파트·관공서·학교 등 공공시설 실내외 적용'],
    specs: [
      { label: '규격 ①', value: '75mm × 2T (1R/L = 25M)' },
      { label: '규격 ②', value: '105mm × 2T (1R/L = 25M)' },
      { label: '규격 ③', value: '105mm × 3.2T (1R/L = 20M)' },
    ],
    colors: [{ name: '102' }, { name: '103' }, { name: '106' }, { name: '107' }, { name: '108' }, { name: '109' }],
    applications: ['건물 실내외', '공공시설'],
    img: '/images/products/skirting.jpg',
    detailImg: '/images/products/skirting.jpg',
  },
  {
    slug: 'wood-skirting',
    category: 'skirting',
    name: '우드굽도리',
    tagline: '우드 무늬 걸레받이 — 양면테이프 부착 시공',
    features: ['양면 테이프 부착 시공', '건물 실내 및 병원 복도 적용'],
    specs: [
      { label: '규격', value: '75mm (1R/L = 25M)' },
      { label: '박스', value: '1BOX (8R/L)' },
    ],
    colors: [{ name: 'TL7501~TL7511 등 다양한 우드 컬러' }],
    applications: ['건물 실내', '병원 복도'],
    img: '/images/products/skirting.jpg',
    detailImg: '/images/products/skirting.jpg',
  },
  {
    slug: 'plain-skirting',
    category: 'skirting',
    name: '무지굽도리',
    tagline: '단색 걸레받이 — 양면테이프 부착 시공',
    features: ['양면 테이프 부착 시공', '건물 실내 및 병원 복도 적용'],
    specs: [
      { label: '규격 ①', value: '75mm (1R/L=20M) / 1BOX (8R/L)' },
      { label: '규격 ②', value: '100mm (1R/L=15M) / 1BOX (6R/L)' },
    ],
    colors: [{ name: '106' }, { name: '108' }, { name: '109' }],
    applications: ['건물 실내', '병원 복도'],
    img: '/images/products/skirting.jpg',
    detailImg: '/images/products/skirting.jpg',
  },

  // ── 기타 부자재 ────────────────────────
  {
    slug: 'accessory-tape',
    category: 'etc',
    name: '시공용 양면테이프',
    tagline: '세라믹 각/알루미늄 논슬립 뒷면 부착용',
    features: ['간편한 양면테이프 부착 시공', '에폭시 없이도 시공 가능'],
    specs: [{ label: '가격', value: '테이프 부착 별도 1M당 500원' }],
    applications: ['각 논슬립 뒷면 부착', '굽도리 부착'],
    img: '/images/products/accessory-tape.jpg',
  },
  {
    slug: 'sikaflex-11fc',
    category: 'etc',
    name: '시카플렉스 11 FC (논슬립 실리콘 접착제)',
    tagline: '습기경화용 1액형 폴리우레탄 접착제 — 강력한 접착력',
    features: [
      '실리콘(폴리우레탄) 접착제',
      '강력한 접착력',
      '논슬립 시공 및 공업용',
    ],
    specs: [
      { label: '규격', value: '20ctg × 310ml' },
      { label: '타입', value: '습기경화용 1액형 폴리우레탄' },
    ],
    applications: ['논슬립 시공 접착제', '나무·금속 등 공업용 접착 및 씰링'],
    img: '/images/products/sikaflex-11fc.jpg',
    detailImg: '/images/products/sikaflex-11fc.jpg',
  },
];

// ── 통이미지 카탈로그 (제품소개 탭 구조) ─────────────────
// 카테고리 → 제품 → 통이미지(여러 장이면 세로로 이어붙여 표시)
export const catalog = [
  {
    slug: 'nonslip', name: '논슬립',
    products: [
      { name: '논슬립 테이프', images: ['/images/products/nonslip-tape.jpg'] },
      { name: '세라믹 각 논슬립 62', images: ['/images/products/ceramic-62.jpg'] },
      { name: '알루미늄 논슬립 AL 60-S', images: ['/images/products/al-60s.jpg'] },
    ],
  },
  {
    slug: 'finish', name: '마감재',
    products: [
      { name: '마감재 (데코트림·프로파일·죠인트·논슬립 외)',
        images: ['/images/products/finish.jpg', '/images/products/ma02.jpg', '/images/products/ma03.jpg'] },
    ],
  },
  {
    slug: 'skirting', name: '굽도리',
    products: [
      { name: '굽도리 (월베이스·우드·무지)', images: ['/images/products/skirting.jpg'] },
    ],
  },
  {
    slug: 'etc', name: '기타 부자재',
    products: [
      { name: '시카플렉스 11 FC (실리콘 접착제)', images: ['/images/products/sikaflex-11fc.jpg'] },
    ],
  },
];
