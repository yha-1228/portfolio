import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { SiCodepen, SiGithub, SiZenn } from 'react-icons/si';
import { twMerge } from 'tailwind-merge';
import Container from './ui/container';

type NavLinkProps = React.ComponentPropsWithRef<typeof Link>;

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  (props, ref) => {
    const { href, className, ...restProps } = props;
    const router = useRouter();
    const current = router.pathname === href;

    return (
      <Link
        className={twMerge(
          'relative inline-block py-2 font-bold',
          'hover:text-blue-500',
          current && 'text-blue-500',
          current && 'before:absolute before:bottom-0 before:left-0',
          current && "before:h-[1.5px] before:w-full before:content-['']",
          current && 'before:bg-blue-500',
          className
        )}
        href={href}
        {...restProps}
        ref={ref}
      />
    );
  }
);

NavLink.displayName = 'NavLink';

// ----------------------------------------

const linkItems: NavLinkProps[] = [
  {
    href: '/experience',
    children: '職務経歴',
  },
  {
    href: '/blog',
    children: 'ブログ',
  },
];

function Header() {
  return (
    <header className="py-8">
      <Container>
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold hover:underline active:outline active:outline-orange-400"
          >
            Yuta Hasegawa
          </Link>

          <ul className="flex space-x-5">
            {linkItems.map((linkItem) => (
              <li key={`${linkItem.href}`}>
                <NavLink {...linkItem} />
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

// ----------------------------------------

const footerItems = [
  {
    href: 'https://github.com/yha-1228',
    label: 'GitHub',
    icon: <SiGithub />,
  },
  {
    href: 'https://zenn.dev/yhase_rqp',
    label: 'Zenn',
    icon: <SiZenn />,
  },
  {
    href: 'https://codepen.io/yh10050846',
    label: 'Codepen',
    icon: <SiCodepen />,
  },
];

function Footer() {
  return (
    <footer>
      <ul className="flex justify-center space-x-3">
        {footerItems.map((item) => (
          <li key={item.href}>
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              {item.icon}
            </a>
          </li>
        ))}
      </ul>
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
