import React from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = React.ComponentPropsWithRef<'input'>;

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, ...restProps } = props;

  return (
    <input
      className={twMerge('border border-solid border-black', className)}
      {...restProps}
      ref={ref}
    />
  );
});

Input.displayName = 'Input';

export default Input;
