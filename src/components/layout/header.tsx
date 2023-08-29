import React from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import { routes } from '@/routes';
import tailwindConfig from '../../../tailwind.config';
import Container from '../ui/container';
import NavLink from './nav-link';

const { theme } = resolveConfig(tailwindConfig);

export default function Header() {
  return (
    <header className="flex h-14 items-center border-b border-solid border-b-gray-light-200">
      <Container>
        <nav className="flex items-center justify-between">
          <NavLink
            parentHeight={theme?.width?.[14]}
            href="/"
            className="text-xl"
          >
            Yuta Hasegawa
          </NavLink>

          <ul className="flex space-x-5">
            {Object.values(routes)
              .filter((route) => route.href !== '/')
              .map((route) => (
                <li key={`${route.href}`}>
                  <NavLink parentHeight={theme?.width?.[14]} href={route.href}>
                    {route.label}
                  </NavLink>
                </li>
              ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
