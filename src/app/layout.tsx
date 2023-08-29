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
    <html lang="ja">
      <body className={clsx(inter.variable, 'font-base text-gray-foreground')}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <>
//       <DefaultSeo {...defaultSeoProps} />
//       <ErrorBoundary
//         fallback={
//           <ErrorDisplay
//             className="border-t-4 border-solid border-danger-500"
//             heading="エラー"
//             detail="予期せぬエラーが発生しました。"
//             action={
//               <Button onClick={() => window.location.reload()}>
//                 再度読み込む
//               </Button>
//             }
//           />
//         }
//       >
//         <Component {...pageProps} />
//       </ErrorBoundary>
//       <Toaster />
//     </>
//   );
// }
