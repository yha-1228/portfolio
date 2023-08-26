/**
 * `Omit`の型補完が効くバージョン。`Pick`の実装を参考。
 */
export type OmitKey<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
