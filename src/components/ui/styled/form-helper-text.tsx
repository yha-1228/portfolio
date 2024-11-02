import { forwardRef, type ComponentPropsWithRef } from "react";
import { clsx } from "@/utils/css/clsx";

const FormHelperText = forwardRef<
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

FormHelperText.displayName = "FormHelperText";

export { FormHelperText };
