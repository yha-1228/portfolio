import React from 'react';
import { twMerge } from 'tailwind-merge';

// common
// ----------------------------------------

type InputBaseProps = {
  isError?: boolean;
};

type CreateClassNameOptions = {
  isError?: boolean;
  external?: string;
};

function createClassName({ isError, external }: CreateClassNameOptions) {
  return twMerge(
    'w-full px-3 py-1 rounded-md border border-solid border-gray-light-strong',
    'active:outline active:outline-2 active:outline-primary-500',
    'focus:outline focus:outline-2 focus:outline-primary-500',
    isError && 'border-danger-500',
    external,
  );
}

// ----------------------------------------

type InputProps = React.ComponentPropsWithRef<'input'> & InputBaseProps;

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { isError, className, ...restProps } = props;

  return (
    <input
      className={createClassName({ isError, external: className })}
      {...restProps}
      ref={ref}
    />
  );
});

Input.displayName = 'Input';

// ----------------------------------------

type TextareaProps = React.ComponentPropsWithRef<'textarea'> & InputBaseProps;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const { isError, className, ...restProps } = props;

    return (
      <textarea
        className={createClassName({ isError, external: className })}
        {...restProps}
        ref={ref}
      />
    );
  },
);

Textarea.displayName = 'Textarea';

// ----------------------------------------

export { Input, Textarea };
