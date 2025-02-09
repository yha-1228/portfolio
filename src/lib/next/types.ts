import type Link from "next/link";

/**
 * Type of `<Link />` props
 * (alias)
 */
export type LinkComponentProps = React.ComponentPropsWithRef<typeof Link>;

/**
 * Type of `error.tsx` props
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/error#props
 */
export interface NextErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
