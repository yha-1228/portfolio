import React from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { LinkComponentProps } from '@/lib/next/types';

// common
// ----------------------------------------

type ButtonBaseProps = {
  disabled?: boolean;
  fullWidth?: boolean;
  rightIcon?: React.ReactNode;
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
    'inline-flex justify-center items-center rounded-lg bg-primary-600 px-5 py-2 text-white',
    fullWidth ? 'flex text-center' : '',
    whenDisabled,
    'hover:bg-primary-700',
    'active:bg-primary-700',
    'focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary-300',
    external,
  );
};

// ----------------------------------------

type ButtonProps = React.ComponentPropsWithRef<'button'> & ButtonBaseProps;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { fullWidth, rightIcon, className, children, ...restProps } = props;

    return (
      <button
        className={createClassName({
          fullWidth,
          whenDisabled: 'disabled:cursor-not-allowed disabled:bg-gray-disabled',
          external: className,
        })}
        {...restProps}
        ref={ref}
      >
        {rightIcon ? (
          <>
            <span>{children}</span>
            <span className="ml-2 inline-flex items-center">{rightIcon}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

// ----------------------------------------

type ButtonLinkProps = LinkComponentProps & ButtonBaseProps;

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (props, ref) => {
    const {
      fullWidth,
      rightIcon,
      disabled,
      className,
      children,
      ...restProps
    } = props;

    return (
      <Link
        className={createClassName({
          fullWidth,
          whenDisabled: disabled
            ? 'pointer-events-none disabled:bg-gray-disabled'
            : '',
          external: twMerge('text-center', className),
        })}
        aria-disabled={disabled}
        {...restProps}
        ref={ref}
      >
        {rightIcon ? (
          <>
            <span>{children}</span>
            <span className="ml-2 inline-flex items-center">{rightIcon}</span>
          </>
        ) : (
          children
        )}
      </Link>
    );
  },
);

ButtonLink.displayName = 'ButtonLink';

// ----------------------------------------

export { Button, ButtonLink };
