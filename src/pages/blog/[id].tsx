import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Layout from '@/components/layout';
import Container from '@/components/ui/container';
import Heading1 from '@/components/ui/heading1';
import client from '@/lib/microcms/client';
import { BlogContent, ClientResponse } from '@/lib/microcms/types';
import clsx from '@/utils/clsx';

export const getStaticPaths: GetStaticPaths = async () => {
  const data: ClientResponse<BlogContent> = await client.get({
    endpoint: 'blog',
  });

  const paths = data.contents.map((content) => ({
    params: { id: content.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  blog: BlogContent;
}> = async (context) => {
  const id = context.params?.id as string;
  const content: BlogContent = await client.get({
    endpoint: 'blog',
    contentId: id,
  });

  return { props: { blog: content } };
};

// ----------------------------------------

export default function BlogId({
  blog,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title={blog.title}>
      <div className="py-8">
        <Container>
          <section className="space-y-6">
            <Heading1>{blog.title}</Heading1>
            <div
              // 開発中なので表示しない
              style={{ display: 'none' }}
            >
              <p>{blog.publishedAt}</p>
              <div
                className={clsx(
                  '[&>h1]:text-3xl [&>h1]:mt-10 [&>h1]:mb-5',
                  '[&>h2]:text-2xl [&>h2]:mt-10 [&>h2]:mb-4',
                  '[&>p]:my-4',
                  '[&>ul]:pl-9',
                  '[&>ul>li]:list-disc',
                )}
                dangerouslySetInnerHTML={{
                  __html: `${blog.body}`,
                }}
              />
            </div>
          </section>
        </Container>
      </div>
    </Layout>
  );
}
