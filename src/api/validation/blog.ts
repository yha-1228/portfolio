import { z } from "zod";

export const getBlogListResponseSchema = z.object({
  contents: z.array(
    z.object({
      id: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      publishedAt: z.string(),
      revisedAt: z.string(),
      title: z.string(),
      body: z.string(),
      tag: z.object({
        id: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
        publishedAt: z.string(),
        revisedAt: z.string(),
        tagName: z.string(),
      }),
    }),
  ),
});

export type GetBlogListResponse = z.infer<typeof getBlogListResponseSchema>;

export const getBlogDetailResponseSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  revisedAt: z.string(),
  title: z.string(),
  body: z.string(),
  tag: z.object({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    publishedAt: z.string(),
    revisedAt: z.string(),
    tagName: z.string(),
  }),
});

export type GetBlogDetailResponse = z.infer<typeof getBlogDetailResponseSchema>;
