type ClassInput = string | number | boolean | null | undefined;

export default function clsx(...inputs: ClassInput[]) {
  return inputs.filter(Boolean).join(' ');
}
