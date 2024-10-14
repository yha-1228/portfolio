"use client";

import {
  type ComponentPropsWithRef,
  type ElementType,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { type Replace } from "@/types/utils";
import { isTouchDevice } from "@/utils/device/is-touch-device";
import { splitNode } from "./split-node";

interface AvoidTelLinkProps
  extends Replace<ComponentPropsWithRef<"div">, { children: string }> {
  as: ElementType;
}

/**
 * `<meta name="format-detection" .. />`を指定してもiOSのChromeで電話番号リンクが付いてしまうため、
 * それを強制的に阻止するためのコンポーネント。
 */
const AvoidTelLink = forwardRef<HTMLDivElement, AvoidTelLinkProps>(
  ({ as: Component, children, ...restProps }, ref) => {
    const [splitDisabled, setSplitDisabled] = useState(false);

    useEffect(() => {
      const touchDevice = isTouchDevice();
      setSplitDisabled(!touchDevice);
    }, []);

    if (splitDisabled) {
      return (
        <Component {...restProps} ref={ref}>
          {children}
        </Component>
      );
    }

    return (
      <Component {...restProps} ref={ref}>
        {splitNode(children.split(""), <>&zwnj;</>)}
      </Component>
    );
  },
);

AvoidTelLink.displayName = "AvoidTelLink";

export { AvoidTelLink };
