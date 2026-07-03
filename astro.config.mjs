// @ts-check
import { defineConfig } from 'astro/config';

// 정적 사이트(순수 HTML) 출력. Vercel(및 카페24 등 정적 호스팅) 배포.
// 대표 주소는 www.irumns.com (irumns.com은 www로 리다이렉트).
export default defineConfig({
  site: 'https://www.irumns.com',
  // 사람이 읽기 좋은 URL(/about/, /products/)로 출력.
  build: {
    format: 'directory',
  },
});
