import React from 'react';
import { twMerge } from 'tailwind-merge';
import Container from './container';

type ErrorDisplayProps = {
  /**
   * @default "div"
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: React.ElementType<any>;
  className?: string;
  heading: React.ReactNode;
  detail: React.ReactNode;
  action?: React.ReactNode;
};

export default function ErrorDisplay({
  as: Component = 'div',
  className,
  heading,
  detail,
  action,
}: ErrorDisplayProps) {
  return (
    <Component className={twMerge('pb-14 pt-8', className)}>
      <Container>
        <div className="space-y-10 text-center">
          <section className="space-y-3">
            <h1 className="text-2xl font-bold">{heading}</h1>
            <div className="leading-[1.5]">{detail}</div>
          </section>
          {action && <div>{action}</div>}
        </div>
      </Container>
    </Component>
  );
}
