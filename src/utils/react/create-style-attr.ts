/**
 * `style`属性を楽に作成するヘルパー
 * (CSS変数を`as React.CSSProperties`しなくてよい)
 */
export default function createStyleAttr(
  styles: React.CSSProperties & {
    [key in `--${string}`]: unknown;
  },
) {
  return styles as React.CSSProperties;
}
