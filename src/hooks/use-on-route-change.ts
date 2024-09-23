import { useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function useOnRouteChange(callback: () => void) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const pathname = usePathname();

  useEffect(() => {
    savedCallback.current?.();
  }, [pathname]);
}
