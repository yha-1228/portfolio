import { useRef, useEffect } from "react";

export interface UseMediaQueryChangeOptions {
  query: string;
  callback?: (event: MediaQueryListEvent) => void;
}

export function useMediaQueryChange(options: UseMediaQueryChangeOptions) {
  const { query, callback } = options;

  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const mql = window.matchMedia(query);

    const listener = (event: MediaQueryListEvent) => {
      savedCallback.current?.(event);
    };

    mql.addEventListener("change", listener);

    return () => mql.removeEventListener("change", listener);
  }, [query]);
}
