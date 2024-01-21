/**
 * `Omit`の型補完が効くバージョン。`Pick`の実装を参考。
 */
export type OmitKey<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * @see https://www.totaltypescript.com/concepts/the-prettify-helper
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

export type ValueOf<T> = T[keyof T];
