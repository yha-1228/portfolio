import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import Layout from '@/components/layout';
import Container from '@/components/ui/container';
import Heading1 from '@/components/ui/heading1';
import { getBlogContents } from '@/lib/microcms/client';
import { BlogContent, ClientResponse } from '@/lib/microcms/types';

export const getStaticProps: GetStaticProps<{
  data: ClientResponse<BlogContent>;
}> = async () => {
  const data = await getBlogContents();
  return { props: { data } };
};

// ----------------------------------------

export default function Blog({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title="ブログ">
      <div className="py-8">
        <Container>
          <section className="space-y-6">
            <Heading1>ブログ</Heading1>
            <ul>
              {data.contents.map((content) => (
                <li key={content.id}>
                  <Link
                    href={`/blog/${content.id}`}
                    className="font-bold hover:underline"
                  >
                    {content.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </Container>
      </div>
    </Layout>
  );
}
