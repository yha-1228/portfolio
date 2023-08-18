import React from 'react';
import { twMerge } from 'tailwind-merge';

type ContainerProps = React.ComponentPropsWithRef<'div'> & {
  fluid?: boolean;
};

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (props, ref) => {
    const { className, fluid, ...restProps } = props;

    return (
      <div
        className={twMerge(
          `${fluid ? 'w-full' : 'container mx-auto'} px-4`,
          className
        )}
        {...restProps}
        ref={ref}
      />
    );
  }
);

Container.displayName = 'Container';

export default Container;
