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
    'w-full block px-3 py-1 rounded-md',
    'ring-1 ring-inset ring-gray-light-strong',
    'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-600',
    isError && 'ring-2 ring-danger-500 focus:ring-danger-600',
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
