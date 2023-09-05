'use client';

import React, { HTMLAttributes } from 'react';
import Link from 'next/link';
import { LinkComponentProps } from '@/lib/next/types';
import { OmitKey } from '@/types/utils';
import useIsMatchCurrentPath from '../hooks/use-match-current-path';

type ActiveLinkProps = OmitKey<LinkComponentProps, 'aria-current'>;

/**
 * `href`に指定したURLが現在地と同じとき、`data-active="true"`になる。
 */
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
