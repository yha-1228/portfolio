import { twMerge } from 'tailwind-merge';
import Container from './container';

type ErrorDisplayProps = {
  className?: string;
  heading: React.ReactNode;
  detail: React.ReactNode;
  action?: React.ReactNode;
};

export default function ErrorDisplay({
  className,
  heading,
  detail,
  action,
}: ErrorDisplayProps) {
  return (
    <div className={twMerge('pb-14 pt-8', className)}>
      <Container>
        <div className="space-y-10 text-center">
          <section className="space-y-3">
            <h1 className="text-2xl font-bold">{heading}</h1>
            <div className="leading-[1.5]">{detail}</div>
          </section>
          {action && <div>{action}</div>}
        </div>
      </Container>
    </div>
  );
}
