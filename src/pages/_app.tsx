import '@/styles/globals.css';

import { DefaultSeo } from 'next-seo';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from '@/components/error-boundary';
import ErrorDisplay from '@/components/error-display';
import { Button } from '@/components/ui/button';
import defaultSeoProps from '../../next-seo.config';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...defaultSeoProps} />
      <ErrorBoundary
        fallback={
          <ErrorDisplay
            className="border-t-4 border-solid border-danger-500"
            heading="エラー"
            detail="予期せぬエラーが発生しました。"
            action={
              <Button onClick={() => window.location.reload()}>
                再度読み込む
              </Button>
            }
          />
        }
      >
        <Component {...pageProps} />
      </ErrorBoundary>
      <Toaster />
    </>
  );
}
