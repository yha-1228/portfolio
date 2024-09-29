import validator from '@/form/validator';
import { type ContactFormValues, type ContactFormErrors } from './types';

const { exists, isEmail, isLength } = validator;

export function validate(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!exists.check(values.name)) {
    errors.name = exists.getMessage();
  }

  if (!exists.check(values.email)) {
    errors.email = exists.getMessage();
  } else if (!isEmail.check(values.email)) {
    errors.email = isEmail.getMessage();
  }

  if (exists.check(values.companyName)) {
    if (!isLength.check(values.companyName, { max: 100 })) {
      errors.companyName = isLength.getMessage({ max: 100 });
    }
  }

  if (!exists.check(values.message)) {
    errors.message = exists.getMessage();
  } else if (!isLength.check(values.message, { min: 10 })) {
    errors.message = isLength.getMessage({ min: 10 });
  } else if (!isLength.check(values.message, { max: 10000 })) {
    errors.message = isLength.getMessage({ max: 10000 });
  }

  return errors;
}
