/**
 * 型推論される`Object.keys`
 */
export function objectKeys<T extends object>(o: T) {
  return Object.keys(o) as (keyof T)[];
}

/**
 * 型推論される`Object.values`
 */
export function objectValues<T extends object>(o: T) {
  return Object.values(o) as T[];
}
