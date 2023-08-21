import React from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { LinkComponentProps } from '@/lib/next/types';

// common
// ----------------------------------------

type ButtonBaseProps = {
  fullWidth?: boolean;
};

type CreateClassNameOptions = {
  fullWidth?: boolean;
  whenDisabled: string;
  external?: string;
};

const createClassName = ({
  fullWidth,
  whenDisabled,
  external,
}: CreateClassNameOptions) => {
  return twMerge(
    'rounded-md bg-blue-500 px-5 py-2 text-white',
    fullWidth ? 'block text-center' : '',
    whenDisabled,
    'hover:bg-blue-600',
    'active:bg-blue-700',
    external
  );
};

// ----------------------------------------

type ButtonProps = React.ComponentPropsWithRef<'button'> & ButtonBaseProps;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { fullWidth, className, ...restProps } = props;

    return (
      <button
        className={createClassName({
          fullWidth,
          whenDisabled: 'disabled:cursor-not-allowed disabled:bg-gray-400',
          external: className,
        })}
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
} & ButtonBaseProps;

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (props, ref) => {
    const { fullWidth, className, disabled, ...restProps } = props;

    return (
      <Link
        className={createClassName({
          fullWidth,
          whenDisabled: disabled
            ? 'pointer-events-none disabled:bg-gray-400'
            : '',
          external: className,
        })}
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
