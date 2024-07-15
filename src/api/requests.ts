import encode from '@/lib/netlify/encode';
import type { Dict } from '@/types/utils';

export type SendContactParams = {
  htmlFilepath: string;
  formName: string;
  data: Dict<string>;
};

/**
 * @see https://docs.netlify.com/frameworks/next-js/overview/#netlify-forms-compatibility
 */
export async function sendContact({
  htmlFilepath,
  formName,
  data,
}: SendContactParams) {
  const res = await fetch(htmlFilepath, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encode({ 'form-name': formName, ...data }),
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return res;
}
