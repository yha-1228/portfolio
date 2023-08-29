import Link from 'next/link';

export type GenerateMetadataProps<T extends string> = {
  params: { [key in T]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

/**
 * Type of `<Link />` props
 */
export type LinkComponentProps = React.ComponentPropsWithRef<typeof Link>;

export type NextLayoutProps = {
  children: React.ReactNode;
};

/**
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/error#props
 */
export type NextErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export type NextPageProps<T extends string> = {
  params: { [key in T]: string };
};
