import React from "react";
import { type Metadata } from "next";
import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { Heading2 } from "@/components/ui/styled/heading2";
import { Timeline, type TimelineItem } from "@/components/ui/styled/timeline";
import { AvoidTelLink } from "@/components/ui/unstyled/avoid-tel-link";
import { experiencesOverviewItems, type Experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "職務経歴",
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
      <Container className="md:max-w-screen-md">
        <section>
          <div className="pb-10 text-center">
            <Heading1>職務経歴</Heading1>
          </div>
          <div className="space-y-12">
            {experiencesOverviewItems.map((experiencesOverviewItem) => (
              <section
                className="space-y-5"
                key={experiencesOverviewItem.company}
              >
                <div>
                  <Heading2>{experiencesOverviewItem.company}</Heading2>
                  <AvoidTelLink
                    as="div"
                    className="mt-6 text-sm text-gray-foreground-weak"
                  >
                    {experiencesOverviewItem.kikan}
                  </AvoidTelLink>
                </div>
                <Timeline
                  items={experiencesOverviewItem.experiences.map((experience) =>
                    experienceToTimelineItem(experience),
                  )}
                />
              </section>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
