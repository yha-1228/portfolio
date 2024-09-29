import React from 'react';
import { type Metadata } from 'next';
import Container from '@/components/ui/styled/container';
import Heading1 from '@/components/ui/styled/heading1';
import Heading2 from '@/components/ui/styled/heading2';
import Timeline, { type TimelineItem } from '@/components/ui/styled/timeline';
import AvoidTelLink from '@/components/ui/unstyled/avoid-tel-link';
import { experiencesOverviewItems , type Experience } from '@/data/experience';

export const metadata: Metadata = {
  title: '職務経歴',
};

function experienceToTimelineItem(experience: Experience): TimelineItem {
  const { kikan, title, projectCompanyName, description } = experience;

  const heading = projectCompanyName ? (
    <>
      {title} <br />
      <div className="mt-2 text-lg font-normal text-gray-foreground">
        {projectCompanyName}
      </div>
    </>
  ) : (
    title
  );

  return {
    point: kikan,
    heading: heading,
    content: description,
  };
}

export default function Page() {
  return (
    <div className="py-14">
      <Container until="md">
        <section className="space-y-6">
          <Heading1>職務経歴</Heading1>
          {experiencesOverviewItems.map((experiencesOverviewItem) => (
            <section
              className="mt-12 space-y-5"
              key={experiencesOverviewItem.company}
            >
              <div className="space-y-1">
                <Heading2>{experiencesOverviewItem.company}</Heading2>
                <div className="text-sm text-gray-foreground-weak">
                  <AvoidTelLink>{experiencesOverviewItem.kikan}</AvoidTelLink>
                </div>
              </div>
              <Timeline
                items={experiencesOverviewItem.experiences.map((experience) =>
                  experienceToTimelineItem(experience),
                )}
              />
            </section>
          ))}
        </section>
      </Container>
    </div>
  );
}
