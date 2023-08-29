import { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/container';
import Heading1 from '@/components/ui/heading1';
import { getBlogContents } from '@/lib/microcms/client';

export const metadata: Metadata = {
  title: 'ブログ',
};

export default async function Page() {
  const blogContentsInfo = await getBlogContents();

  return (
    <div className="py-8">
      <Container>
        <section className="space-y-6">
          <Heading1>ブログ</Heading1>
          <ul>
            {blogContentsInfo.contents.map((content) => (
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
  );
}
