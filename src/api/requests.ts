import axios from 'axios';
import encode from '@/lib/netlify/encode';

/**
 * @see https://www.netlify.com/blog/2017/07/20/how-to-integrate-netlifys-form-handling-in-a-react-app/
 */
export function sendContact(formName: string, data: { [k: string]: string }) {
  return axios.post('/', encode({ 'form-name': formName, ...data }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}
