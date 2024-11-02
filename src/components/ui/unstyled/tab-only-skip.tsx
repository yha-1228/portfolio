"use client";

import {
  type RefObject,
  type ComponentProps,
  useRef,
  type ComponentPropsWithoutRef,
} from "react";
import { useFocusActive } from "@/hooks/use-focus-active";
import { clsx } from "@/utils/css/clsx";
import { generateContext } from "@/utils/react";

const [Context, useContext] = generateContext<RefObject<HTMLAnchorElement>>();

function Provider(props: ComponentProps<"div">) {
  const { className, ...restDivProps } = props;
  const linkRef = useRef<HTMLAnchorElement>(null);
  const linkFocusActive = useFocusActive(linkRef);

  return (
    <Context.Provider value={linkRef}>
      <div
        className={clsx(className, linkFocusActive ? "not-sr-only" : "sr-only")}
        {...restDivProps}
      />
    </Context.Provider>
  );
}

// ----------------------------------------

interface LinkProps extends Omit<ComponentPropsWithoutRef<"a">, "href"> {
  hrefId: string;
}

function Link(props: LinkProps) {
  const { hrefId, className, ...restProps } = props;
  const linkRef = useContext();

  return (
    <a
      ref={linkRef}
      href={`#${hrefId}`}
      className={clsx(className, "sr-only focus:not-sr-only")}
      {...restProps}
    />
  );
}

// ----------------------------------------

export { Provider as TabOnlySkipContainer };
export { Link as TabOnlySkipLink };
