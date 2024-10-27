import { type ComponentPropsWithRef, forwardRef } from "react";

type ExternalLinkProps = Omit<ComponentPropsWithRef<"a">, "target" | "rel">;

const ExternalLink = forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  (props, ref) => {
    return <a target="_blank" rel="noopener noreferrer" {...props} ref={ref} />;
  },
);

ExternalLink.displayName = "ExternalLink";

export { ExternalLink, type ExternalLinkProps };
