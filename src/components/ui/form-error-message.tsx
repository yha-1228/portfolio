import React from 'react';
import { twMerge } from 'tailwind-merge';

type FormErrorMessageProps = React.ComponentPropsWithRef<'p'>;

const FormErrorMessage = React.forwardRef<
  HTMLParagraphElement,
  FormErrorMessageProps
>((props, ref) => {
  const { className, ...restProps } = props;

  return (
    <p
      className={twMerge('text-sm text-danger-500', className)}
      {...restProps}
      ref={ref}
    />
  );
});

FormErrorMessage.displayName = 'FormErrorMessage';

export default FormErrorMessage;
