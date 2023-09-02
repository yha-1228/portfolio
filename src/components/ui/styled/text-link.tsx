import React from 'react';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';
import { LinkComponentProps } from '@/lib/next/types';
import clsx from '@/utils/css/clsx';
import ExternalLink, { ExternalLinkProps } from '../unstyled/external-link';

const baseClassName = clsx(
  'rounded-sm underline-offset-[0.15em] hover:underline',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-300',
);

// ----------------------------------------

type TextLinkProps = LinkComponentProps;

const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <Link
        className={clsx(baseClassName, className)}
        {...restProps}
        ref={ref}
      />
    );
  },
);

TextLink.displayName = 'TextLink';

// ----------------------------------------

type ExternalTextLinkProps = ExternalLinkProps;

const ExternalTextLink = React.forwardRef<
  HTMLAnchorElement,
  ExternalTextLinkProps
>((props, ref) => {
  const { className, children, ...restProps } = props;

  return (
    <ExternalLink
      className={clsx(
        baseClassName,
        'inline-flex items-center space-x-1',
        className,
      )}
      {...restProps}
      ref={ref}
    >
      <span>{children}</span>
      <FiExternalLink />
    </ExternalLink>
  );
});

ExternalTextLink.displayName = 'ExternalTextLink';

// ----------------------------------------

export { TextLink, ExternalTextLink };
