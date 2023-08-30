import React from 'react';
import Link from 'next/link';
import { routes } from '@/routes';
import Container from '../ui/container';
import NavLink from './nav-link';

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
                  <NavLink href={route.href}>{route.label}</NavLink>
                </li>
              ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
