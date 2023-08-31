import React from 'react';
import clsx from '@/utils/css/clsx';

type ContainerProps = React.ComponentPropsWithRef<'div'> & {
  fluid?: boolean;
};

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (props, ref) => {
    const { className, fluid, ...restProps } = props;

    return (
      <div
        className={clsx(
          `${fluid ? 'w-full' : 'container mx-auto'} px-4`,
          className,
        )}
        {...restProps}
        ref={ref}
      />
    );
  },
);

Container.displayName = 'Container';

export default Container;
