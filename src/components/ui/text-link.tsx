import React from 'react';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';
import { LinkComponentProps } from '@/lib/next/types';
import { OmitKey } from '@/types';

const createClassName = (className?: string) => {
  return twMerge(
    'rounded-sm underline-offset-[0.15em] hover:underline',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-300',
    className,
  );
};

// ----------------------------------------

type TextLinkProps = LinkComponentProps;

const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <Link
        className={twMerge(createClassName(), className)}
        {...restProps}
        ref={ref}
      />
    );
  },
);

TextLink.displayName = 'TextLink';

// ----------------------------------------

type ExternalTextLinkProps = OmitKey<
  React.ComponentPropsWithRef<'a'>,
  'target' | 'rel'
>;

const ExternalTextLink = React.forwardRef<
  HTMLAnchorElement,
  ExternalTextLinkProps
>((props, ref) => {
  const { className, children, ...restProps } = props;

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={twMerge(
        createClassName('inline-flex items-center space-x-1'),
        className,
      )}
      {...restProps}
      ref={ref}
    >
      <span>{children}</span>
      <FiExternalLink />
    </a>
  );
});

ExternalTextLink.displayName = 'ExternalTextLink';

// ----------------------------------------

export { TextLink, ExternalTextLink };
