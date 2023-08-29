'use client';

import { Button } from '@/components/ui/button';
import ErrorDisplay from '@/components/ui/error-display';
import useTitle from '@/hooks/use-title';
import { NextErrorProps } from '@/lib/next/types';
import { SITE_TITLE } from '../../constants';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Error({ error, reset }: NextErrorProps) {
  useTitle(`${SITE_TITLE} | エラーが発生しました`);

  return (
    <ErrorDisplay
      heading="エラーが発生しました"
      detail="予期せぬエラーが発生しました。"
      action={<Button onClick={reset}>問題の箇所をもう一度読み込む</Button>}
    />
  );
}
