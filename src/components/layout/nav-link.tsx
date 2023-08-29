'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { LinkComponentProps } from '@/lib/next/types';
import createStyleAttr from '@/utils/react/create-style-attr';
import { isMatchFirstPath } from '@/utils/url/matching';

type NavLinkProps = LinkComponentProps & {
  href: string;
  parentHeight: unknown;
};

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  (props, ref) => {
    const { parentHeight, href, style, className, ...restProps } = props;
    const pathname = usePathname();
    const current = isMatchFirstPath(href, pathname);

    return (
      <Link
        style={createStyleAttr({
          '--parent-height': parentHeight,
          ...style,
        })}
        className={twMerge(
          'h-[var(--parent-height)]',
          'relative inline-flex items-center font-bold text-gray-foreground-weak',
          'duration-200 transition-colors ease-out',
          'hover:text-gray-foreground',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-300',
          current &&
            "text-gray-foreground before:absolute before:bottom-0 before:left-0 before:h-[1.5px] before:w-full before:bg-primary-600 before:content-['']",
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

export default NavLink;
