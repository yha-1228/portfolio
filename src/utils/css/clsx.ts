import { twMerge } from "tailwind-merge";

export type ClassInput = string | boolean | undefined;

/**
 * クラス名を結合する (`twMerge`も織込み済み)
 */
export function clsx(...inputs: ClassInput[]) {
  const classes = inputs.filter(Boolean).join(" ");
  return twMerge(classes);
}
