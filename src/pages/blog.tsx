import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Layout from '@/components/layout';
import Container from '@/components/ui/container';
import Heading1 from '@/components/ui/heading1';
import client from '@/lib/microcms/client';
import { BlogContent, ClientResponse } from '@/lib/microcms/types';

export const getStaticProps: GetStaticProps<{
  data: ClientResponse<BlogContent>;
}> = async () => {
  const data: ClientResponse<BlogContent> = await client.get({
    endpoint: 'blog',
  });
  return { props: { data } };
};

// ----------------------------------------

export default function Blog({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // 開発中なので表示しない
  // if (Math.random() > -1) {
  //   return null;
  // }

  return (
    <Layout title="ブログ">
      <div className="py-8">
        <Container>
          <section className="space-y-6">
            <Heading1>ブログ</Heading1>
            <ul>
              {data.contents.map((content) => (
                <li key={content.id}>{content.title}</li>
              ))}
            </ul>
          </section>
        </Container>
      </div>
    </Layout>
  );
}
