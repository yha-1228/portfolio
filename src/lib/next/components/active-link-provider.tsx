'use client';

import React from 'react';
import useIsMatchCurrentPath from '../hooks/use-match-current-path';
import type { Url } from 'next/dist/shared/lib/router/router';

interface ChildrenProps {
  isActive: boolean;
  ariaProps: { 'aria-current': 'page' | undefined };
}

interface ActiveLinkProviderProps {
  href: Url;
  children?: ({ isActive }: ChildrenProps) => React.ReactNode;
}

export default function ActiveLinkProvider(props: ActiveLinkProviderProps) {
  const { href, children } = props;
  const isActive = useIsMatchCurrentPath(href);

  const ariaProps = {
    'aria-current': isActive ? ('page' as const) : undefined,
  };

  return <>{children?.({ isActive, ariaProps })}</>;
}
