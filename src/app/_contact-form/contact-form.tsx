"use client";

import {
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  useId,
  useState,
} from "react";
import { sendNetlifyForm } from "@/api/clients/utils";
import { isFetchNetworkError } from "@/api/misc";
import { headerHeight } from "@/components/layouts/header";
import { Button } from "@/components/ui/styled/button";
import { Container } from "@/components/ui/styled/container";
import { FormErrorMessage } from "@/components/ui/styled/form-error-message";
import { FormHelperText } from "@/components/ui/styled/form-helper-text";
import { Heading1 } from "@/components/ui/styled/heading1";
import { Input, Textarea } from "@/components/ui/styled/input";
import { Label } from "@/components/ui/styled/label";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldProvider,
} from "@/components/ui/unstyled/field";
import { CONTACT_FORM_NAME } from "@/constants";
import { useBeforeUnload } from "@/hooks/use-beforeunload";
import { useMutation } from "@/hooks/use-mutation";
import { getKeyErrorMessageMap } from "@/lib/zod/utils";
import { clsx } from "@/utils/css/clsx";
import { remToPx } from "@/utils/css/unit";
import { entriesOf } from "@/utils/object/entries-of";
import { mapObject } from "@/utils/object/map-object";
import { FeedbackNotification } from "./feedback-notification";
import { type FieldType, type ContactFormTouched } from "./types";
import { contactFormSchema, type ContactFormValues } from "./validation";

// initial state list
// ----------------------------------------

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  companyName: "",
  message: "",
};

const initialTouched: ContactFormTouched = mapObject(
  initialValues,
  () => false,
);

const initialAllErrorVisible = false;

// constants, helpers
// ----------------------------------------

const keyLabelMap: { [key in keyof ContactFormValues]: string } = {
  name: "お名前",
  email: "メールアドレス",
  companyName: "会社名",
  message: "お問い合わせ内容",
};

const feedbackText = {
  done: "お問い合わせありがとうございます。",
  networkError: "ネットワークに接続されていません。",
  fail: "送信中にエラーが発生しました。",
};

const createFieldId = (id: string, key: keyof ContactFormValues) => {
  return `${id}-${key}-field`;
};

const createLabelId = (id: string, key: keyof ContactFormValues) => {
  return `${id}-${key}-label`;
};

const showError = (
  name: keyof ContactFormValues,
  errors: ReturnType<typeof getKeyErrorMessageMap<ContactFormValues>>,
  touched: ContactFormTouched,
) => {
  return !!(errors[name] && touched[name]);
};

// export
// ----------------------------------------

export function ContactForm() {
  const id = useId();

  const [values, setValues] = useState(initialValues);
  const errors = getKeyErrorMessageMap(contactFormSchema.safeParse(values));

  const [touched, setTouched] = useState(initialTouched);

  const [allErrorVisible, setAllErrorVisible] = useState(
    initialAllErrorVisible,
  );

  const [submitState, submitAction, resetSubmitAction] = useMutation({
    fn: (data: ContactFormValues) => {
      return sendNetlifyForm({
        htmlFilepath: "/__forms.html",
        formName: CONTACT_FORM_NAME,
        data,
      });
    },
    onSuccess: () => {
      setValues(initialValues);
      setTouched(initialTouched);
      setAllErrorVisible(initialAllErrorVisible);
    },
  });

  const handleChange = (e: ChangeEvent<FieldType>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e: FocusEvent<FieldType>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleErrorListItemClick = (key: keyof ContactFormValues) => {
    const labelId = createLabelId(id, key);
    const labelElem = document.getElementById(labelId);
    const labelY = labelElem?.getBoundingClientRect().top;
    if (!labelY) return;

    const bufferMargin = 12;
    const scrollToTop =
      window.scrollY + labelY - remToPx(headerHeight) - bufferMargin;

    const isTransitionReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: scrollToTop,
      behavior: isTransitionReduced ? "instant" : "smooth",
    });

    const fieldId = createFieldId(id, key);
    const fieldElem = document.getElementById(fieldId);
    fieldElem?.focus({ preventScroll: !isTransitionReduced });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      setTouched(mapObject(initialTouched, () => true));
      setAllErrorVisible(true);

      return;
    }

    await submitAction(values);
  };

  useBeforeUnload({
    enabled: Object.values(values).some((value) => value !== ""),
  });

  return (
    <div className="py-14 lg:pb-20">
      <Container>
        <Heading1>お問い合わせ</Heading1>

        <p className="mt-8 text-gray-foreground-weak">
          お気軽にお問い合わせください。
          <br />
          <span aria-hidden="true" className="text-danger-500">
            * は必須項目です。
          </span>
        </p>

        <div
          className={clsx(
            "mt-10",
            "lg:rounded-xl lg:border lg:border-solid lg:border-gray-light-200 lg:bg-white lg:px-10 lg:pb-11 lg:pt-8 lg:shadow-wide",
          )}
        >
          <form
            onSubmit={handleSubmit}
            name={CONTACT_FORM_NAME}
            data-netlify="true"
            netlify-honeypot="bot-field"
            noValidate
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className="space-y-5">
              <div className="space-y-5 md:flex md:space-x-4 md:space-y-0">
                <FieldProvider
                  whenError={showError("name", errors, touched)}
                  fieldId={createFieldId(id, "name")}
                >
                  <div className="md:w-1/3">
                    <FieldLabel
                      as={Label}
                      id={createLabelId(id, "name")}
                      required
                    >
                      {keyLabelMap.name}
                    </FieldLabel>
                    <div className="mt-2">
                      <Field
                        as={Input}
                        type="text"
                        name="name"
                        placeholder="田中 太郎"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={showError("name", errors, touched)}
                      />
                    </div>
                    <FieldError as={FormErrorMessage} className="mt-2">
                      {errors.name}
                    </FieldError>
                  </div>
                </FieldProvider>

                <FieldProvider
                  whenError={showError("email", errors, touched)}
                  fieldId={createFieldId(id, "email")}
                >
                  <div className="md:w-2/3">
                    <FieldLabel
                      as={Label}
                      id={createLabelId(id, "email")}
                      required
                    >
                      {keyLabelMap.email}
                    </FieldLabel>
                    <div className="mt-2">
                      <Field
                        as={Input}
                        type="email"
                        name="email"
                        placeholder="email@example.com"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={showError("email", errors, touched)}
                      />
                    </div>
                    <FieldError as={FormErrorMessage} className="mt-2">
                      {errors.email}
                    </FieldError>
                  </div>
                </FieldProvider>
              </div>

              <FieldProvider
                whenError={showError("companyName", errors, touched)}
                fieldId={createFieldId(id, "companyName")}
              >
                <div>
                  <FieldLabel as={Label} id={createLabelId(id, "companyName")}>
                    {keyLabelMap.companyName}
                  </FieldLabel>
                  <div className="mt-2">
                    <Field
                      as={Input}
                      type="text"
                      name="companyName"
                      placeholder="株式会社ABC / 自営業"
                      value={values.companyName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={showError("companyName", errors, touched)}
                    />
                  </div>
                  <FieldError as={FormErrorMessage} className="mt-2">
                    {errors.companyName}
                  </FieldError>
                </div>
              </FieldProvider>
              <FieldProvider
                whenError={showError("message", errors, touched)}
                fieldId={createFieldId(id, "message")}
              >
                <div>
                  <FieldLabel
                    as={Label}
                    id={createLabelId(id, "message")}
                    required
                  >
                    {keyLabelMap.message}
                  </FieldLabel>
                  <div className="mt-2">
                    <Field
                      as={Textarea}
                      name="message"
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={6}
                      invalid={showError("message", errors, touched)}
                    />
                  </div>
                  <div className="mt-2">
                    <FieldDescription as={FormHelperText}>
                      10文字以上
                    </FieldDescription>
                    <FieldError as={FormErrorMessage}>
                      {errors.message}
                    </FieldError>
                  </div>
                </div>
              </FieldProvider>
            </div>

            <div className="mt-10 lg:mt-14">
              {Object.keys(errors).length > 0 && allErrorVisible && (
                <div className="mb-5 border-t-4 border-solid border-t-danger-600 bg-danger-50 px-5 py-4 text-danger-600">
                  <div className="font-bold">
                    {Object.values(errors).length}件の項目に問題があります。
                  </div>
                  <ul className="mt-3 space-y-1.5 sm:space-y-0">
                    {entriesOf(errors).map(([key, error]) => (
                      <li key={key} className="text-sm sm:flex sm:space-x-1">
                        <div className="font-bold">
                          {keyLabelMap[key]}
                          <span className="hidden sm:inline">: </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleErrorListItemClick(key)}
                          className="text-left underline underline-offset-2"
                        >
                          {error}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button disabled={submitState.loading} className="w-full">
                {submitState.loading ? "送信中..." : "送信する"}
              </Button>
            </div>
          </form>
          {submitState.isSuccess && (
            <FeedbackNotification
              className="mt-10"
              variant="primary"
              onClose={resetSubmitAction}
            >
              {feedbackText.done}
            </FeedbackNotification>
          )}
          {submitState.isError && (
            <FeedbackNotification
              className="mt-10"
              variant="danger"
              onClose={resetSubmitAction}
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
