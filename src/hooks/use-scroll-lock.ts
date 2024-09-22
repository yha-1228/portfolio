import { useEffect } from 'react';

export default function useScrollLock({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    const defaultBodyOverflow = window.getComputedStyle(document.body).overflow;

    document.body.style.overflow = enabled ? 'hidden' : defaultBodyOverflow;

    return () => {
      document.body.style.overflow = defaultBodyOverflow;
    };
  }, [enabled]);
}
