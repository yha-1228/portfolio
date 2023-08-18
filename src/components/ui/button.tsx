import React from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <button
        className={twMerge(
          'bg-blue-500 px-4 py-2 text-white',
          'disabled:cursor-not-allowed disabled:bg-gray-400',
          className
        )}
        {...restProps}
        ref={ref}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
