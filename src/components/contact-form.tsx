import { useState } from 'react';
import { BsFillCheckCircleFill, BsX } from 'react-icons/bs';
import { sendContact } from '@/api/requests';
import * as m from '@/form/message';
import * as v from '@/form/validator';
import isEmptyObject from '@/utils/is-empty-object';
import { Button } from './ui/button';
import Container from './ui/container';
import Heading1 from './ui/heading1';
import { Input, Textarea } from './ui/input';

type FeedbackNotificationProps = {
  type: 'done' | 'fail';
  children?: React.ReactNode;
  onClose?: () => void;
};

function FeedbackNotification({
  type,
  children,
  onClose,
}: FeedbackNotificationProps) {
  if (type == 'done') {
    return (
      <div className="mt-10 flex items-center justify-between rounded-lg bg-primary-500 px-4 py-3 text-white">
        <div className="flex items-center space-x-3">
          <BsFillCheckCircleFill style={{ width: 24, height: 24 }} />
          <div>{children}</div>
        </div>
        <button
          className="inline-flex items-center rounded-full hover:bg-primary-600 active:bg-primary-700"
          onClick={onClose}
        >
          <BsX style={{ width: 32, height: 32, color: '#fff' }} />
        </button>
      </div>
    );
  }

  if (type === 'fail') {
    return (
      <div className="mt-10 flex items-center justify-between rounded-lg bg-danger-500 px-4 py-3 text-white">
        <div className="flex items-center space-x-3">
          <BsFillCheckCircleFill style={{ width: 24, height: 24 }} />
          <div>{children}</div>
        </div>
        <button
          className="inline-flex items-center rounded-full hover:bg-danger-600 active:bg-danger-700"
          onClick={onClose}
        >
          <BsX style={{ width: 32, height: 32, color: '#fff' }} />
        </button>
      </div>
    );
  }

  return null;
}

// ----------------------------------------

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

const FORM_NAME = 'contact';

type FeedbackType = 'done' | 'fail';

const feedbackText = {
  done: 'お問い合わせ内容を送信しました。',
  fail: '送信中にエラーが発生しました。',
};

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const errors = validate(values);

  const [touched, setTouched] = useState(initialTouched);
  const [submitting, setSubmitting] = useState(false);

  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);

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
      await sendContact(FORM_NAME, values);
      setFeedbackType('done');
      setValues(initialValues);
      setTouched(initialTouched);
    } catch (error) {
      setFeedbackType('fail');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pb-14 pt-8">
      <Container>
        <section className="space-y-6">
          <Heading1>お問い合わせ</Heading1>
          <form
            onSubmit={handleSubmit}
            name={FORM_NAME}
            data-netlify="true"
            netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className="space-y-5">
              <div>
                <div>
                  <label htmlFor="name">お名前</label>
                </div>
                <div className="mt-2">
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isError={!!(errors.name && touched.name)}
                  />
                </div>
                {errors.name && touched.name ? (
                  <p className="mt-1 text-sm text-danger-500">{errors.name}</p>
                ) : null}
              </div>
              <div>
                <div>
                  <label htmlFor="email">メールアドレス</label>
                </div>
                <div className="mt-2">
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isError={!!(errors.email && touched.email)}
                  />
                </div>
                {errors.email && touched.email ? (
                  <p className="mt-1 text-sm text-danger-500">{errors.email}</p>
                ) : null}
              </div>
              <div>
                <div>
                  <label htmlFor="message">お問い合わせ内容</label>
                </div>
                <div className="mt-2">
                  <Textarea
                    name="message"
                    id="message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={6}
                    isError={!!(errors.message && touched.message)}
                  />
                </div>
                {errors.message && touched.message ? (
                  <p className="mt-1 text-sm text-danger-500">
                    {errors.message}
                  </p>
                ) : null}
              </div>
              <div>
                <Button
                  disabled={!isEmptyObject(errors) || submitting}
                  className="w-full lg:w-60"
                >
                  {submitting ? '送信中...' : '送信する'}
                </Button>
              </div>
            </div>
          </form>
        </section>
        {feedbackType && (
          <FeedbackNotification
            type={feedbackType}
            onClose={() => setFeedbackType(null)}
          >
            {feedbackText[feedbackType]}
          </FeedbackNotification>
        )}
      </Container>
    </div>
  );
}
