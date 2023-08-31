'use client';

import { ErrorBoard } from '@/components/ui/error-display';
import { NextErrorProps } from '@/lib/next/types';

export default function Error({ error, reset }: NextErrorProps) {
  return <ErrorBoard error={error} reset={reset} />;
}
