import React from 'react';
import clsx from '@/utils/css/clsx';

type Heading2Props = React.ComponentPropsWithRef<'h2'>;

const Heading2 = React.forwardRef<HTMLHeadingElement, Heading2Props>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <h2
        className={clsx(
          'mb-6 mt-12 text-2xl font-bold leading-tight',
          className,
        )}
        {...restProps}
        ref={ref}
      />
    );
  },
);

Heading2.displayName = 'Heading2';

export default Heading2;
