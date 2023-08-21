import { createClient } from 'microcms-js-sdk';

/**
 * @see https://document.microcms.io/tutorial/next/next-getting-started
 */
const client = createClient({
  serviceDomain: 'yh-blog',
  apiKey: process.env.API_KEY || '',
});

export default client;
