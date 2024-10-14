import { useEffect } from "react";

export interface UseBeforeUnloadOptions {
  enabled: boolean;
}

export function useBeforeUnload({ enabled }: UseBeforeUnloadOptions) {
  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      if (enabled) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handler);

    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, [enabled]);
}
