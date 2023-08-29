'use client';

import { useId, useState } from 'react';
import {
  BsFillCheckCircleFill,
  BsFillExclamationCircleFill,
  BsX,
} from 'react-icons/bs';
import { twMerge } from 'tailwind-merge';
import { isFetchNetworkError } from '@/api/misc';
import { sendContact } from '@/api/requests';
import * as m from '@/form/message';
import * as v from '@/form/validator';
import useBeforeUnload from '@/hooks/use-beforeunload';
import existsValue from '@/utils/object/exists-value';
import isEmptyObject from '@/utils/object/is-empty-object';
import { Button } from './ui/button';
import Container from './ui/container';
import FieldLabel from './ui/field-label';
import FormErrorMessage from './ui/form-error-message';
import Heading1 from './ui/heading1';
import { Input, Textarea } from './ui/input';
import Show from './ui/unstyled/show';

type FeedbackNotificationProps = {
  variant: 'primary' | 'danger';
  children?: React.ReactNode;
  onClose?: () => void;
  className?: string;
};

type VariantClassMap = Record<FeedbackNotificationProps['variant'], string>;

const variantRootClassMap: VariantClassMap = {
  primary: 'bg-primary-500',
  danger: 'bg-danger-500',
};

const variantButtonClassMap: VariantClassMap = {
  primary: 'hover:bg-primary-600 active:bg-primary-700',
  danger: 'hover:bg-danger-600 active:bg-danger-700',
};

type VariantIconMap = Record<
  FeedbackNotificationProps['variant'],
  React.ReactNode
>;

const variantIconMap: VariantIconMap = {
  primary: <BsFillCheckCircleFill style={{ width: 24, height: 24 }} />,
  danger: <BsFillExclamationCircleFill style={{ width: 24, height: 24 }} />,
};

function FeedbackNotification(props: FeedbackNotificationProps) {
  const { variant, children, onClose, className } = props;

  return (
    <div
      className={twMerge(
        className,
        `flex items-center justify-between rounded-lg ${variantRootClassMap[variant]} px-4 py-3 text-white`,
      )}
    >
      <div className="flex items-center space-x-3">
        {variantIconMap[variant]}
        <div>{children}</div>
      </div>
      <button
        aria-label="閉じる"
        className={`inline-flex items-center rounded-full ${variantButtonClassMap[variant]}`}
        onClick={onClose}
      >
        <BsX style={{ width: 32, height: 32, color: '#fff' }} />
      </button>
    </div>
  );
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
   * 会社名
   *
   * @description 任意, 入力された場合は100文字以内
   */
  companyName: string;
  /**
   * お問い合わせ内容
   *
   * @description 必須, 10000文字以内
   */
  message: string;
};

const initialValues: ContactFormValues = {
  name: '',
  email: '',
  companyName: '',
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

  if (v.exists(values.companyName)) {
    if (!v.isLength(values.companyName, { max: 100 })) {
      errors.companyName = m.length({ max: 100 });
    }
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
  done: 'お問い合わせありがとうございます。',
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

  useBeforeUnload({
    enabled: existsValue(values),
  });

  return (
    <div className="py-14">
      <Container>
        <div className="space-y-6">
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
              <div className="space-y-5 md:flex md:space-x-4 md:space-y-0">
                <div className="md:w-1/3">
                  <FieldLabel htmlFor="name" reqired>
                    お名前
                  </FieldLabel>
                  <div className="mt-2">
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="田中 太郎"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={showError('name', errors, touched)}
                      aria-describedby={createErrorId(id, 'name')}
                    />
                  </div>
                  <Show when={showError('name', errors, touched)}>
                    <FormErrorMessage
                      id={createErrorId(id, 'name')}
                      className="mt-1"
                    >
                      {errors.name}
                    </FormErrorMessage>
                  </Show>
                </div>
                <div className="md:w-2/3">
                  <FieldLabel htmlFor="email" reqired>
                    メールアドレス
                  </FieldLabel>
                  <div className="mt-2">
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="email@example.com"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={showError('email', errors, touched)}
                      aria-describedby={createErrorId(id, 'email')}
                    />
                  </div>
                  <Show when={showError('email', errors, touched)}>
                    <FormErrorMessage
                      id={createErrorId(id, 'email')}
                      className="mt-1"
                    >
                      {errors.email}
                    </FormErrorMessage>
                  </Show>
                </div>
              </div>
              <div>
                <FieldLabel htmlFor="companyName">会社名</FieldLabel>
                <div className="mt-2">
                  <Input
                    type="text"
                    name="companyName"
                    id="companyName"
                    placeholder="株式会社ABC / 自営業"
                    value={values.companyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={showError('companyName', errors, touched)}
                    aria-describedby={createErrorId(id, 'companyName')}
                  />
                </div>
                <Show when={showError('companyName', errors, touched)}>
                  <FormErrorMessage
                    id={createErrorId(id, 'companyName')}
                    className="mt-1"
                  >
                    {errors.companyName}
                  </FormErrorMessage>
                </Show>
              </div>
              <div>
                <FieldLabel htmlFor="message" reqired>
                  お問い合わせ内容
                </FieldLabel>
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
                <Show when={showError('message', errors, touched)}>
                  <FormErrorMessage
                    id={createErrorId(id, 'message')}
                    className="mt-1"
                  >
                    {errors.message}
                  </FormErrorMessage>
                </Show>
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
        </div>
        {submitState.state === 'success' && (
          <FeedbackNotification
            className="mt-10"
            variant="primary"
            onClose={() => setSubmitState({ state: 'idle' })}
          >
            {feedbackText.done}
          </FeedbackNotification>
        )}
        {submitState.state === 'error' && (
          <FeedbackNotification
            className="mt-10"
            variant="danger"
            onClose={() => setSubmitState({ state: 'idle' })}
          >
            {isFetchNetworkError(submitState.error)
              ? feedbackText.networkError
              : feedbackText.fail}
          </FeedbackNotification>
        )}
      </Container>
    </div>
  );
}
