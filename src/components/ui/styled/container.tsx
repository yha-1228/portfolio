import React from 'react';
import clsx from '@/utils/css/clsx';

type Until = 'md' | 'lg';

const untilMaxWidthMap: { [key in Until]: string } = {
  md: 'md:max-w-screen-md',
  lg: 'lg:max-w-screen-lg',
};

type ContainerProps = React.ComponentPropsWithRef<'div'> & {
  fluid?: boolean;
  until?: Until;
};

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (props, ref) => {
    const { className, fluid, until, ...restProps } = props;

    return (
      <div
        className={clsx(
          `${fluid ? 'w-full' : 'container mx-auto'} px-5`,
          until && untilMaxWidthMap[until],
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
