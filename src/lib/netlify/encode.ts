import { type Dict } from "@/types/utils";

/**
 * @see https://www.netlify.com/blog/2017/07/20/how-to-integrate-netlifys-form-handling-in-a-react-app/
 */
export const encode = (
  data: Dict<Parameters<typeof encodeURIComponent>[0]>,
) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};
