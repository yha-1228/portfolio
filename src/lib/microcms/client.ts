import { createClient } from 'microcms-js-sdk';
import { BlogContent, BlogListResponse } from './types';

/**
 * @see https://document.microcms.io/tutorial/next/next-getting-started
 */
const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN || '',
  apiKey: process.env.API_KEY || '',
});

export function getBlogListResponse() {
  return client.get({
    endpoint: 'blog',
  }) as Promise<BlogListResponse>;
}

export function getBlogContent(id: string) {
  return client.get({
    endpoint: 'blog',
    contentId: id,
  }) as Promise<BlogContent>;
}
