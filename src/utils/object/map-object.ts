/**
 * @example
 * ```ts
 * const user = { id: 1, name: 'John', age: 18 };
 *
 * mapObject(user, (value, key) => ({ field: key, value }))
 * // output:
 * // {
 * //   id: { field: 'id', value: 1 },
 * //   name: { field: 'name', value: 'John' },
 * //   age: { field: 'age', value: 18 }
 * // }
 *
 * ```
 */
export function mapObject<T extends object, U>(
  object: T,
  condition: (value: T[keyof T], key: keyof T) => U,
) {
  const newObject: { [k in keyof T]?: U } = {};

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const value = object[key];
      newObject[key] = condition(value, key);
    }
  }

  return newObject as { [k in keyof T]: U };
}
