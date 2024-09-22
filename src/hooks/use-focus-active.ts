import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

export default function useFocusActive<T extends HTMLElement>(
  ref: RefObject<T>,
) {
  const [focusActive, setFocusActive] = useState(false);

  useEffect(() => {
    const elem = ref.current;
    if (!elem) return;

    const handleFocusin = () => setFocusActive(true);
    const handleFocusout = () => setFocusActive(false);

    elem.addEventListener('focusin', handleFocusin);
    elem.addEventListener('focusout', handleFocusout);

    return () => {
      elem.removeEventListener('focusin', handleFocusin);
      elem.removeEventListener('focusout', handleFocusout);
    };
  }, [ref]);

  return focusActive;
}
