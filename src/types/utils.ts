export type ValueOf<T> = T[keyof T];

export type Dict<T = unknown> = Record<string, T>;

export type Replace<T, U extends { [key in keyof T]?: unknown }> = Omit<
  T,
  keyof U
> &
  U;
