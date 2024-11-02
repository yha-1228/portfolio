/**
 * 型推論される`Object.entries`の代わり (keyはstring only)
 */
export function entriesOf<T extends object>(o: T) {
  const result: Array<[keyof T, T[Extract<keyof T, string>]]> = [];

  for (const key in o) {
    if (Object.prototype.hasOwnProperty.call(o, key)) {
      if (typeof key === "string") {
        const value = o[key];
        result.push([key, value]);
      }
    }
  }

  return result;
}
