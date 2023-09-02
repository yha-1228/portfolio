import React from 'react';
import clsx from '@/utils/css/clsx';

type Heading1Props = React.ComponentPropsWithRef<'h1'>;

const Heading1 = React.forwardRef<HTMLHeadingElement, Heading1Props>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <h1
        className={clsx('mb-8 text-4xl font-bold leading-tight', className)}
        {...restProps}
        ref={ref}
      />
    );
  },
);

Heading1.displayName = 'Heading1';

export default Heading1;
