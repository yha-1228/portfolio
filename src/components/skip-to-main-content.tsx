'use client';

import { useRef } from 'react';
import { MAIN_CONTENT_ID } from '@/constants';
import useFocusActive from '@/hooks/use-focus-active';
import clsx from '@/utils/css/clsx';
import Container from './ui/styled/container';

export default function SkipToMainContent() {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const linkFocusActive = useFocusActive(linkRef);

  return (
    <div
      className={clsx(
        'bg-primary-600 py-2 text-white',
        linkFocusActive ? 'not-sr-only' : 'sr-only',
      )}
    >
      <Container>
        <a
          ref={linkRef}
          href={`#${MAIN_CONTENT_ID}`}
          className={clsx(
            'inline-block py-1 font-bold underline underline-offset-[0.15em]',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-300',
            'sr-only focus:not-sr-only',
          )}
        >
          メインコンテンツにスキップ
        </a>
      </Container>
    </div>
  );
}
