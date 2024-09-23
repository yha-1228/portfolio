import { createClient } from 'microcms-js-sdk';
import type { BlogFields } from './types';

/**
 * @see https://document.microcms.io/tutorial/next/next-getting-started
 */
const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN || '',
  apiKey: process.env.API_KEY || '',
});

export function getBlogList() {
  return client.getList<BlogFields>({
    endpoint: 'blog',
  });
}

export function getBlogDetail(id: string) {
  return client.getListDetail<BlogFields>({
    endpoint: 'blog',
    contentId: id,
  });
}
