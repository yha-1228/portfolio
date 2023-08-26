export default function isEmptyObject(
  value: object,
): value is Record<string, never> {
  return Object.values(value).length === 0;
}
