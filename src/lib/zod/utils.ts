import { type SafeParseReturnType } from "zod";
import { mapObject } from "@/utils/object/map-object";
import { omit } from "@/utils/object/omit";

export function getKeyErrorMessagesMap<Input>(
  safeParseReturn: SafeParseReturnType<Input, Input>,
): { [key in keyof Input]?: string[] } {
  const formattedError = safeParseReturn.error?.format();
  if (!formattedError) return {};

  const errors = mapObject(omit(formattedError, ["_errors"]), (value) => {
    if (typeof value === "object" && !!value && "_errors" in value) {
      return value._errors as string[];
    } else {
      return undefined;
    }
  });

  return errors as { [key in keyof Input]?: string[] };
}

export function getKeyErrorMessageMap<Input>(
  safeParseReturn: SafeParseReturnType<Input, Input>,
): { [key in keyof Input]?: string } {
  const keyErrorMessagesMap = getKeyErrorMessagesMap(safeParseReturn);
  return mapObject(keyErrorMessagesMap, (errorMessages) => errorMessages?.[0]);
}
