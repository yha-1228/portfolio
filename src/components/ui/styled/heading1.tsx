import React from 'react';
import clsx from '@/utils/css/clsx';

type Heading1Props = React.ComponentPropsWithRef<'h2'>;

const Heading1 = React.forwardRef<HTMLHeadingElement, Heading1Props>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <h2
        className={clsx('text-3xl font-bold lg:text-4xl', className)}
        {...restProps}
        ref={ref}
      />
    );
  },
);

Heading1.displayName = 'Heading1';

export default Heading1;
