import React from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { routes } from '@/routes';
import Container from '../ui/container';
import ActiveLink from '../ui/unstyled/active-link';

export default function Header() {
  return (
    <header className="flex h-16 items-center border-b border-solid border-b-gray-light-200">
      <Container>
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold transition-colors duration-200 ease-out hover:text-gray-foreground-weak"
          >
            Yuta Hasegawa
          </Link>

          <ul className="flex space-x-5 md:space-x-7">
            {Object.values(routes)
              .filter((route) => route.href !== '/')
              .map((route) => (
                <li key={route.href}>
                  <ActiveLink
                    href={route.href}
                    className={twMerge(
                      'relative inline-flex h-16 items-center py-1',
                      'font-bold text-gray-foreground/70',
                      'transition-colors duration-200 ease-out',
                      'hover:text-gray-foreground',
                      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-300',
                    )}
                    activeClassName={twMerge(
                      'text-primary-600 hover:text-primary-600',
                      "before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:content-['']",
                      'before:bg-primary-600',
                    )}
                  >
                    {route.label}
                  </ActiveLink>
                </li>
              ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
