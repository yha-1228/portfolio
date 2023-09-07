import '@/styles/globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Layout from '@/components/layout';
import SkipToMainContent from '@/components/skip-to-main-content';
import { SITE_TITLE } from '@/constants';
import { NextLayoutProps } from '@/lib/next/types';
import clsx from '@/utils/css/clsx';

export const metadata: Metadata = {
  title: { template: `${SITE_TITLE} | %s`, default: SITE_TITLE },
  formatDetection: { email: false, address: false, telephone: false },
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({ children }: NextLayoutProps) {
  return (
    <html lang="ja" dir="ltr">
      <body
        className={clsx(
          inter.variable,
          'overflow-y-scroll font-base text-gray-foreground',
        )}
      >
        <SkipToMainContent />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
