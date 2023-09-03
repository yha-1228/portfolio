'use client';

import React, { HTMLAttributes } from 'react';
import Link from 'next/link';
import useIsMatchCurrentPath from '@/hooks/use-match-current-path';
import { LinkComponentProps } from '@/lib/next/types';
import { OmitKey } from '@/types/utils';

type ActiveLinkProps = OmitKey<LinkComponentProps, 'aria-current'>;

const ActiveLink = React.forwardRef<HTMLAnchorElement, ActiveLinkProps>(
  (props, ref) => {
    const { href, ...restProps } = props;
    const isActive = useIsMatchCurrentPath(href);

    const activeProps = {
      'aria-current': (isActive
        ? 'page'
        : undefined) as HTMLAttributes<HTMLAnchorElement>['aria-current'],
      'data-active': isActive ? true : undefined,
    };

    return <Link {...activeProps} href={href} {...restProps} ref={ref} />;
  },
);

ActiveLink.displayName = 'ActiveLink';

export default ActiveLink;
