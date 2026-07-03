# 이룸NS (irumNS) — 논슬립 판매 사이트

개인 구매자를 위한 논슬립(미끄럼 방지) 제품 소개·판매 안내 사이트.
구매는 네이버 스마트스토어에서, 이 사이트는 **제품 카탈로그 + 시공 가이드 + 문의 유입** 역할.

- **스택:** [Astro](https://astro.build) (정적 사이트 → 순수 HTML 출력)
- **구매:** 상단 GNB "구매하기" → 스마트스토어
- **문의:** 카카오톡 채널 / 전화 (메시지 상담)
- 제품·사례·가이드·연락처는 `src/data/`에서 데이터로 관리
- 기획 문서: [`PRD.md`](./PRD.md)

## 개발

```bash
npm install
npm run dev      # 로컬 개발 서버 (http://localhost:4321)
npm run build    # dist/ 에 정적 사이트 빌드
npm run preview  # 빌드 결과 미리보기
```

## 배포

### 1) Vercel (현재 — 데브/프리뷰)
1. Vercel → **Add New → Project** → 이 GitHub 저장소(`lineggi/irum_ns`) 임포트.
2. Framework Preset은 **Astro**로 자동 감지됨(Build: `astro build`, Output: `dist`). 그대로 Deploy.
3. Production Branch를 현재 작업 브랜치로 지정하면 푸시할 때마다 자동 배포됨.
4. 배포된 `*.vercel.app` 주소에서 확인 → 검토 후 기존 도메인(irumns.com) 연결.

### 2) 카페24 (추후 — 실도메인)
- `npm run build`의 `dist/`를 카페24 `/www/`로 업로드(FTP). GitHub Actions 자동 배포는 도메인 연결 시점에 구성.

## 콘텐츠 교체 가이드
- **제품:** `src/data/products.js` — 이미 실제 카탈로그(논슬립/마감재/굽도리/기타) 입력됨. 제품 사진은 `public/images/products/`에 넣고 각 제품 `img` 경로와 맞추기.
- **연락처/사업자정보:** `src/data/site.js`.
- **시공가이드·사례:** `src/data/content.js`.
- **로고/파비콘:** `public/favicon.svg` (로고 모티프 SVG). 실제 로고 파일 주면 헤더 로고·고해상 파비콘 교체.
