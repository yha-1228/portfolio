import { type ElementType, useRef, type ComponentPropsWithoutRef } from "react";
import { useKeydown } from "@/hooks/use-keydown";
import { loopFocus } from "@/utils/dom/utils";

export interface LoopFocusContainerProps
  extends ComponentPropsWithoutRef<"div"> {
  as: ElementType;
}

export function LoopFocusContainer({
  as: Component,
  ...props
}: LoopFocusContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useKeydown((event) => {
    loopFocus(event, ref.current!);
  });

  return <Component ref={ref} {...props} />;
}
