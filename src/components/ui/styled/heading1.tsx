import React, { type ComponentPropsWithRef, forwardRef } from "react";
import { clsx } from "@/utils/css/clsx";

const Heading1 = forwardRef<HTMLHeadingElement, ComponentPropsWithRef<"h1">>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <h1
        className={clsx(
          "text-3xl font-bold leading-tight sm:text-4xl",
          className,
        )}
        {...restProps}
        ref={ref}
      />
    );
  },
);

Heading1.displayName = "Heading1";

export { Heading1 };
