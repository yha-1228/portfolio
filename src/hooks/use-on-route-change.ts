import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

export function useOnRouteChange(callback: () => void) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const pathname = usePathname();

  useEffect(() => {
    savedCallback.current?.();
  }, [pathname]);
}
