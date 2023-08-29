import { Metadata } from 'next';
import { BsChevronLeft } from 'react-icons/bs';
import Container from '@/components/ui/container';
import Heading1 from '@/components/ui/heading1';
import { TextLink } from '@/components/ui/text-link';
import { getBlogContent, getBlogContents } from '@/lib/microcms/client';
import { GenerateMetadataProps, NextPageProps } from '@/lib/next/types';
import clsx from '@/utils/css/clsx';
import { formatISODate } from '@/utils/date/formatter';

export async function generateMetadata({
  params,
}: GenerateMetadataProps<'id'>): Promise<Metadata> {
  const { id } = params;
  const blogContent = await getBlogContent(id);

  return {
    title: blogContent.title,
  };
}

export async function generateStaticParams() {
  const blogContents = await getBlogContents();
  return blogContents.contents.map((content) => ({ id: content.id }));
}

export default async function Page({ params }: NextPageProps<'id'>) {
  const { id } = params;
  const content = await getBlogContent(id);

  return (
    <div className="py-8">
      <Container>
        <TextLink href="/blog" className="inline-flex items-center space-x-1">
          <BsChevronLeft />
          <span>戻る</span>
        </TextLink>

        <section className="mt-8 space-y-6">
          <Heading1>{content.title}</Heading1>
          <div>
            <p className="text-gray-foreground-weak">
              {formatISODate(content.publishedAt)}に投稿
            </p>
            <div
              className={clsx(
                'mt-4 border-t border-solid border-t-gray-light-300',
                '[&>h1]:text-3xl [&>h1]:mt-10 [&>h1]:mb-5',
                '[&>h2]:text-2xl [&>h2]:mt-10 [&>h2]:mb-4',
                '[&>p]:my-4',
                '[&>ul]:pl-9',
                '[&>ul>li]:list-disc',
              )}
              dangerouslySetInnerHTML={{
                __html: `${content.body}`,
              }}
            />
          </div>
        </section>
      </Container>
    </div>
  );
}
