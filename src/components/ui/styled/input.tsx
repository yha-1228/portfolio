import { forwardRef, type ComponentPropsWithRef } from "react";
import { clsx } from "@/utils/css/clsx";

// common
// ----------------------------------------

interface InputBaseProps {
  /**
   * エラー時のスタイルを指定する
   */
  invalid?: boolean;
}

function createClassName(invalid?: boolean) {
  return clsx(
    "block w-full appearance-none rounded-md px-3 py-1 ring-1 ring-inset ring-gray-light-300 placeholder:text-gray-light-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-600",
    invalid && "ring-2 ring-danger-500 focus:ring-danger-500",
  );
}

// ----------------------------------------

interface InputProps extends ComponentPropsWithRef<"input">, InputBaseProps {}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { invalid, className, ...restProps } = props;

  return (
    <input
      className={clsx("h-10", createClassName(invalid), className)}
      {...restProps}
      ref={ref}
    />
  );
});

Input.displayName = "Input";

// ----------------------------------------

interface TextareaProps
  extends ComponentPropsWithRef<"textarea">,
    InputBaseProps {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const { invalid, className, ...restProps } = props;

    return (
      <textarea
        className={clsx(
          createClassName(invalid),
          "py-3 leading-normal",
          className,
        )}
        {...restProps}
        ref={ref}
      />
    );
  },
);

Textarea.displayName = "Textarea";

// ----------------------------------------

export { Input, type InputProps, Textarea, type TextareaProps };
