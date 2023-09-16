import React from 'react';

type SplitProps = React.PropsWithChildren<{
  separator: React.ReactNode;
}>;

/**
 * @example
 * ```tsx
 * <Split separator=",">{['foo', 'bar', 'buz']}</Split>
 * // output: foo, bar, buz
 * ```
 */
export default function Split(props: SplitProps) {
  const { children, separator } = props;

  return (
    <>
      {React.Children.map(children, (child, index) => {
        if (index === 0) return child;
        return (
          <>
            {separator}
            {child}
          </>
        );
      })}
    </>
  );
}
