import React from 'react';

type DivideProps = React.PropsWithChildren<{
  by: React.ReactNode;
}>;

/**
 * @example
 * ```tsx
 * <Divide by=",">{['foo', 'bar', 'buz']}</Divide>
 * // output: foo, bar, buz
 * ```
 */
export default function Divide(props: DivideProps) {
  const { children, by } = props;

  return (
    <>
      {React.Children.map(children, (child, index) => {
        if (index === 0) return child;
        return (
          <>
            {by}
            {child}
          </>
        );
      })}
    </>
  );
}
