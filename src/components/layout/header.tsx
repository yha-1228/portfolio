import React from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../tailwind.config';
import Container from '../ui/container';
import NavLink from './nav-link';
import { pageLinks } from './page-links';

const { theme } = resolveConfig(tailwindConfig);

export default function Header() {
  // if (Math.random() > -1) {
  //   throw new Error('err!');
  // }

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
            {pageLinks
              .filter((pageLink) => pageLink.href !== '/')
              .map((pageLink) => (
                <li key={`${pageLink.href}`}>
                  <NavLink
                    parentHeight={theme?.width?.[14]}
                    href={pageLink.href}
                  >
                    {pageLink.label}
                  </NavLink>
                </li>
              ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
