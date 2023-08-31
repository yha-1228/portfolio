import React from 'react';
import { twMerge } from 'tailwind-merge';

// common
// ----------------------------------------

type InputBaseProps = {
  /**
   * エラー時のスタイルと`aria-invalid`属性を指定する
   */
  invalid?: boolean;
};

type CreateClassNameOptions = {
  isError?: boolean;
  external?: string;
};

function createClassName({ isError, external }: CreateClassNameOptions) {
  return twMerge(
    'block w-full appearance-none rounded-md px-3 py-1',
    'ring-1 ring-inset ring-gray-light-300',
    'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-600',
    isError && 'ring-2 ring-danger-500 focus:ring-danger-500',
    external,
  );
}

// ----------------------------------------

type InputProps = React.ComponentPropsWithRef<'input'> & InputBaseProps;

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { invalid, className, ...restProps } = props;

  return (
    <input
      aria-invalid={invalid || undefined}
      className={createClassName({ isError: invalid, external: className })}
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
    const { invalid, className, ...restProps } = props;

    return (
      <textarea
        aria-invalid={invalid || undefined}
        className={createClassName({ isError: invalid, external: className })}
        {...restProps}
        ref={ref}
      />
    );
  },
);

Textarea.displayName = 'Textarea';

// ----------------------------------------

export { Input, Textarea };
