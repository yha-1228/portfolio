import React, { useEffect } from 'react';

/**
 * `window.addEventListener(...)`を実行する
 */
export default function useWindowEvent<K extends keyof WindowEventMap>(
  type: K,
  handlar: (ev: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
) {
  const savedHandlar = React.useRef(handlar);

  useEffect(() => {
    savedHandlar.current = handlar;
  }, [handlar]);

  useEffect(() => {
    if (!window) return;

    const listener = (event: WindowEventMap[K]) => savedHandlar.current(event);

    window.addEventListener(type, listener, options);

    return () => window.removeEventListener(type, listener, options);
  }, [options, type]);
}
