/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

type DivideProps = {
  children: React.ReactNode[];
  by: React.ReactNode;
  /**
   * @default "div"
   */
  as?: React.ElementType<any>;
  className?: string;
  style?: React.CSSProperties;
};

export default function Divide(props: DivideProps) {
  const { children, by, as: Wrapper = 'div', className, style } = props;

  return (
    <Wrapper className={className} style={style}>
      {React.Children.map(children, (child, index) => {
        if (index === 0) return child;
        return (
          <>
            {by}
            {child}
          </>
        );
      })}
    </Wrapper>
  );
}
