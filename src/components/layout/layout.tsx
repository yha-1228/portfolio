import React from 'react';
import { NextSeo } from 'next-seo';
import Footer from './footer';
import Header from './header';

type LayoutProps = React.PropsWithChildren<{
  title?: string;
}>;

export default function Layout(props: LayoutProps) {
  const { children, title } = props;

  return (
    <>
      <NextSeo title={title} />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
