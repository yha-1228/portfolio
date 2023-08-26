/**
 * `style`属性を楽に作成するヘルパー
 * (CSS変数を`as React.CSSProperties`しなくてよい)
 */
export default function createStyleAttr(
  styles: React.CSSProperties & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [k in `--${string}`]: unknown;
  },
) {
  return styles as React.CSSProperties;
}
