import { createClient } from 'microcms-js-sdk';

/**
 * @see https://document.microcms.io/tutorial/next/next-getting-started
 */
export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN || '',
  apiKey: process.env.API_KEY || '',
});
