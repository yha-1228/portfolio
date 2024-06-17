'use client';

import React from 'react';
import { Button, ButtonLink } from '@/components/ui/styled/button';
import { SITE_TITLE } from '@/constants';
import useTitle from '@/hooks/use-title';
import clsx from '@/utils/css/clsx';
import Container from './container';
import type { NextErrorProps } from '@/lib/next/types';

type ErrorDisplayProps = {
  className?: string;
  heading: React.ReactNode;
  detail: React.ReactNode;
  action?: React.ReactNode;
};

function ErrorDisplay(props: ErrorDisplayProps) {
  const { className, heading, detail, action } = props;

  return (
    <div className={clsx('pb-14 pt-8', className)}>
      <Container>
        <div className="space-y-10 text-center">
          <section className="space-y-3">
            <h1 className="text-2xl font-bold">{heading}</h1>
            <div className="leading-normal">{detail}</div>
          </section>
          {action && <div>{action}</div>}
        </div>
      </Container>
    </div>
  );
}

export function NotFoundBoard() {
  useTitle(`${SITE_TITLE} | ページが見つかりません`);

  return (
    <ErrorDisplay
      heading="ページが見つかりません"
      detail="アクセスしたページは存在しないか、削除された可能性があります。"
      action={<ButtonLink href="/">ホームに戻る</ButtonLink>}
    />
  );
}

export function ErrorBoard(_: NextErrorProps) {
  useTitle(`${SITE_TITLE} | エラーが発生しました`);

  return (
    <ErrorDisplay
      heading="エラーが発生しました"
      detail="予期せぬエラーが発生しました。"
      action={
        <Button onClick={() => window.location.reload()}>再読み込み</Button>
      }
    />
  );
}
