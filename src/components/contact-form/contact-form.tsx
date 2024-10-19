"use client";

import { useId, useState } from "react";
import { sendNetlifyForm } from "@/api/clients/utils";
import { isFetchNetworkError } from "@/api/misc";
import { useBeforeUnload } from "@/hooks/use-beforeunload";
import { getKeyErrorMessageMap } from "@/lib/zod/utils";
import { clsx } from "@/utils/css/clsx";
import { remToPx } from "@/utils/css/unit";
import { mapObject } from "@/utils/object/map-object";
import { entriesOf } from "@/utils/object/typed-native";
import { headerHeight } from "../layouts/header";
import { Button } from "../ui/styled/button";
import { Container } from "../ui/styled/container";
import { FieldLabel } from "../ui/styled/field-label";
import { FormDescription } from "../ui/styled/form-description";
import { FormErrorMessage } from "../ui/styled/form-error-message";
import { Heading1 } from "../ui/styled/heading1";
import { Input, Textarea } from "../ui/styled/input";
import { Paragraph } from "../ui/styled/paragraph";
import { Field } from "../ui/unstyled/field";
import { FeedbackNotification } from "./feedback-notification";
import {
  type SubmitState,
  type FieldType,
  type ContactFormTouched,
} from "./types";
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

const initialSubmitState: SubmitState = { state: "idle" };

// constants, helpers
// ----------------------------------------

const keyLabelMap: { [key in keyof ContactFormValues]: string } = {
  name: "お名前",
  email: "メールアドレス",
  companyName: "会社名",
  message: "お問い合わせ内容",
};

const FORM_NAME = "contact";

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
  const [submitState, setSubmitState] = useState(initialSubmitState);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      setTouched(mapObject(initialTouched, () => true));
      setAllErrorVisible(true);

      return;
    }

    setSubmitState({ state: "loading" });
    try {
      await sendNetlifyForm({
        htmlFilepath: "/__forms.html",
        formName: FORM_NAME,
        data: values,
      });
      setSubmitState({ state: "success" });
      setValues(initialValues);
      setTouched(initialTouched);
      setAllErrorVisible(initialAllErrorVisible);
    } catch (error) {
      setSubmitState({ state: "error", error });
    }
  };

  useBeforeUnload({
    enabled: Object.values(values).some((value) => value !== ""),
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
            "mt-10",
            "lg:rounded-xl lg:border lg:border-solid lg:border-gray-light-200 lg:bg-white lg:px-10 lg:pb-11 lg:pt-8 lg:shadow-wide",
          )}
        >
          <form
            onSubmit={handleSubmit}
            name={FORM_NAME}
            data-netlify="true"
            netlify-honeypot="bot-field"
            noValidate
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className="space-y-5">
              <div className="space-y-5 md:flex md:space-x-4 md:space-y-0">
                <Field
                  whenError={showError("name", errors, touched)}
                  fieldId={createFieldId(id, "name")}
                  render={(field) => (
                    <div className="md:w-1/3">
                      <FieldLabel
                        {...field.labelProps}
                        id={createLabelId(id, "name")}
                        required
                      >
                        {keyLabelMap.name}
                      </FieldLabel>
                      <div className="mt-2">
                        <Input
                          {...field.fieldProps}
                          type="text"
                          name="name"
                          placeholder="田中 太郎"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          invalid={field.whenError}
                        />
                      </div>
                      <FormErrorMessage {...field.errorProps} className="mt-2">
                        {errors.name}
                      </FormErrorMessage>
                    </div>
                  )}
                />
                <Field
                  whenError={showError("email", errors, touched)}
                  fieldId={createFieldId(id, "email")}
                  render={(field) => (
                    <div className="md:w-2/3">
                      <FieldLabel
                        {...field.labelProps}
                        id={createLabelId(id, "email")}
                        required
                      >
                        {keyLabelMap.email}
                      </FieldLabel>
                      <div className="mt-2">
                        <Input
                          {...field.fieldProps}
                          type="email"
                          name="email"
                          placeholder="email@example.com"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          invalid={field.whenError}
                        />
                      </div>
                      {field.whenError && (
                        <FormErrorMessage
                          {...field.errorProps}
                          className="mt-2"
                        >
                          {errors.email}
                        </FormErrorMessage>
                      )}
                    </div>
                  )}
                />
              </div>
              <Field
                whenError={showError("companyName", errors, touched)}
                fieldId={createFieldId(id, "companyName")}
                render={(field) => (
                  <div>
                    <FieldLabel
                      {...field.labelProps}
                      id={createLabelId(id, "companyName")}
                    >
                      {keyLabelMap.companyName}
                    </FieldLabel>
                    <div className="mt-2">
                      <Input
                        {...field.fieldProps}
                        type="text"
                        name="companyName"
                        placeholder="株式会社ABC / 自営業"
                        value={values.companyName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={field.whenError}
                      />
                    </div>
                    {field.whenError && (
                      <FormErrorMessage {...field.errorProps} className="mt-2">
                        {errors.companyName}
                      </FormErrorMessage>
                    )}
                  </div>
                )}
              />
              <Field
                whenError={showError("message", errors, touched)}
                fieldId={createFieldId(id, "message")}
                render={(field) => (
                  <div>
                    <FieldLabel
                      {...field.labelProps}
                      id={createLabelId(id, "message")}
                      required
                    >
                      {keyLabelMap.message}
                    </FieldLabel>
                    <div className="mt-2">
                      <Textarea
                        {...field.fieldProps}
                        name="message"
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={6}
                        invalid={field.whenError}
                      />
                    </div>
                    <div className="mt-2">
                      <FormDescription {...field.descriptionProps}>
                        10文字以上
                      </FormDescription>
                      {field.whenError && (
                        <FormErrorMessage {...field.errorProps}>
                          {errors.message}
                        </FormErrorMessage>
                      )}
                    </div>
                  </div>
                )}
              />
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

              <Button
                disabled={submitState.state === "loading"}
                className="w-full"
              >
                {submitState.state === "loading" ? "送信中..." : "送信する"}
              </Button>
            </div>
          </form>
          {submitState.state === "success" && (
            <FeedbackNotification
              className="mt-10"
              variant="primary"
              onClose={() => setSubmitState({ state: "idle" })}
            >
              {feedbackText.done}
            </FeedbackNotification>
          )}
          {submitState.state === "error" && (
            <FeedbackNotification
              className="mt-10"
              variant="danger"
              onClose={() => setSubmitState({ state: "idle" })}
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
