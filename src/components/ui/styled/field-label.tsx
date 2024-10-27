import { type ComponentPropsWithRef, forwardRef } from "react";
import { clsx } from "@/utils/css/clsx";

interface FieldLabelProps extends ComponentPropsWithRef<"label"> {
  /**
   * 必須項目を示す。以下の処理が入る。
   *
   * - "*"マークを表示 (スクリーンリーダーの場合: "必須項目")
   */
  required?: boolean;
}

const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(
  (props, ref) => {
    const { className, children, required, ...restProps } = props;

    return (
      <label
        className={clsx("block font-bold", className)}
        {...restProps}
        ref={ref}
      >
        {required ? (
          <>
            {children}{" "}
            <span aria-hidden="true" className="font-normal text-danger-500">
              *
            </span>
            <span className="sr-only">必須</span>
          </>
        ) : (
          children
        )}
      </label>
    );
  },
);

FieldLabel.displayName = "FieldLabel";

export { FieldLabel, type FieldLabelProps };
