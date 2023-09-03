import React from 'react';
import clsx from '@/utils/css/clsx';

type Heading3Props = React.ComponentPropsWithRef<'h3'>;

const Heading3 = React.forwardRef<HTMLHeadingElement, Heading3Props>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <h3
        className={clsx('mb-5 mt-8 text-xl font-bold leading-tight', className)}
        {...restProps}
        ref={ref}
      />
    );
  },
);

Heading3.displayName = 'Heading3';

export default Heading3;
