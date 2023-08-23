type ShowProps = React.PropsWithChildren<{
  when?: boolean;
  fallback?: React.ReactNode;
}>;

/**
 * SolidJSの機能に触発されて作成した、表示切替用のラッパー
 *
 * @see https://www.solidjs.com/tutorial/flow_show
 */
export default function Show({ when, fallback, children }: ShowProps) {
  return when ? children : fallback;
}
