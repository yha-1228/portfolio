import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';
import SkipToMainContent from '@/components/layouts/skip-to-main-content';
import { MAIN_CONTENT_ID, SITE_TITLE } from '@/constants';
import clsx from '@/utils/css/clsx';
import type { NextLayoutProps } from '@/lib/next/types';
import type { Metadata } from 'next';

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
      <body className={clsx(inter.variable, 'font-base text-gray-foreground')}>
        <div className="flex min-h-dvh flex-col">
          <SkipToMainContent />
          <Header />
          <main id={MAIN_CONTENT_ID}>{children}</main>
          <Footer className="mt-auto" />
        </div>
      </body>
    </html>
  );
}
