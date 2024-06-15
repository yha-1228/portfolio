/**
 * 型推論される`Object.entries`
 */
export function entriesOf<T extends object>(o: T) {
  const result: [keyof T, T[Extract<keyof T, string>]][] = [];

  for (const key in o) {
    if (Object.prototype.hasOwnProperty.call(o, key)) {
      const value = o[key];
      result.push([key, value]);
    }
  }

  return result;
}
