export function exists(input: string) {
  return !!input;
}

export function isEmail(input: string) {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input);
}

interface IsLengthOptions {
  min?: number;
  max?: number;
}

export function isLength(input: string, options: IsLengthOptions) {
  const { min, max } = options;
  const length = input.length;

  if (min == null && max == null) {
    return true;
  }

  if (min != null && max == null) {
    return min <= length;
  }

  if (min == null && max != null) {
    return length <= max;
  }

  return (min as number) <= length && length <= (max as number);
}
