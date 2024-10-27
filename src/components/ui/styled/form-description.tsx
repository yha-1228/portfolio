import { forwardRef, type ComponentPropsWithRef } from "react";
import { clsx } from "@/utils/css/clsx";

const FormDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithRef<"p">
>((props, ref) => {
  const { className, ...restProps } = props;

  return (
    <p
      className={clsx("text-sm text-gray-foreground-weak", className)}
      {...restProps}
      ref={ref}
    />
  );
});

FormDescription.displayName = "FormDescription";

export { FormDescription };
