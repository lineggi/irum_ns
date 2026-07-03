// 사이트 공통 설정. 실제 값(전화/채널/사업자정보)으로 교체하세요.
export const site = {
  name: '이룸엔에스',
  tagline: '미끄럼 걱정 없는 우리 집, 직접 만들어요',
  description:
    '계단·현관·경사로 미끄럼 방지 논슬립을 저렴하게. 개인도 혼자 시공할 수 있도록 쉬운 시공 가이드까지 알려드립니다.',
  // 구매는 네이버 스마트스토어에서 (GNB "구매하기"에만 연결)
  storeUrl: 'https://smartstore.naver.com/anjeon_nonslip',
  // 문의는 메시지 채널로
  channels: {
    kakao: 'https://pf.kakao.com/_lxmsIG', // 카카오톡 채널 (문의하기)
    naverTalk: '', // 네이버 톡톡 채널 URL (있으면 입력)
    tel: '000-0000-0000', // 대표 전화번호로 교체
  },
  // 사업자 정보 (전자상거래 표시 의무) — 실제 값으로 교체
  business: {
    company: '이룸',
    owner: '대표자명',
    bizNo: '000-00-00000',
    mailOrderNo: '제0000-지역0000호',
    address: '주소를 입력하세요',
  },
};

export const nav = [
  { label: '제품소개', href: '/products/' },
  { label: '시공가이드', href: '/guide/' },
  { label: '시공사례', href: '/cases/' },
  { label: '회사소개', href: '/about/' },
  { label: '문의하기', href: '/contact/' },
];
