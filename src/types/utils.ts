export type ValueOf<T> = T[keyof T];

export type Dict<T = unknown> = Record<string, T>;
