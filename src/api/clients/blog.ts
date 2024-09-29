import { createClient } from 'microcms-js-sdk';
import {
  getBlogDetailResponseSchema,
  getBlogListResponseSchema,
  type GetBlogDetailResponse,
  type GetBlogListResponse,
} from '../validation/blog';

/**
 * @see https://document.microcms.io/tutorial/next/next-getting-started
 */
const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN || '',
  apiKey: process.env.API_KEY || '',
});

export async function getBlogList(): Promise<GetBlogListResponse> {
  const response = await client.getList({
    endpoint: 'blog',
  });

  const parsedResponse = getBlogListResponseSchema.safeParse(response);

  if (!parsedResponse.success) {
    throw new Error(`Parse error: ${parsedResponse.error.toString}`);
  }

  return parsedResponse.data;
}

export async function getBlogDetail(
  id: string,
): Promise<GetBlogDetailResponse> {
  const response = await client.getListDetail({
    endpoint: 'blog',
    contentId: id,
  });

  const parsedResponse = getBlogDetailResponseSchema.safeParse(response);

  if (!parsedResponse.success) {
    throw new Error(`Parse error: ${parsedResponse.error.toString}`);
  }

  return parsedResponse.data;
}
