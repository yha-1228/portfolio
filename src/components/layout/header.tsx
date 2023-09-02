import React from 'react';
import Link from 'next/link';
import { routes } from '@/routes';
import clsx from '@/utils/css/clsx';
import Container from '../ui/styled/container';
import ActiveLink from '../ui/unstyled/active-link';

export default function Header() {
  return (
    <header className="flex h-[64px] items-center border-b border-solid border-b-gray-light-300 sm:h-[72px]">
      <Container>
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold transition-colors duration-200 ease-out hover:text-gray-foreground-weak max-[350px]:text-base sm:text-2xl"
          >
            Yuta Hasegawa
          </Link>

          <ul className="flex">
            {Object.values(routes)
              .filter((route) => route.href !== '/')
              .map((route) => (
                <li key={route.href}>
                  <ActiveLink
                    href={route.href}
                    className={clsx(
                      'relative inline-flex h-[calc(64px-1px)] items-center px-2 max-[350px]:px-1.5 max-[350px]:text-sm sm:h-[calc(72px-1px)] sm:px-3',
                      'font-bold text-gray-foreground/50',
                      'transition-colors duration-200 ease-out',
                      "hover:text-primary-600 hover:before:absolute hover:before:bottom-0 hover:before:left-0 hover:before:h-0.5 hover:before:w-full hover:before:bg-transparent hover:before:content-['']",
                      'active:bg-gray-light-100',
                      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-300',

                      'data-[current]:font-bold data-[current]:text-primary-600',
                      "data-[current]:before:absolute data-[current]:before:bottom-0 data-[current]:before:left-0 data-[current]:before:h-0.5 data-[current]:before:w-full data-[current]:before:bg-primary-600 data-[current]:before:content-['']",
                      'data-[current]:hover:text-primary-600 data-[current]:hover:before:bg-primary-600',
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
