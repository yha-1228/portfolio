import { type ComponentPropsWithRef, forwardRef } from "react";
import { clsx } from "@/utils/css/clsx";

const Container = forwardRef<HTMLDivElement, ComponentPropsWithRef<"div">>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <div
        className={clsx("container mx-auto px-5", className)}
        {...restProps}
        ref={ref}
      />
    );
  },
);

Container.displayName = "Container";

export { Container };
