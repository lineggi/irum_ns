// 사이트 공통 설정. 실제 값(전화/채널/사업자정보)으로 교체하세요.
export const site = {
  name: '이룸엔에스',
  tagline: '미끄럼 걱정 없이, 안심하는 일상',
  description:
    '계단·현관·경사로 미끄럼 방지 논슬립을 저렴하게. 개인도 혼자 시공할 수 있도록 쉬운 시공 가이드까지 알려드립니다.',
  // 구매는 네이버 스마트스토어에서 (GNB "구매하기"에만 연결)
  storeUrl: 'https://smartstore.naver.com/anjeon_nonslip',
  // 링크 공유 시 나오는 대표 이미지(OG). 파일을 public 경로에 올리면 적용됨.
  ogImage: '/images/guide/stair-tape.jpg',
  // Google Analytics(GA4) 측정 ID. 비우면 미적용.
  gaId: 'G-75HJ8B6NNX',
  // 문의는 메시지 채널로
  channels: {
    kakao: 'https://pf.kakao.com/_lxmsIG', // 카카오톡 채널 (문의하기)
    naverTalk: '', // 네이버 톡톡 채널 URL (있으면 입력)
    tel: '010-9845-6890', // 대표 번호
    email: 'irum_ns@naver.com', // 이메일
  },
  // 사업자 정보 (전자상거래 표시 의무)
  business: {
    company: '이룸엔에스',
    owner: '이세리',
    bizNo: '211-66-61942',
    mailOrderNo: '', // 통신판매업 신고번호 (있으면 입력)
    address: '경기도 남양주시 오남읍 팔현리 288-1',
  },
};

export const nav = [
  { label: '제품소개', href: '/products/' },
  { label: '시공가이드', href: '/guide/' },
  { label: '시공사례', href: '/cases/' },
  { label: '회사소개', href: '/about/' },
  { label: '문의하기', href: '/contact/' },
];
