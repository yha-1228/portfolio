/**
 * 配列からfalsyな値を除去してから`Array.join`を実行する。
 */
export function join<T>(array: T[], separator?: string) {
  return array.filter(Boolean).join(separator);
}
