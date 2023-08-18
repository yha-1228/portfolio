import React from 'react';
import { twMerge } from 'tailwind-merge';

type TextareaProps = React.ComponentPropsWithRef<'textarea'>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <textarea
        className={twMerge('border border-solid border-black', className)}
        {...restProps}
        ref={ref}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
