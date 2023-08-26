import React from 'react';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import { LinkComponentProps } from '@/lib/next/types';
import { OmitKey } from '@/types';
import Container from '../ui/container';
import { pageLinks } from './page-links';

const myExternalLinks = [
  {
    href: 'https://github.com/yha-1228',
    label: 'GitHub',
  },
  {
    href: 'https://zenn.dev/yhase_rqp',
    label: 'Zenn',
  },
  {
    href: 'https://codepen.io/yh10050846',
    label: 'Codepen',
  },
];

const COPYRIGHT_TEXT = <>Yuta Hasegawa &copy; {new Date().getFullYear()}</>;

// ----------------------------------------

const createClassName = (isFlex: boolean, ...classes: ClassNameValue[]) => {
  return twMerge(
    isFlex ? 'inline-flex items-center space-x-1' : 'inline-block',
    'rounded-sm font-bold hover:underline',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-300',
    ...classes,
  );
};

// ----------------------------------------

type FooterExternalLinkProps = OmitKey<
  React.ComponentPropsWithRef<'a'>,
  'target' | 'rel'
>;

const FooterExternalLink = React.forwardRef<
  HTMLAnchorElement,
  FooterExternalLinkProps
>((props, ref) => {
  const { className, ...restProps } = props;

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={createClassName(true, className)}
      {...restProps}
      ref={ref}
    />
  );
});

FooterExternalLink.displayName = 'FooterExternalLink';

// ----------------------------------------

type FooterLinkProps = LinkComponentProps;

const FooterLink = React.forwardRef<HTMLAnchorElement, FooterLinkProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <Link
        className={createClassName(false, className)}
        {...restProps}
        ref={ref}
      />
    );
  },
);

FooterLink.displayName = 'FooterLink';

// ----------------------------------------

export default function Footer() {
  return (
    <footer>
      <Container>
        <div className="border-t border-solid border-t-gray-light-200 pb-14 pt-10">
          <div className="flex justify-between">
            <ul className="w-1/2 space-y-3 md:flex md:w-auto md:space-x-4 md:space-y-0">
              {myExternalLinks.map((item) => (
                <li key={item.href}>
                  <FooterExternalLink href={item.href}>
                    <span>{item.label}</span>
                    <FiExternalLink />
                  </FooterExternalLink>
                </li>
              ))}
            </ul>
            <ul className="w-1/2 space-y-3 md:flex md:w-auto md:space-x-4 md:space-y-0">
              <li>
                <FooterLink href="/">トップ</FooterLink>
              </li>
              {pageLinks.map((pageLink) => (
                <li key={pageLink.href}>
                  <FooterLink href={pageLink.href}>{pageLink.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-10 text-gray-foreground-weak md:mt-5">
            {COPYRIGHT_TEXT}
          </p>
        </div>
      </Container>
    </footer>
  );
}
