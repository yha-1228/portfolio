import { forwardRef, type ComponentPropsWithRef } from "react";
import { clsx } from "@/utils/css/clsx";

/**
 * my-20pxのみ
 */
const Paragraph = forwardRef<HTMLParagraphElement, ComponentPropsWithRef<"p">>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return <p className={clsx("my-5", className)} {...restProps} ref={ref} />;
  },
);

Paragraph.displayName = "Paragraph";

export { Paragraph };
