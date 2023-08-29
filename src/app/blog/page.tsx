import { Metadata } from 'next';
import Container from '@/components/ui/container';
import Heading1 from '@/components/ui/heading1';
import { TextLink } from '@/components/ui/text-link';
import { getBlogContents } from '@/lib/microcms/client';

export const metadata: Metadata = {
  title: 'ブログ',
};

export default async function Page() {
  const { contents } = await getBlogContents();

  return (
    <div className="py-8">
      <Container>
        <section className="space-y-6">
          <Heading1>ブログ</Heading1>
          <ul>
            {contents.map((content) => (
              <li key={content.id}>
                <TextLink href={`/blog/${content.id}`} className="font-bold">
                  {content.title}
                </TextLink>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </div>
  );
}
