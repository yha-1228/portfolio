import React from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { LinkComponentProps } from '@/lib/next/types';

const createClassName = (whenDisabled: string, external?: string) => {
  return twMerge(
    'rounded-md bg-blue-500 px-5 py-3 text-white',
    whenDisabled,
    'hover:bg-blue-600',
    'active:bg-blue-700',
    external
  );
};

// ----------------------------------------

type ButtonProps = React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <button
        className={createClassName(
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

// ----------------------------------------

type ButtonLinkProps = LinkComponentProps & {
  disabled?: boolean;
};

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (props, ref) => {
    const { className, disabled, ...restProps } = props;

    return (
      <Link
        className={createClassName(
          disabled ? 'pointer-events-none disabled:bg-gray-400' : '',
          className
        )}
        aria-disabled={disabled}
        {...restProps}
        ref={ref}
      />
    );
  }
);

ButtonLink.displayName = 'ButtonLink';

// ----------------------------------------

export { Button, ButtonLink };
