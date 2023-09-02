import React from 'react';
import clsx from '@/utils/css/clsx';

type ParagraphProps = React.ComponentPropsWithRef<'p'>;

/**
 * my-20pxのみ
 */
const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return <p className={clsx('my-5', className)} {...restProps} ref={ref} />;
  },
);

Paragraph.displayName = 'Paragraph';

export default Paragraph;
