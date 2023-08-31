import { Metadata } from 'next';
import Container from '@/components/ui/container';
import Heading1 from '@/components/ui/heading1';
import Heading2 from '@/components/ui/heading2';
import Timeline from '@/components/ui/timeline';
import { items } from '@/data/experience';

export const metadata: Metadata = {
  title: '職務経歴',
};

export default function Page() {
  return (
    <main className="py-8">
      <Container>
        <section className="space-y-6">
          <Heading1>職務経歴</Heading1>
          {items.map((item) => (
            <section className="mt-12 space-y-5" key={item.company}>
              <div className="space-y-1">
                <Heading2>{item.company}</Heading2>
                <div className="text-sm text-gray-foreground-weak">
                  {item.kikan}
                </div>
              </div>
              <Timeline
                items={item.experiences.map((experience) => ({
                  point: experience.kikan,
                  heading: experience.title,
                  content: experience.description,
                }))}
              />
            </section>
          ))}
        </section>
      </Container>
    </main>
  );
}
