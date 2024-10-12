"use client";

import { ErrorDisplayRoot } from "@/components/ui/styled/error-display";
import { type NextErrorProps } from "@/lib/next/types";

export default function Error({ error, reset }: NextErrorProps) {
  return <ErrorDisplayRoot error={error} reset={reset} />;
}
