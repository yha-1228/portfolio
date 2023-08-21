import { DefaultSeo } from 'next-seo';
import { Toaster } from 'react-hot-toast';
import defaultSeoProps from '../../next-seo.config';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...defaultSeoProps} />
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}
