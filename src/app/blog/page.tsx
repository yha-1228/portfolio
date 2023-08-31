import { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/container';
import Heading1 from '@/components/ui/heading1';
import Tag from '@/components/ui/tag';
import { getBlogListResponse } from '@/lib/microcms/client';
import { routes } from '@/routes';
import { formatISODate } from '@/utils/date/formatter';

export const metadata: Metadata = {
  title: 'ブログ',
};

export default async function Page() {
  const { contents } = await getBlogListResponse();

  return (
    <main className="py-8">
      <Container>
        <section className="space-y-6">
          <Heading1>ブログ</Heading1>
          <ul>
            {contents.map((content) => (
              <li key={content.id}>
                <Link
                  href={routes.blog.routes[':id'].generateHref(content.id)}
                  className="group block rounded-md border border-solid border-gray-light-300 px-5 py-4 transition-colors duration-200 ease-out active:border-gray-foreground"
                >
                  <div className="text-xl font-bold text-gray-foreground-weak underline-offset-[0.18em] group-hover:text-gray-foreground">
                    {content.title}
                  </div>
                  <p className="text-sm text-gray-foreground-weak">
                    {formatISODate(content.publishedAt)}に投稿
                  </p>
                  <Tag className="mt-5">{content.tag.tagName}</Tag>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </main>
  );
}
