import type Link from 'next/link';

/**
 * Type of `generateMetadata` args
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export interface GenerateMetadataProps<T extends string> {
  params: { [key in T]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

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
export interface NextLayoutProps {
  children: React.ReactNode;
  params?: { [key: string]: string | string[] };
}

/**
 * Type of `error.tsx` props
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/error#props
 */
export interface NextErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Type of `page.tsx` props (with `params`)
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/page
 */
export interface NextPagePropsWithParams<T extends string> {
  params: { [key in T]: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}
