import { useState } from 'react';
import { sendContact } from '@/api/requests';
import * as m from '@/form/message';
import * as v from '@/form/validator';
import isEmptyObject from '@/utils/is-empty-object';
import Button from './button';
import Container from './container';

type FieldType = HTMLInputElement | HTMLTextAreaElement;

type ContactFormValues = {
  /**
   * お名前
   *
   * @description 必須
   */
  name: string;
  /**
   * メールアドレス
   *
   * @description 必須, Eメール
   */
  email: string;
  /**
   * お問い合わせ内容
   *
   * @description 10文字以上
   */
  message: string;
};

const initialValues: ContactFormValues = {
  name: '',
  email: '',
  message: '',
};

type ContactFormErrors = { [k in keyof ContactFormValues]?: string };

function validate(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!v.exists(values.name)) {
    errors.name = m.required;
  }

  if (!v.exists(values.email)) {
    errors.email = m.required;
  } else if (!v.isEmail(values.email)) {
    errors.email = m.email;
  }

  if (!v.isLength(values.message, { min: 10 })) {
    errors.message = m.length({ min: 10 });
  }

  return errors;
}

type ContactFormTouched = { [k in keyof ContactFormValues]: boolean };

const initialTouched: ContactFormTouched = {
  name: false,
  email: false,
  message: false,
};

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const errors = validate(values);

  const [touched, setTouched] = useState<ContactFormTouched>(initialTouched);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<FieldType>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e: React.FocusEvent<FieldType>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);
    try {
      await sendContact('contact', values);
      alert('done');
    } catch (error) {
      console.error(error);
      alert('fail');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <form name="contact" method="POST" data-netlify="true">
        <input type="hidden" name="form-name" value="contact" />
      </form>

      <form onSubmit={handleSubmit}>
        <div className="space-y-3">
          <div>
            <div>
              <label htmlFor="name">お名前</label>
            </div>
            <div>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.name && touched.name ? (
              <p className="text-sm text-red-500">{errors.name}</p>
            ) : null}
          </div>
          <div>
            <div>
              <label htmlFor="email">メールアドレス</label>
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.email && touched.email ? (
              <p className="text-sm text-red-500">{errors.email}</p>
            ) : null}
          </div>
          <div>
            <div>
              <label htmlFor="message">お問い合わせ内容</label>
            </div>
            <div>
              <textarea
                name="message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.message && touched.message ? (
              <p className="text-sm text-red-500">{errors.message}</p>
            ) : null}
          </div>
        </div>
        <Button disabled={!isEmptyObject(errors) || submitting}>
          {submitting ? '送信中...' : '送信'}
        </Button>
      </form>
    </Container>
  );
}
