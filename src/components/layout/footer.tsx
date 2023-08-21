import React from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';
import Container from '../ui/container';

const footerItems = [
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

export default function Footer() {
  return (
    <footer>
      <Container>
        <div
          className={twMerge(
            'space-y-2 border-t border-solid border-t-gray-light-weak py-8',
            'md:flex md:items-center md:justify-between md:space-y-0',
          )}
        >
          <ul className="flex justify-center space-x-4">
            {footerItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-lg font-bold hover:underline lg:text-xl"
                >
                  <span>{item.label}</span>
                  <FiExternalLink />
                </a>
              </li>
            ))}
          </ul>
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Yuta Hasegawa &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
