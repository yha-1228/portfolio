export default function mapObject<T extends object, U, K extends keyof T>(
  object: T,
  callbackfn: (value: T, key?: K) => U,
) {
  const newObject: { [k in K]?: U } = {};

  Object.entries(object).forEach(([key, value]) => {
    const newValue = callbackfn(value, key as K);
    newObject[key as K] = newValue;
  });

  return newObject as { [k in K]: U };
}
