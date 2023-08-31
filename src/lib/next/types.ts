import Link from 'next/link';

/**
 * Type of `generateMetadata` args
 * 
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export type GenerateMetadataProps<T extends string> = {
  params: { [key in T]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

/**
 * Type of `<Link />` props
 * (alias)
 */
export type LinkComponentProps = React.ComponentPropsWithRef<typeof Link>;

/**
 * Type of `layout.tsx` props
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/layout
 */
export type NextLayoutProps = {
  children: React.ReactNode;
  searchParams?: { [key: string]: string | string[] };
};


/**
 * Type of `error.tsx` props
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/error#props
 */
export type NextErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Type of `page.tsx` props (with `params`)
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/page
 */
export type NextPagePropsWithParams<T extends string> = {
  params: { [key in T]: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};
