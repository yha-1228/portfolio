import Container from '@/components/ui/styled/container';
import Heading1 from '@/components/ui/styled/heading1';
import Heading2 from '@/components/ui/styled/heading2';
import Timeline from '@/components/ui/styled/timeline';
import AvoidTelLink from '@/components/ui/unstyled/avoid-tel-link';
import { items } from '@/data/experience';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '職務経歴',
};

export default function Page() {
  return (
    <div className="py-14">
      <Container until="md">
        <section className="space-y-6">
          <Heading1>職務経歴</Heading1>
          {items.map((item) => (
            <section className="mt-12 space-y-5" key={item.company}>
              <div className="space-y-1">
                <Heading2>{item.company}</Heading2>
                <div className="text-sm text-gray-foreground-weak">
                  <AvoidTelLink>{item.kikan}</AvoidTelLink>
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
    </div>
  );
}
