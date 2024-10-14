"use client";

import { ErrorDisplayRoot } from "@/components/ui/styled/error-display";
import { SITE_TITLE } from "@/constants";
import { useTitle } from "@/hooks/use-title";
import { type NextErrorProps } from "@/lib/next/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Error({ error, reset }: NextErrorProps) {
  useTitle(`${SITE_TITLE} | エラーが発生しました`);

  return (
    <html lang="ja">
      <body>
        <ErrorDisplayRoot error={error} reset={reset} />
      </body>
    </html>
  );
}
