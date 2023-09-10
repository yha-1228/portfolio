'use client';

import React from 'react';
import useFocusActive from '@/hooks/use-focus-active';
import { OmitKey } from '@/types/utils';
import clsx from '@/utils/css/clsx';
import { generateContext } from '@/utils/react/context';

const [Context, useContext] =
  generateContext<React.RefObject<HTMLAnchorElement>>();

type ProviderProps = React.ComponentProps<'div'>;

function Provider(props: ProviderProps) {
  const { className, ...restDivProps } = props;
  const linkRef = React.useRef<HTMLAnchorElement>(null);
  const linkFocusActive = useFocusActive(linkRef);

  return (
    <Context.Provider value={linkRef}>
      <div
        className={clsx(className, linkFocusActive ? 'not-sr-only' : 'sr-only')}
        {...restDivProps}
      />
    </Context.Provider>
  );
}

// ----------------------------------------

type LinkProps = OmitKey<React.ComponentPropsWithoutRef<'a'>, 'href'> & {
  hrefId: string;
};

function Link(props: LinkProps) {
  const { hrefId, className, ...restProps } = props;
  const linkRef = useContext();

  return (
    <a
      ref={linkRef}
      href={`#${hrefId}`}
      className={clsx(className, 'sr-only focus:not-sr-only')}
      {...restProps}
    />
  );
}

// ----------------------------------------

export { Provider as TabOnlySkipContainer };
export { Link as TabOnlySkipLink };
