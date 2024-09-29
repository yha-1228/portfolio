import * as m from '@/form/message';
import * as v from '@/form/validator';
import type { ContactFormValues, ContactFormErrors } from './types';

export function validate(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!v.exists(values.name)) {
    errors.name = m.required;
  }

  if (!v.exists(values.email)) {
    errors.email = m.required;
  } else if (!v.isEmail(values.email)) {
    errors.email = m.email;
  }

  if (v.exists(values.companyName)) {
    if (!v.isLength(values.companyName, { max: 100 })) {
      errors.companyName = m.length({ max: 100 });
    }
  }

  if (!v.exists(values.message)) {
    errors.message = m.required;
  } else if (!v.isLength(values.message, { min: 10 })) {
    errors.message = m.length({ min: 10 });
  } else if (!v.isLength(values.message, { max: 10000 })) {
    errors.message = m.length({ max: 10000 });
  }

  return errors;
}
