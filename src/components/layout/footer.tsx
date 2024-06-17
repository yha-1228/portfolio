import React from 'react';
import { routes } from '@/routes';
import Container from '../ui/styled/container';
import { ExternalTextLink, TextLink } from '../ui/styled/text-link';

type LinkInterface = {
  href: string;
  label: string;
};

const myExternalLinks: LinkInterface[] = [
  {
    href: 'https://github.com/yha-1228',
    label: 'GitHub',
  },
  {
    href: 'https://zenn.dev/yhase_rqp',
    label: 'Zenn',
  },
  {
    href: 'https://codepen.io/yh10050846',
    label: 'Codepen',
  },
];

const COPYRIGHT_TEXT = `Yuta Hasegawa © ${new Date().getFullYear()}`;

export default function Footer() {
  return (
    <footer className="border-t border-solid border-t-transparent bg-gray-light-100 pb-14 pt-10">
      <Container>
        <div className="flex justify-between">
          <ul className="w-1/2 space-y-3 md:flex md:w-auto md:space-x-4 md:space-y-0">
            {myExternalLinks.map((item) => (
              <li key={item.href}>
                <ExternalTextLink className="font-bold" href={item.href}>
                  {item.label}
                </ExternalTextLink>
              </li>
            ))}
          </ul>
          <ul className="w-1/2 space-y-3 md:flex md:w-auto md:space-x-4 md:space-y-0">
            {Object.values(routes).map((route) => (
              <li key={route.href}>
                <TextLink className="font-bold" href={route.href}>
                  {route.label}
                </TextLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-5 border-t border-solid border-gray-foreground/20">
          <p className="pt-5 text-gray-foreground/70">{COPYRIGHT_TEXT}</p>
        </div>
      </Container>
    </footer>
  );
}
