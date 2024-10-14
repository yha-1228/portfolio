import { assertNever } from "@/utils/assert-never";

export type IsLengthCheckOptions =
  | { min: number; max: number }
  | { min: number }
  | { max: number };

export const errorMessages = {
  required: () => {
    return "入力してください。";
  },
  isEmail: () => {
    return "メールアドレスの形式で入力してください。";
  },
  isLength: (options: IsLengthCheckOptions) => {
    if ("min" in options && "max" in options) {
      return `${options.min}文字以上、${options.max}文字以下で入力してください。`;
    }

    if ("min" in options) {
      return `${options.min}文字以上で入力してください。`;
    }

    if ("max" in options) {
      return `${options.max}文字以下で入力してください。`;
    }

    return assertNever(options);
  },
};
