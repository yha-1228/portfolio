export const required = '入力してください。';

export const email = 'メールアドレスの形式で入力してください。';

type LengthOptions = {
  min?: number;
  max?: number;
};

export function length(options: LengthOptions) {
  const { min, max } = options;

  if (min == null && max == null) {
    return '';
  }

  if (min != null && max == null) {
    return `${min}文字以上で入力してください。`;
  }

  if (min == null && max != null) {
    return `${max}文字以下で入力してください。`;
  }

  return `${min}文字以上、${max}文字以下で入力してください。`;
}
