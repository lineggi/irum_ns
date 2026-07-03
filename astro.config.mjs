// @ts-check
import { defineConfig } from 'astro/config';

// 카페24 정적 호스팅(도메인 루트 /www/)에 그대로 업로드되는 순수 HTML 출력.
// build 결과물(dist/)을 FTP로 /www/ 에 올린다.
export default defineConfig({
  site: 'https://irumns.com',
  // 사람이 읽기 좋은 URL(/about/, /products/)로 출력.
  build: {
    format: 'directory',
  },
});
