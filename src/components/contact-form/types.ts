export type ContactFormValues = {
  /**
   * お名前
   *
   * @description 必須
   */
  name: string;
  /**
   * メールアドレス
   *
   * @description 必須, Eメール
   */
  email: string;
  /**
   * 会社名
   *
   * @description 任意, 入力された場合は100文字以内
   */
  companyName: string;
  /**
   * お問い合わせ内容
   *
   * @description 必須, 10文字以上, 10000文字以内
   */
  message: string;
};

export type ContactFormErrors = { [key in keyof ContactFormValues]?: string };

export type ContactFormTouched = { [key in keyof ContactFormValues]: boolean };
