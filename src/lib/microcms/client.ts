import { createClient } from 'microcms-js-sdk';
import { BlogContent, ClientResponse } from './types';

/**
 * @see https://document.microcms.io/tutorial/next/next-getting-started
 */
const client = createClient({
  serviceDomain: 'yh-blog',
  apiKey: process.env.API_KEY || '',
});

export function getBlogContents() {
  return client.get({
    endpoint: 'blog',
  }) as Promise<ClientResponse<BlogContent>>;
}

export function getBlogContent(id: string) {
  return client.get({
    endpoint: 'blog',
    contentId: id,
  }) as Promise<BlogContent>;
}
