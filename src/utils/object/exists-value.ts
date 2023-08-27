/**
 * オブジェクトにfalsyでない値が少なくとも1つあるか調べる
 */
export default function existsValue(value: object) {
  return Object.values(value).some((value) => value);
}
