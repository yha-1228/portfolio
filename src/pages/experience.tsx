import Layout from '@/components/layout';
import Container from '@/components/ui/container';
import Heading1 from '@/components/ui/heading1';
import Heading2 from '@/components/ui/heading2';
import Timeline from '@/components/ui/timeline';
import { jobExperienceList } from '@/data/experience';

export default function Experience() {
  return (
    <Layout title="職務経歴">
      <div className="py-8">
        <Container>
          <section className="space-y-6">
            <Heading1>職務経歴</Heading1>
            <section className="mt-12 space-y-5">
              <div className="space-y-1">
                <Heading2>株式会社アイキューブ</Heading2>
                <div className="text-sm text-gray-foreground-weak">
                  2019/04 - 2023/08
                </div>
              </div>
              <Timeline
                items={jobExperienceList.map((jobExperience) => ({
                  point: jobExperience.point,
                  heading: jobExperience.title,
                  content: jobExperience.description,
                }))}
              />
            </section>
          </section>
        </Container>
      </div>
    </Layout>
  );
}
