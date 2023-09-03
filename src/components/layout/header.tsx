'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BsList, BsX } from 'react-icons/bs';
import { routes } from '@/routes';
import clsx from '@/utils/css/clsx';
import Container from '../ui/styled/container';
import ActiveLink from '../ui/unstyled/active-link';

const routesWithoutHome = Object.values(routes).filter(
  (route) => route.href !== '/',
);

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="border-b border-solid border-b-gray-light-300">
        <Container>
          <nav className="relative flex h-[4rem] items-center justify-between sm:h-[4.5rem]">
            <Link
              href="/"
              className="text-2xl font-bold transition-colors duration-200 ease-out hover:text-gray-foreground-weak"
            >
              Yuta Hasegawa
            </Link>

            <button
              className={clsx(
                'flex h-9 w-9 items-center justify-center sm:hidden',
                'absolute -right-1.5 top-1/2 -translate-y-1/2',
              )}
              onClick={() => setOpen((prev) => !prev)}
              aria-label={open ? 'メニューを開く' : 'メニューを閉じる'}
            >
              <span aria-hidden="true">
                {open ? (
                  <BsX className="h-8 w-8" />
                ) : (
                  <BsList className="h-8 w-8" />
                )}
              </span>
            </button>
            <ul className="hidden sm:flex">
              {routesWithoutHome.map((route) => (
                <li key={route.href}>
                  <ActiveLink
                    href={route.href}
                    className={clsx(
                      'relative inline-flex items-center px-3 sm:h-[calc(4.5rem-1px)]',
                      'font-bold text-gray-foreground/50',
                      'transition-colors duration-200 ease-out',
                      "hover:text-primary-600 hover:before:absolute hover:before:bottom-0 hover:before:left-0 hover:before:h-0.5 hover:before:w-full hover:before:bg-transparent hover:before:content-['']",
                      'active:bg-gray-light-100',
                      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-300',

                      'data-[active]:font-bold data-[active]:text-primary-600',
                      "data-[active]:before:absolute data-[active]:before:bottom-0 data-[active]:before:left-0 data-[active]:before:h-0.5 data-[active]:before:w-full data-[active]:before:bg-primary-600 data-[active]:before:content-['']",
                      'data-[active]:hover:text-primary-600 data-[active]:hover:before:bg-primary-600',
                    )}
                  >
                    {route.label}
                  </ActiveLink>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>

      <Container
        className={clsx(
          !open && 'hidden',
          'border-b border-solid border-b-gray-light-300 bg-white py-5 sm:hidden',
        )}
      >
        <ul className="flex space-x-4">
          {routesWithoutHome.map((route) => (
            <li key={route.href}>
              <ActiveLink
                href={route.href}
                className={clsx(
                  'flex h-11 items-center font-bold text-gray-foreground-weak',
                  'data-[active]:rounded-full data-[active]:bg-primary-100 data-[active]:px-5 data-[active]:text-primary-600',
                )}
                onClick={() => setOpen(false)}
              >
                {route.label}
              </ActiveLink>
            </li>
          ))}
        </ul>
      </Container>
    </header>
  );
}
