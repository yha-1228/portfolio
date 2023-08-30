'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { LinkComponentProps } from '@/lib/next/types';
import { isMatchFirstPath } from '@/utils/url/matching';

type NavLinkProps = LinkComponentProps & {
  href: string;
};

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  (props, ref) => {
    const { href, className, ...restProps } = props;
    const pathname = usePathname();
    const current = isMatchFirstPath(href, pathname);

    return (
      <Link
        className={twMerge(
          'relative inline-flex h-16 items-center py-1 font-bold text-gray-foreground/70 transition-colors duration-200 ease-out hover:text-gray-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-300',
          current &&
            "text-primary-600 before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-primary-600 before:content-[''] hover:text-primary-600",
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
