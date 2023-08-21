import React from 'react';
import { twMerge } from 'tailwind-merge';

type Heading2Props = React.ComponentPropsWithRef<'h2'>;

const Heading2 = React.forwardRef<HTMLHeadingElement, Heading2Props>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <h3
        className={twMerge(
          'text-xl font-bold text-primary-500 lg:text-2xl',
          className
        )}
        {...restProps}
        ref={ref}
      />
    );
  }
);

Heading2.displayName = 'Heading2';

export default Heading2;
