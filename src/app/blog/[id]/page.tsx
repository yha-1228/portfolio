import { Metadata } from 'next';
import { BsChevronLeft } from 'react-icons/bs';
import Container from '@/components/ui/styled/container';
import Heading1 from '@/components/ui/styled/heading1';
import Tag from '@/components/ui/styled/tag';
import { TextLink } from '@/components/ui/styled/text-link';
import { getBlogContent, getBlogListResponse } from '@/lib/microcms/client';
import {
  GenerateMetadataProps,
  NextPagePropsWithParams,
} from '@/lib/next/types';
import { routes } from '@/routes';
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
  const { contents } = await getBlogListResponse();
  return contents.map((content) => ({ id: content.id }));
}

export default async function Page({ params }: NextPagePropsWithParams<'id'>) {
  const { id } = params;
  const content = await getBlogContent(id);

  return (
    <main className="pb-12 pt-10">
      <Container lockLg>
        <TextLink
          href={routes.blog.href}
          className="inline-flex items-center space-x-1"
        >
          <BsChevronLeft />
          <span>戻る</span>
        </TextLink>

        <article className="mt-8">
          <header>
            <Heading1 className="mb-0">{content.title}</Heading1>
            <p className="mt-4 text-sm font-normal text-gray-foreground-weak">
              {formatISODate(content.publishedAt)} に投稿
            </p>
          </header>
          <div className="mt-8 border-t border-solid border-t-gray-light-300 py-5 md:py-6">
            <Tag>{content.tag.tagName}</Tag>
            <div
              className={clsx(
                'pt-4',
                '[&>h2]:mb-6 [&>h2]:mt-12 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:leading-tight',
                '[&>p]:my-5',
                '[&>ul]:pl-9',
                '[&>ul>li]:list-disc',
              )}
              dangerouslySetInnerHTML={{
                __html: content.body,
              }}
            />
          </div>
        </article>
      </Container>
    </main>
  );
}
