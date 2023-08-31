import React from 'react';
import { OmitKey } from '@/types/utils';

export type ExternalLinkProps = OmitKey<
  React.ComponentPropsWithRef<'a'>,
  'target' | 'rel'
>;

const ExternalLink = React.forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  (props, ref) => {
    return <a target="_blank" rel="noopener noreferrer" {...props} ref={ref} />;
  },
);

ExternalLink.displayName = 'ExternalLink';

export default ExternalLink;
