import { forwardRef, type ComponentPropsWithRef } from "react";
import { clsx } from "@/utils/css/clsx";

const Heading3 = forwardRef<HTMLHeadingElement, ComponentPropsWithRef<"h3">>(
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
