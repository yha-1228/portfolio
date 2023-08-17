import { DefaultSeoProps } from 'next-seo';
import { SITE_TITLE } from './constants';

/**
 * `<DefaultSeo />` props
 *
 * @see https://github.com/garmeeh/next-seo#default-seo-configuration
 */
const defaultSeoProps: DefaultSeoProps = {
  titleTemplate: `${SITE_TITLE} | %s`,
  defaultTitle: SITE_TITLE,
};

export default defaultSeoProps;
