import { twMerge } from "tailwind-merge";
import { join } from "../object/join";

export type ClassInput = string | boolean | undefined;

/**
 * クラス名を結合する (`twMerge`も織込み済み)
 */
export function clsx(...inputs: ClassInput[]) {
  return twMerge(join(inputs, " "));
}
