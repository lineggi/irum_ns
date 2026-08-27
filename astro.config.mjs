// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

// 정적 페이지 + 서버 엔드포인트(/api/*) 혼합(hybrid). Vercel 배포.
// 대부분 페이지는 정적으로 미리 렌더되고, prerender=false인 라우트만 서버리스 함수로 동작.
// 대표 주소는 www.irumns.com (irumns.com은 www로 리다이렉트).
export default defineConfig({
  site: 'https://www.irumns.com',
  output: 'hybrid',
  adapter: vercel(),
  // 사람이 읽기 좋은 URL(/about/, /products/)로 출력.
  build: {
    format: 'directory',
  },
});
