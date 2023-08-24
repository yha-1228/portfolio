import { useId, useState } from 'react';
import {
  BsFillCheckCircleFill,
  BsFillExclamationCircleFill,
  BsX,
} from 'react-icons/bs';
import { isAxiosNetworkError } from '@/api/misc';
import { sendContact } from '@/api/requests';
import * as m from '@/form/message';
import * as v from '@/form/validator';
import isEmptyObject from '@/utils/is-empty-object';
import { Button } from './ui/button';
import Container from './ui/container';
import FormErrorMessage from './ui/form-error-message';
import Heading1 from './ui/heading1';
import { Input, Textarea } from './ui/input';

type FeedbackNotificationProps = {
  variant: 'primary' | 'danger';
  children?: React.ReactNode;
  onClose?: () => void;
};

function FeedbackNotification({
  variant,
  children,
  onClose,
}: FeedbackNotificationProps) {
  if (variant == 'primary') {
    return (
      <div className="mt-10 flex items-center justify-between rounded-lg bg-primary-500 px-4 py-3 text-white">
        <div className="flex items-center space-x-3">
          <BsFillCheckCircleFill style={{ width: 24, height: 24 }} />
          <div>{children}</div>
        </div>
        <button
          aria-label="閉じる"
          className="inline-flex items-center rounded-full hover:bg-primary-600 active:bg-primary-700"
          onClick={onClose}
        >
          <BsX style={{ width: 32, height: 32, color: '#fff' }} />
        </button>
      </div>
    );
  }

  if (variant === 'danger') {
    return (
      <div className="mt-10 flex items-center justify-between rounded-lg bg-danger-500 px-4 py-3 text-white">
        <div className="flex items-center space-x-3">
          <BsFillExclamationCircleFill style={{ width: 24, height: 24 }} />
          <div>{children}</div>
        </div>
        <button
          aria-label="閉じる"
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
   * 会社名
   *
   * @description 任意, 入力された場合は100文字以内
   */
  companyName: string;
  /**
   * メールアドレス
   *
   * @description 必須, Eメール
   */
  email: string;
  /**
   * お問い合わせ内容
   *
   * @description 必須, 10000文字以内
   */
  message: string;
};

const initialValues: ContactFormValues = {
  name: '',
  companyName: '',
  email: '',
  message: '',
};

type ContactFormErrors = { [k in keyof ContactFormValues]?: string };

function validate(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!v.exists(values.name)) {
    errors.name = m.required;
  }

  if (v.exists(values.companyName)) {
    if (!v.isLength(values.companyName, { max: 100 })) {
      errors.companyName = m.length({ max: 100 });
    }
  }

  if (!v.exists(values.email)) {
    errors.email = m.required;
  } else if (!v.isEmail(values.email)) {
    errors.email = m.email;
  }

  if (!v.exists(values.message)) {
    errors.message = m.required;
  } else if (!v.isLength(values.message, { max: 10000 })) {
    errors.message = m.length({ max: 10000 });
  }

  return errors;
}

type ContactFormTouched = { [k in keyof ContactFormValues]: boolean };

const initialTouched: ContactFormTouched = {
  name: false,
  companyName: false,
  email: false,
  message: false,
};

const FORM_NAME = 'contact';

const feedbackText = {
  done: 'お問い合わせ内容を送信しました。',
  networkError: 'ネットワークに接続されていません。',
  fail: '送信中にエラーが発生しました。',
};

const createErrorId = (uniqId: string, name: keyof ContactFormValues) => {
  return `${uniqId}-${name}-error`;
};

const showError = (
  name: keyof ContactFormValues,
  errors: ContactFormErrors,
  touched: ContactFormTouched,
) => {
  return !!(errors[name] && touched[name]);
};

type SubmitState =
  | { state: 'idle' }
  | { state: 'loading' }
  | { state: 'success' }
  | { state: 'error'; error: unknown };

export default function ContactForm() {
  const id = useId();

  const [values, setValues] = useState(initialValues);
  const errors = validate(values);

  const [touched, setTouched] = useState(initialTouched);
  const [submitState, setSubmitState] = useState<SubmitState>({
    state: 'idle',
  });

  const handleChange = (e: React.ChangeEvent<FieldType>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e: React.FocusEvent<FieldType>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitState({ state: 'loading' });
    try {
      await sendContact(FORM_NAME, values);
      setSubmitState({ state: 'success' });
      setValues(initialValues);
      setTouched(initialTouched);
    } catch (error) {
      setSubmitState({ state: 'error', error });
    }
  };

  return (
    <div className="pb-14 pt-8">
      <Container>
        <section className="space-y-6">
          <Heading1>お問い合わせ</Heading1>
          <div>
            <p>お気軽にお問い合わせください。</p>
            <p aria-hidden="true" className="text-danger-500">
              * は必須項目です。
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            name={FORM_NAME}
            data-netlify="true"
            netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className="space-y-5">
              <div>
                <label className="block font-bold" htmlFor="name">
                  お名前{' '}
                  <span
                    aria-label="必須項目"
                    className="font-normal text-danger-500"
                  >
                    *
                  </span>
                </label>
                <div className="mt-2">
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={showError('name', errors, touched)}
                    aria-describedby={createErrorId(id, 'name')}
                  />
                </div>
                {showError('name', errors, touched) ? (
                  <FormErrorMessage
                    id={createErrorId(id, 'name')}
                    className="mt-1"
                  >
                    {errors.name}
                  </FormErrorMessage>
                ) : null}
              </div>
              <div>
                <label className="block font-bold" htmlFor="companyName">
                  会社名
                </label>
                <div className="mt-2">
                  <Input
                    type="text"
                    name="companyName"
                    id="companyName"
                    value={values.companyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={showError('companyName', errors, touched)}
                    aria-describedby={createErrorId(id, 'companyName')}
                  />
                </div>
                {showError('companyName', errors, touched) ? (
                  <FormErrorMessage
                    id={createErrorId(id, 'companyName')}
                    className="mt-1"
                  >
                    {errors.companyName}
                  </FormErrorMessage>
                ) : null}
              </div>
              <div>
                <label className="block font-bold" htmlFor="email">
                  メールアドレス{' '}
                  <span
                    aria-label="必須項目"
                    className="font-normal text-danger-500"
                  >
                    *
                  </span>
                </label>
                <div className="mt-2">
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={showError('email', errors, touched)}
                    aria-describedby={createErrorId(id, 'email')}
                  />
                </div>
                {showError('email', errors, touched) ? (
                  <FormErrorMessage
                    id={createErrorId(id, 'email')}
                    className="mt-1"
                  >
                    {errors.email}
                  </FormErrorMessage>
                ) : null}
              </div>
              <div>
                <label className="block font-bold" htmlFor="message">
                  お問い合わせ内容{' '}
                  <span
                    aria-label="必須項目"
                    className="font-normal text-danger-500"
                  >
                    *
                  </span>
                </label>
                <div className="mt-2">
                  <Textarea
                    name="message"
                    id="message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={6}
                    invalid={showError('message', errors, touched)}
                    aria-describedby={createErrorId(id, 'message')}
                  />
                </div>
                {showError('message', errors, touched) ? (
                  <FormErrorMessage
                    id={createErrorId(id, 'message')}
                    className="mt-1"
                  >
                    {errors.message}
                  </FormErrorMessage>
                ) : null}
              </div>
              <div>
                <Button
                  disabled={
                    !isEmptyObject(errors) || submitState.state === 'loading'
                  }
                  className="w-full lg:w-60"
                >
                  {submitState.state === 'loading' ? '送信中...' : '送信する'}
                </Button>
              </div>
            </div>
          </form>
        </section>
        {submitState.state === 'success' && (
          <FeedbackNotification
            variant="primary"
            onClose={() => setSubmitState({ state: 'idle' })}
          >
            {feedbackText.done}
          </FeedbackNotification>
        )}
        {submitState.state === 'error' && (
          <FeedbackNotification
            variant="danger"
            onClose={() => setSubmitState({ state: 'idle' })}
          >
            {isAxiosNetworkError(submitState.error)
              ? feedbackText.networkError
              : feedbackText.fail}
          </FeedbackNotification>
        )}
      </Container>
    </div>
  );
}
