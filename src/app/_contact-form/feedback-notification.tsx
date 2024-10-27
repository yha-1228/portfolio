import { type ReactNode } from "react";
import {
  BsFillCheckCircleFill,
  BsFillExclamationCircleFill,
  BsX,
} from "react-icons/bs";
import { clsx } from "@/utils/css/clsx";

type Variant = "primary" | "danger";

const variantRootClassMap: Record<Variant, string> = {
  primary: "bg-primary-500",
  danger: "bg-danger-500",
};

const variantButtonClassMap: Record<Variant, string> = {
  primary: "hover:bg-primary-600 active:bg-primary-700",
  danger: "hover:bg-danger-600 active:bg-danger-700",
};

const variantIconMap: Record<Variant, ReactNode> = {
  primary: <BsFillCheckCircleFill className="size-6" />,
  danger: <BsFillExclamationCircleFill className="size-6" />,
};

export interface FeedbackNotificationProps {
  variant: Variant;
  children?: ReactNode;
  onClose?: () => void;
  className?: string;
}

export function FeedbackNotification(props: FeedbackNotificationProps) {
  const { variant, children, onClose, className } = props;

  return (
    <div
      className={clsx(
        "flex items-center justify-between rounded-lg px-4 py-3 text-white",
        variantRootClassMap[variant],
        className,
      )}
    >
      <div className="flex items-center space-x-3">
        {variantIconMap[variant]}
        <div>{children}</div>
      </div>
      <button
        type="button"
        aria-label="閉じる"
        className={clsx(
          "inline-flex items-center rounded-full",
          variantButtonClassMap[variant],
        )}
        onClick={onClose}
      >
        <BsX aria-hidden="true" className="size-8" />
      </button>
    </div>
  );
}
