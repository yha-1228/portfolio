type ShowProps = React.PropsWithChildren<{
  when?: boolean;
  /**
   * @default null
   */
  fallback?: React.ReactNode;
}>;

/**
 * SolidJSの機能に触発されて作成した、表示切替用のラッパー
 *
 * @see https://www.solidjs.com/tutorial/flow_show
 *
 * @example
 * ```tsx
 * function App() {
 *  const loggedIn = Math.random() > 0.5;
 *
 *  return (
 *    <Show when={loggedIn} fallback={<div>Please log in.</div>}>
 *      My page.
 *    </Show>
 *  );
 *}
 * ```
 */
export default function Show({ when, fallback = null, children }: ShowProps) {
  return <>{when ? children : fallback}</>;
}
