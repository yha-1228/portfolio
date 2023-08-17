export const required = '必須項目です。';

export const email = 'メールアドレスの形式で入力してください。';

type LengthOptions = {
  min: number;
  max?: number;
};

export function length(options: LengthOptions) {
  const { min, max } = options;

  if (!max) {
    return `${min}文字以上で入力してください。`;
  } else {
    return `${min}文字以上、${max}文字未満で入力してください。`;
  }
}
