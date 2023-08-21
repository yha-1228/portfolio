/**
 * @see https://www.netlify.com/blog/2017/07/20/how-to-integrate-netlifys-form-handling-in-a-react-app/
 */
const encode = (data: {
  [k: string]: Parameters<typeof encodeURIComponent>[0];
}) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

export default encode;
