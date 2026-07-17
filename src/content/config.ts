import { defineCollection, z } from 'astro:content';

// 시공사례 — Sveltia CMS가 편집하는 폴더 컬렉션 (src/content/cases/*.md)
const cases = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().default('논슬립 시공 현장'),
    note: z.string().default('계단·경사로 미끄럼 방지 시공'),
    image: z.string(),
    order: z.number().default(100),
  }),
});

export const collections = { cases };
