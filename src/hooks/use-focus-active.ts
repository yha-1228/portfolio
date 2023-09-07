import { useState } from 'react';
import useElementEvent from './use-element-event';

type UseFocusActiveOptions = {
  onFocusin?: (ev: HTMLElementEventMap['focusin']) => void;
  onFocusout?: (ev: HTMLElementEventMap['focusout']) => void;
};

export default function useFocusActive<T extends HTMLElement>(
  ref: React.RefObject<T>,
  options: UseFocusActiveOptions = {},
) {
  const { onFocusin, onFocusout } = options;

  const [focusActive, setFocusActive] = useState(false);

  useElementEvent(ref, 'focusin', (e) => {
    setFocusActive(true);
    if (ref.current) {
      onFocusin?.(e);
    }
  });

  useElementEvent(ref, 'focusout', (e) => {
    setFocusActive(false);
    if (ref.current) {
      onFocusout?.(e);
    }
  });

  return focusActive;
}
