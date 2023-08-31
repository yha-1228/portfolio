'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LinkComponentProps } from '@/lib/next/types';
import clsx from '@/utils/css/clsx';
import { isMatchFirstPath } from '@/utils/url/matching';

type ActiveLinkProps = LinkComponentProps & {
  activeClassName?: string;
};

const ActiveLink = React.forwardRef<HTMLAnchorElement, ActiveLinkProps>(
  (props, ref) => {
    const { activeClassName, className, ...restProps } = props;

    let { href } = props;
    if (typeof href !== 'string') {
      href = href.pathname || '';
    }

    const pathname = usePathname();
    const current = isMatchFirstPath(href, pathname);

    return (
      <Link
        className={clsx(className, current && activeClassName)}
        {...restProps}
        ref={ref}
      />
    );
  },
);

ActiveLink.displayName = 'ActiveLink';

export default ActiveLink;
