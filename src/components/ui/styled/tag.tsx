import { type ComponentPropsWithRef, forwardRef } from "react";
import { clsx } from "@/utils/css/clsx";

const Tag = forwardRef<HTMLDivElement, ComponentPropsWithRef<"div">>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <div
        className={clsx(
          "inline-block rounded-full bg-gray-light-100 px-3.5 py-0.5 text-sm text-gray-foreground-weak",
          className,
        )}
        {...restProps}
        ref={ref}
      />
    );
  },
);

Tag.displayName = "Tag";

export { Tag };
