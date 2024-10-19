import React from "react";
import { clsx } from "@/utils/css/clsx";

type FormDescriptionProps = React.ComponentPropsWithRef<"p">;

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
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
