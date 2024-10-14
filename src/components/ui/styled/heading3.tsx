import React from "react";
import { clsx } from "@/utils/css/clsx";

type Heading3Props = React.ComponentPropsWithRef<"h3">;

const Heading3 = React.forwardRef<HTMLHeadingElement, Heading3Props>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <h3
        className={clsx(
          "mb-5 mt-8 text-lg font-bold leading-tight sm:text-xl",
          className,
        )}
        {...restProps}
        ref={ref}
      />
    );
  },
);

Heading3.displayName = "Heading3";

export { Heading3 };
