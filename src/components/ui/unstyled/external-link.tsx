import React from "react";

export type ExternalLinkProps = Omit<
  React.ComponentPropsWithRef<"a">,
  "target" | "rel"
>;

const ExternalLink = React.forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  (props, ref) => {
    return <a target="_blank" rel="noopener noreferrer" {...props} ref={ref} />;
  },
);

ExternalLink.displayName = "ExternalLink";

export { ExternalLink };
