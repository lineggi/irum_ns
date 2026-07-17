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

// 제품 — 어드민에서 추가·수정·삭제하는 폴더 컬렉션 (src/content/products/*.md)
const products = defineCollection({
  type: 'content',
  schema: z.object({
    category: z.enum(['논슬립', '마감재', '굽도리', '기타']).default('논슬립'),
    name: z.string(),
    desc: z.string().default(''),
    image: z.string(),
    badges: z.array(z.string()).default([]),
    feats: z.array(z.string()).default([]),
    specs: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    colorSet: z.enum(['세라믹', '고무패드', '없음']).default('없음'),
    note: z.string().default(''),
    order: z.number().default(100),
  }),
});

export const collections = { cases, products };
