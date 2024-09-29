import assertNever from '@/utils/assert-never';

export function exists(input: string) {
  return !!input;
}

export function isEmail(input: string) {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input);
}

export type IsLengthOptions =
  | { min: number; max: number }
  | { min: number }
  | { max: number };

export function isLength(input: string, options: IsLengthOptions) {
  const length = input.length;

  if ('min' in options && 'max' in options) {
    return options.min <= length && length <= options.max;
  }

  if ('min' in options) {
    return options.min <= length;
  }

  if ('max' in options) {
    return length <= options.max;
  }

  return assertNever(options);
}
