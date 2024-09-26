import { MAIN_CONTENT_ID } from '@/constants';
import Footer from './footer';
import Header from './header';
import SkipToMainContent from './skip-to-main-content';

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-h-dvh flex-col overflow-y-scroll">
      <SkipToMainContent />
      <Header />
      <main id={MAIN_CONTENT_ID}>{children}</main>
      <Footer />
    </div>
  );
}
