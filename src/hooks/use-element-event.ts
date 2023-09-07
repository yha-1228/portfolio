import React, { useEffect } from 'react';

/**
 * `HTMLElement.addEventListener(...)`を実行する
 */
export default function useElementEvent<
  T extends HTMLElement,
  K extends keyof HTMLElementEventMap,
>(
  ref: React.RefObject<T>,
  type: K,
  handlar: (ev: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
) {
  const savedHandlar = React.useRef(handlar);

  useEffect(() => {
    savedHandlar.current = handlar;
  }, [handlar]);

  useEffect(() => {
    const elem = ref.current;
    if (!elem) return;

    const listener = (event: HTMLElementEventMap[K]) =>
      savedHandlar.current(event);

    elem.addEventListener(type, listener, options);

    return () => elem.removeEventListener(type, listener, options);
  }, [options, ref, type]);
}
