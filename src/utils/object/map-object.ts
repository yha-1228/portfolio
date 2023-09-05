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
 * mapObject(user, null);
 * // output:
 * // { id: null, name: null, age: null }
 *
 *
 * ```
 */
export default function mapObject<T extends object, U>(
  object: T,
  condition: ((value: T[keyof T], key: keyof T) => U) | U,
) {
  const newObject: { [k in keyof T]?: U } = {};

  Object.entries(object).forEach(([key, value]) => {
    let newValue;

    if (typeof condition === 'function') {
      // @ts-expect-error condition is function
      newValue = condition(value, key as K);
    } else {
      newValue = condition;
    }

    newObject[key as keyof T] = newValue;
  });

  return newObject as { [k in keyof T]: U };
}
