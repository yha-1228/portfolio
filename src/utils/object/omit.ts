export function omit<T extends object, K extends string>(
  object: T,
  keys: K[],
): Omit<T, K> {
  const result = { ...object };

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (keys.includes(key)) delete result[key];
    }
  }

  return result as Omit<T, K>;
}
