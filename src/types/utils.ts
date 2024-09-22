/**
 * `Omit`の型補完が効くバージョン。`Pick`の実装を参考。
 */
export type OmitKey<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type ValueOf<T> = T[keyof T];

export type Dict<T = unknown> = Record<string, T>;
