'use client';

import { useId, useState } from 'react';
import {
  BsFillCheckCircleFill,
  BsFillExclamationCircleFill,
  BsX,
} from 'react-icons/bs';
import { isFetchNetworkError } from '@/api/misc';
import { sendContact } from '@/api/requests';
import * as m from '@/form/message';
import * as v from '@/form/validator';
import useBeforeUnload from '@/hooks/use-beforeunload';
import clsx from '@/utils/css/clsx';
import existsValue from '@/utils/object/exists-value';
import mapObject from '@/utils/object/map-object';
import { objectKeys, objectValues } from '@/utils/object/typed-native';
import { Button } from './ui/styled/button';
import Container from './ui/styled/container';
import FieldLabel from './ui/styled/field-label';
import FormErrorMessage from './ui/styled/form-error-message';
import Heading1 from './ui/styled/heading1';
import { Input, Textarea } from './ui/styled/input';
import Paragraph from './ui/styled/paragraph';
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
  primary: <BsFillCheckCircleFill className="h-6 w-6" />,
  danger: <BsFillExclamationCircleFill className="h-6 w-6" />,
};

function FeedbackNotification(props: FeedbackNotificationProps) {
  const { variant, children, onClose, className } = props;

  return (
    <div
      className={clsx(
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
        <BsX className="h-8 w-8" />
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

type ContactFormErrors = { [key in keyof ContactFormValues]?: string };

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

type ContactFormTouched = { [key in keyof ContactFormValues]: boolean };

const initialTouched: ContactFormTouched = {
  name: false,
  companyName: false,
  email: false,
  message: false,
};

const initialAllErrorVisible = false;

const keyLabelMap: { [key in keyof ContactFormValues]: string } = {
  name: 'お名前',
  email: 'メールアドレス',
  companyName: '会社名',
  message: 'お問い合わせ内容',
};

const FORM_NAME = 'contact';

const feedbackText = {
  done: 'お問い合わせありがとうございます。',
  networkError: 'ネットワークに接続されていません。',
  fail: '送信中にエラーが発生しました。',
};

const createFieldId = (uniqId: string, key: keyof ContactFormTouched) => {
  return `${uniqId}-ContactForm-${key}-field`;
};

const createLabelId = (uniqId: string, key: keyof ContactFormTouched) => {
  return `${uniqId}-ContactForm-${key}-label`;
};

const createErrorId = (uniqId: string, key: keyof ContactFormValues) => {
  return `${uniqId}-ContactForm-${key}-error`;
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
  const [allErrorVisible, setAllErrorVisible] = useState(
    initialAllErrorVisible,
  );

  const handleChange = (e: React.ChangeEvent<FieldType>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e: React.FocusEvent<FieldType>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleErrorListItemClick = (key: keyof ContactFormValues) => {
    const labelId = createLabelId(id, key);
    window.location.href = `#${labelId}`;

    const fieldId = createFieldId(id, key);
    const fieldElem = document.getElementById(fieldId);
    fieldElem?.focus();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (existsValue(errors)) {
      setTouched(mapObject(initialTouched, true));
      setAllErrorVisible(true);

      return;
    }

    setSubmitState({ state: 'loading' });
    try {
      await sendContact(FORM_NAME, values);
      setSubmitState({ state: 'success' });
      setValues(initialValues);
      setTouched(initialTouched);
      setAllErrorVisible(initialAllErrorVisible);
    } catch (error) {
      setSubmitState({ state: 'error', error });
    }
  };

  useBeforeUnload({
    enabled: existsValue(values),
  });

  return (
    <div className="py-14 lg:pb-20">
      <Container>
        <Heading1>お問い合わせ</Heading1>

        <Paragraph className="text-gray-foreground-weak">
          お気軽にお問い合わせください。
          <br />
          <span aria-hidden="true" className="text-danger-500">
            * は必須項目です。
          </span>
        </Paragraph>

        <div
          className={clsx(
            'mt-10',
            'lg:rounded-xl lg:border lg:border-solid lg:border-gray-light-200 lg:bg-white lg:px-10 lg:pb-11 lg:pt-8 lg:shadow-wide',
          )}
        >
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
                  <FieldLabel
                    id={createLabelId(id, 'name')}
                    htmlFor={createFieldId(id, 'name')}
                    reqired
                  >
                    {keyLabelMap.name}
                  </FieldLabel>
                  <div className="mt-2">
                    <Input
                      type="text"
                      id={createFieldId(id, 'name')}
                      name="name"
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
                      className="mt-2"
                    >
                      {errors.name}
                    </FormErrorMessage>
                  </Show>
                </div>
                <div className="md:w-2/3">
                  <FieldLabel
                    id={createLabelId(id, 'email')}
                    htmlFor={createFieldId(id, 'email')}
                    reqired
                  >
                    {keyLabelMap.email}
                  </FieldLabel>
                  <div className="mt-2">
                    <Input
                      type="email"
                      id={createFieldId(id, 'email')}
                      name="email"
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
                      className="mt-2"
                    >
                      {errors.email}
                    </FormErrorMessage>
                  </Show>
                </div>
              </div>
              <div>
                <FieldLabel
                  id={createLabelId(id, 'companyName')}
                  htmlFor={createFieldId(id, 'companyName')}
                >
                  {keyLabelMap.companyName}
                </FieldLabel>
                <div className="mt-2">
                  <Input
                    type="text"
                    id={createFieldId(id, 'companyName')}
                    name="companyName"
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
                    className="mt-2"
                  >
                    {errors.companyName}
                  </FormErrorMessage>
                </Show>
              </div>
              <div>
                <FieldLabel
                  id={createLabelId(id, 'message')}
                  htmlFor={createFieldId(id, 'message')}
                  reqired
                >
                  {keyLabelMap.message}
                </FieldLabel>
                <div className="mt-2">
                  <Textarea
                    id={createFieldId(id, 'message')}
                    name="message"
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
                    className="mt-2"
                  >
                    {errors.message}
                  </FormErrorMessage>
                </Show>
              </div>
            </div>

            <div className="mt-10 lg:mt-14">
              <Show when={existsValue(errors) && allErrorVisible}>
                <div className="mb-5 border-t-4 border-solid border-t-danger-600 bg-danger-50 px-5 py-4 text-danger-600">
                  <div className="font-bold">
                    {objectValues(errors).length}件の項目に問題があります。
                  </div>
                  <ul className="mt-3">
                    {objectKeys(errors).map((key) => (
                      <li key={key} className="text-sm">
                        <button
                          type="button"
                          onClick={() => handleErrorListItemClick(key)}
                          className="underline underline-offset-2"
                        >
                          {keyLabelMap[key]}: {errors[key]}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </Show>

              <Button
                disabled={submitState.state === 'loading'}
                className="w-full"
              >
                {submitState.state === 'loading' ? '送信中...' : '送信する'}
              </Button>
            </div>
          </form>
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
        </div>
      </Container>
    </div>
  );
}
