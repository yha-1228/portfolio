/**
 * 第一階層のパスが適合するか調べる
 *
 * @example
 * ```ts
 * // ("/hoge", "/hoge") --> true
 * // ("/hoge", "/hoge/fuga") --> true
 * // ("/hoge", "/hage/fuga") --> false
 * ```
 */
export const isMatchFirstPath = (base: string, target: string | null) => {
  if (target == null) target = "";
  return base.split("/")[1] === target.split("/")[1];
};
