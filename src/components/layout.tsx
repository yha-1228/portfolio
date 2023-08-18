import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { SiCodepen, SiGithub, SiZenn } from 'react-icons/si';
import Logo from '@/assets/logo.svg';
import clsx from '@/utils/clsx';
import Container from './ui/container';

const linkItems = [
  {
    pathname: '/',
    label: '職務経歴',
  },
];

function Header() {
  /**
   * TODO: get isCurrentPage?
   */
  const isActive = false;

  return (
    <header className="sticky top-0 border-b bg-slate-50 py-5">
      <Container>
        <nav className="flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>

          <ul className="flex space-x-4">
            {linkItems.map((linkItem) => (
              <li key={linkItem.label}>
                <Link
                  href={linkItem.pathname}
                  className={clsx(
                    'relative inline-block py-3 font-bold hover:text-blue-500',
                    isActive ? 'bg-blue-50 text-blue-500' : 'text-gray-700',
                    isActive && 'before:absolute before:bottom-0 before:left-0',
                    isActive &&
                      "before:h-0.5 before:w-full before:bg-blue-500 before:content-['']"
                  )}
                >
                  {linkItem.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

// ----------------------------------------

function Footer() {
  return (
    <footer>
      <div className="flex justify-center space-x-3">
        <a
          href="https://github.com/yha-1228"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <SiGithub />
        </a>
        <a
          href="https://zenn.dev/yhase_rqp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Zenn"
        >
          <SiZenn />
        </a>
        <a
          href="https://codepen.io/yh10050846"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Codepen"
        >
          <SiCodepen />
        </a>
      </div>
    </footer>
  );
}

// ----------------------------------------

type LayoutProps = React.PropsWithChildren<{
  title?: string;
}>;

export default function Layout(props: LayoutProps) {
  const { children, title } = props;

  return (
    <>
      <NextSeo title={title} />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
