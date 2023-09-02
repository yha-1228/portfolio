'use client';

import React from 'react';
import Link from 'next/link';
import useIsMatchCurrentPath from '@/hooks/use-match-current-path';
import { LinkComponentProps } from '@/lib/next/types';
import { OmitKey } from '@/types/utils';

type ActiveLinkProps = OmitKey<LinkComponentProps, 'aria-current'>;

const ActiveLink = React.forwardRef<HTMLAnchorElement, ActiveLinkProps>(
  (props, ref) => {
    const { href, ...restProps } = props;
    const isCurrent = useIsMatchCurrentPath(href);

    return (
      <Link
        aria-current={isCurrent ? 'page' : undefined}
        data-current={isCurrent ? true : undefined}
        href={href}
        {...restProps}
        ref={ref}
      />
    );
  },
);

ActiveLink.displayName = 'ActiveLink';

export default ActiveLink;
