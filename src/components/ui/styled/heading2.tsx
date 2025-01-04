import { forwardRef, type ComponentPropsWithRef } from "react";
import { clsx } from "@/utils/css/clsx";

const Heading2 = forwardRef<HTMLHeadingElement, ComponentPropsWithRef<"h2">>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <h2
        className={clsx(
          "text-xl font-bold leading-tight sm:text-2xl",
          className,
        )}
        {...restProps}
        ref={ref}
      />
    );
  },
);

Heading2.displayName = "Heading2";

export { Heading2 };
