import '@/styles/globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { NextLayoutProps } from '@/lib/next/types';
import clsx from '@/utils/css/clsx';
import { SITE_TITLE } from '../../constants';

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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
