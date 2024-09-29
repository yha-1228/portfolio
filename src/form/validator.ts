import assertNever from '@/utils/assert-never';

// exists
// ----------------------------------------

const exists = {
  check: (input: string) => {
    return input.trim().length > 0;
  },
  getMessage: () => {
    return '入力してください。';
  },
};

// isEmail
// ----------------------------------------

const isEmail = {
  check: (input: string) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input);
  },
  getMessage: () => {
    return 'メールアドレスの形式で入力してください。';
  },
};

// isLength
// ----------------------------------------

type IsLengthCheckOptions =
  | { min: number; max: number }
  | { min: number }
  | { max: number };

const isLength = {
  check: (input: string, options: IsLengthCheckOptions) => {
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
  },
  getMessage: (options: IsLengthCheckOptions) => {
    if ('min' in options && 'max' in options) {
      return `${options.min}文字以上、${options.max}文字以下で入力してください。`;
    }

    if ('min' in options) {
      return `${options.min}文字以上で入力してください。`;
    }

    if ('max' in options) {
      return `${options.max}文字以下で入力してください。`;
    }

    return assertNever(options);
  },
};

// exports
// ----------------------------------------

const validator = {
  exists,
  isEmail,
  isLength,
};

export default validator;
