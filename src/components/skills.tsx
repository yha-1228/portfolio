import React from 'react';
import {
  Rank,
  SkillDetail,
  SkillWord,
  skillDetails,
  skillWords,
} from '@/data/skills';
import clsx from '@/utils/css/clsx';
import Container from './ui/styled/container';
import Heading1 from './ui/styled/heading1';
import Heading2 from './ui/styled/heading2';
import Divide from './ui/unstyled/divide';
import Show from './ui/unstyled/show';

type SkillDetailCardProps = {
  heading: React.ReactNode;
  items: SkillDetail['items'];
  accent?: boolean;
  className?: string;
};

const rankHeadingMap: { [key in Rank]: string } = {
  good: '可能',
  normal: '少し可能',
  bad: '未経験レベル',
};

const rankIconClassNameMap: { [key in Rank]: string } = {
  good: "bg-[url('/assets/check-circle-fill-color-foreground.svg')]",
  normal: "bg-[url('/assets/check-circle-color-foreground.svg')]",
  bad: "bg-[url('/assets/dash-circle-color-foreground.svg')]",
};

function SkillDetailCard(props: SkillDetailCardProps) {
  const { heading, items, className, accent } = props;

  return (
    <div
      className={clsx(
        'rounded-lg px-5 lg:px-6',
        'bg-white shadow-card',
        'border-2 border-solid',
        accent ? 'border-primary-600' : 'border-white',
        className,
      )}
    >
      <div className="pb-3 pt-4">
        <h4 className="font-bold">{heading}</h4>
      </div>
      <div
        className={clsx(
          'space-y-5 pb-6 pt-4',
          'text-gray-foreground',
          'border-t border-solid border-t-gray-light-300',
        )}
      >
        {(['good', 'normal', 'bad'] as Rank[]).map((rank) => {
          const filteredItemsByRank = items.filter(
            (item) => item.rank === rank,
          );

          return (
            <Show key={rank} when={filteredItemsByRank.length > 0}>
              <div>
                <h5 className="pb-2 pt-3 text-lg font-bold">
                  {rankHeadingMap[rank]}
                </h5>
                <ul className="mt-2 space-y-2.5 text-sm text-gray-foreground-weak">
                  {filteredItemsByRank.map((item) => (
                    <li
                      key={item.text}
                      className={clsx(
                        'bg-[length:18px_18px] bg-[0_0.12rem] bg-no-repeat ps-[1.75rem] leading-[1.6]',
                        rankIconClassNameMap[rank],
                      )}
                    >
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </Show>
          );
        })}
      </div>
    </div>
  );
}

// ----------------------------------------

const skillWordCategoryHeadingMap: { [key in SkillWord['category']]: string } =
  {
    fe: 'フロントエンド',
    be: 'バックエンド',
    tools: 'ツール等',
  };

export default function Skills() {
  return (
    <>
      <div className="bg-gray-light-100 py-14">
        <Container>
          <Heading1>言語/FW等</Heading1>
          <div className="space-y-10 sm:flex sm:space-x-8 sm:space-y-0 sm:[&>*]:w-1/3">
            {(['fe', 'be', 'tools'] as SkillWord['category'][]).map(
              (category) => {
                const filteredSkillWordsByCategory = skillWords.filter(
                  (s) => s.category === category,
                );

                return (
                  <section
                    key={category}
                    className="border-t border-solid border-t-gray-light-400 pt-2"
                  >
                    <Heading2 className="mb-2 mt-1 text-2xl sm:mb-3">
                      {skillWordCategoryHeadingMap[category]}
                    </Heading2>
                    <div className="leading-loose sm:hidden">
                      <Divide by=", ">
                        {filteredSkillWordsByCategory.map((s) => (
                          <span
                            key={s.label}
                            className={clsx(
                              s.strong &&
                                'font-bold text-gray-foreground underline decoration-marker decoration-[1.5px] underline-offset-[6px]',
                            )}
                          >
                            {s.label}
                          </span>
                        ))}
                      </Divide>
                    </div>
                    <ul className="hidden list-inside list-disc space-y-1 pl-1 sm:block">
                      {filteredSkillWordsByCategory.map((s) => (
                        <li
                          key={s.label}
                          className={clsx(
                            'break-all pl-[1.5rem] indent-[-1.6rem] text-lg',
                            s.strong &&
                              'font-bold text-gray-foreground underline decoration-marker decoration-[1.5px] underline-offset-[6px]',
                          )}
                        >
                          {s.label}
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              },
            )}
          </div>
        </Container>
      </div>

      <div className="bg-gray-light-100 pt-3">
        <Container>
          <hr className="h-[2px] w-full border-0 bg-gray-foreground" />
        </Container>
      </div>

      <div className="bg-gray-light-100 py-14">
        <Container>
          <Heading1>提供可能な業務</Heading1>
          <ul className="mt-6 space-y-6 lg:flex lg:flex-wrap lg:justify-between lg:gap-x-[16px] lg:gap-y-[20px] lg:space-y-0">
            {skillDetails.map((skillDetail, idx) => (
              <li
                key={skillDetail.category}
                className="lg:w-[calc(50%-calc(16px/2))]"
              >
                <SkillDetailCard
                  accent={idx === 0}
                  heading={skillDetail.category}
                  items={skillDetail.items}
                  className={clsx(
                    0 <= idx && idx <= 1 && 'lg:h-[calc(8px*62)]',
                    2 <= idx && idx <= 3 && 'lg:h-[calc(8px*43)]',
                  )}
                />
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </>
  );
}
