import { twMerge } from 'tailwind-merge';

type ClassInput = string | number | boolean | null | undefined;

/**
 * クラス名を結合する (`twMerge`も織込み済み)
 */
export default function clsx(...inputs: ClassInput[]) {
  const classes = inputs.filter(Boolean).join(' ');
  return twMerge(classes);
}
