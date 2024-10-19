import {
  type ComponentProps,
  useId,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import { type CommonHTMLProps } from "@/types/react";
import { join } from "@/utils/object/join";

interface UseFieldProps {
  fieldId?: string;
  descriptionId?: string;
  errorId?: string;
  whenError?: boolean;
}

function useField(props: UseFieldProps) {
  const {
    whenError = false,
    fieldId: fieldIdProp,
    descriptionId: descriptionIdProp,
    errorId: errorIdProp,
  } = props;

  const id = useId();

  const fieldId = fieldIdProp || `${id}-field`;
  const descriptionId = descriptionIdProp || `${id}-field-description`;
  const errorId = errorIdProp || `${id}-field-error`;

  const [hasDescription, setHasDescription] = useState(false);

  useEffect(() => {
    const descriptionElem = document.getElementById(descriptionId);
    setHasDescription(!!descriptionElem);
  }, [descriptionId]);

  const labelProps = {
    htmlFor: fieldId,
  } as const satisfies ComponentProps<"label">;

  const fieldProps = {
    id: fieldId,
    "aria-invalid": whenError || undefined,
    "aria-describedby":
      join([hasDescription && descriptionId, whenError && errorId], " ") ||
      undefined,
  } as const satisfies CommonHTMLProps;

  const descriptionProps = {
    id: descriptionId,
  } as const satisfies CommonHTMLProps;

  const errorProps = {
    id: errorId,
    style: { display: "none" },
  } as const satisfies CommonHTMLProps;

  return {
    whenError,
    labelProps,
    fieldProps,
    descriptionProps,
    errorProps,
  };
}

type UseFieldReturn = ReturnType<typeof useField>;

// ----------------------------------------

interface FieldProps extends UseFieldProps {
  render: (field: UseFieldReturn) => ReactNode;
}

/**
 * @example
 * ```tsx
 * function FormDemo() {
 *  const [input, setInput] = useState("");
 *  const [touched, setTouched] = useState(false);
 *
 *  const isError = touched && input.length < 10;
 *
 *  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
 *    e.preventDefault();
 *    // Submit
 *  };
 *
 *  return (
 *    <form onSubmit={onSubmit}>
 *      <Field
 *        whenError={isError}
 *        render={(field) => (
 *          <div>
 *            <label {...field.labelProps}>コメント</label>
 *            <input
 *              {...field.fieldProps}
 *              type="text"
 *              onChange={(e) => setInput(e.target.value)}
 *              onBlur={() => setTouched(true)}
 *              style={{ border: "1px solid #222" }}
 *            />
 *            <p {...field.descriptionProps}>10文字以上</p>
 *            {field.whenError && (
 *              <p {...field.errorProps} style={{ color: "red" }}>
 *                10文字以上で入力してください。
 *              </p>
 *            )}
 *          </div>
 *        )}
 *      />
 *
 *      <button type="submit" disabled={isError}>
 *        送信
 *      </button>
 *    </form>
 *  );
 * }
 *```
 */
function Field(props: FieldProps) {
  const { render, ...restProps } = props;
  const field = useField(restProps);

  return render(field);
}

// ----------------------------------------

export {
  useField,
  type UseFieldProps,
  type UseFieldReturn,
  Field,
  type FieldProps,
};
