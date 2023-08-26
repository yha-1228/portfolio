import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';
import resolveConfig from 'tailwindcss/resolveConfig';
import { LinkComponentProps } from '@/lib/next/types';
import { px } from '@/utils/css/unit';
import createStyleAttr from '@/utils/react/create-style-attr';
import tailwindConfig from '../../../tailwind.config';
import Container from '../ui/container';
import { pageLinks } from './page-links';

const { theme } = resolveConfig(tailwindConfig);

type NavLinkProps = LinkComponentProps;

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  (props, ref) => {
    const { href, style, className, ...restProps } = props;
    const router = useRouter();
    const current = router.pathname === href;

    return (
      <Link
        style={createStyleAttr({
          '--parent-height': theme?.width?.[14],
          '--parent-border-b-width': px(1),
          ...style,
        })}
        className={twMerge(
          'h-[calc(var(--parent-height)-var(--parent-border-b-width))]',
          'relative inline-flex items-center font-bold text-gray-foreground-weak',
          'hover:text-gray-foreground',
          current &&
            "text-gray-foreground before:absolute before:bottom-0 before:left-0 before:h-[2.5px] before:w-full before:bg-primary-600 before:content-['']",
          className,
        )}
        href={href}
        {...restProps}
        ref={ref}
      />
    );
  },
);

NavLink.displayName = 'NavLink';

// ----------------------------------------

export default function Header() {
  return (
    <header className="flex h-14 items-center border-b border-solid border-b-gray-light-200 bg-gray-light-50">
      <Container>
        <nav className="flex items-center justify-between">
          <NavLink href="/" className="text-xl">
            Yuta Hasegawa
          </NavLink>

          <ul className="flex space-x-5">
            {pageLinks.map((pageLink) => (
              <li key={`${pageLink.href}`}>
                <NavLink href={pageLink.href}>{pageLink.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
