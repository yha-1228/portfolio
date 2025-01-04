export type ValueOf<T> = T[keyof T];

export type Dict<T = unknown> = Record<string, T>;

export type Replace<T, U extends { [key in keyof T]?: unknown }> = Omit<
  T,
  keyof U
> &
  U;

export type DistributiveOmit<
  T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  K extends keyof any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = T extends any ? Omit<T, K> : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyAsyncFunction = (...args: any[]) => Promise<any>;
