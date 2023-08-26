import React from 'react';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';
import Container from '../ui/container';
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
        <div className="border-t border-solid border-t-gray-light-weak pb-14 pt-10">
          <div className="flex justify-between">
            <ul className="w-1/2 md:flex md:w-auto md:space-x-4">
              {myExternalLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 font-bold hover:underline"
                  >
                    <span>{item.label}</span> <FiExternalLink />
                  </a>
                </li>
              ))}
            </ul>
            <ul className="w-1/2 md:flex md:w-auto md:space-x-4">
              <li>
                <Link href="/" className="font-bold hover:underline">
                  トップ
                </Link>
              </li>
              {pageLinks.map((pageLink) => (
                <li key={pageLink.href}>
                  <Link
                    href={pageLink.href}
                    className="inline-block font-bold hover:underline"
                  >
                    {pageLink.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-5 text-gray-500">{COPYRIGHT_TEXT}</p>
        </div>
      </Container>
    </footer>
  );
}
