import { type ContactFormValues } from "./validation";

export type ContactFormTouched = { [key in keyof ContactFormValues]: boolean };

export type FieldType = HTMLInputElement | HTMLTextAreaElement;

export type SubmitState =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success" }
  | { state: "error"; error: unknown };
