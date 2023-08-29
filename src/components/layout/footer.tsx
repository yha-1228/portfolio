import React from 'react';
import Container from '../ui/container';
import { ExternalTextLink, TextLink } from '../ui/text-link';
import { pageLinks } from './page-links';

const myExternalLinks = [
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

const COPYRIGHT_TEXT = <>Yuta Hasegawa &copy; {new Date().getFullYear()}</>;

export default function Footer() {
  return (
    <footer>
      <Container>
        <div className="border-t border-solid border-t-gray-light-200 pb-14 pt-10">
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
              <li>
                <TextLink className="font-bold" href="/">
                  トップ
                </TextLink>
              </li>
              {pageLinks.map((pageLink) => (
                <li key={pageLink.href}>
                  <TextLink className="font-bold" href={pageLink.href}>
                    {pageLink.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-10 text-gray-foreground-weak md:mt-5">
            {COPYRIGHT_TEXT}
          </p>
        </div>
      </Container>
    </footer>
  );
}
