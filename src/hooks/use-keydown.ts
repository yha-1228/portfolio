import { useEffect, useRef } from "react";

export function useKeydown(callback: (event: KeyboardEvent) => void) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      savedCallback.current(event);
    };

    window.addEventListener("keydown", listener);

    return () => window.removeEventListener("keydown", listener);
  }, []);
}
