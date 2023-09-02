import React from 'react';
import { Rank, SkillDetail, skillDetails, skillWords } from '@/data/skills';
import clsx from '@/utils/css/clsx';
import styles from './skills.module.css';
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
        'card-shadow bg-white',
        'border-2 border-solid',
        accent ? 'border-primary-600' : 'border-transparent',
        className,
      )}
    >
      <div className="pb-3 pt-4">
        <h4 className="text-sm font-bold">{heading}</h4>
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

export default function Skills() {
  return (
    <div
      className={clsx(
        styles.root,
        'border-t border-solid border-t-gray-light-200 pb-12 pt-10',
      )}
    >
      <Container>
        <Heading1>スキル紹介</Heading1>
        <Heading2>言語・ツール</Heading2>
        <div className="rounded-lg border border-solid border-gray-light-300 bg-white px-5 py-3">
          <Divide
            by={
              <span className="px-1.5 text-lg text-gray-foreground-weak lg:text-xl">
                /
              </span>
            }
          >
            {skillWords.map((skillWord) => (
              <div
                key={skillWord.label}
                className={clsx(
                  'inline-block whitespace-nowrap text-lg !leading-[1.2] text-gray-foreground-weak lg:text-xl',
                  skillWord.specialty &&
                    'marker font-bold text-gray-foreground',
                )}
              >
                {skillWord.label}
              </div>
            ))}
          </Divide>
        </div>

        <Heading2 className="mt-12 border-t border-solid border-t-gray-light-300 pt-12">
          可能な作業
        </Heading2>
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
                  0 <= idx && idx <= 1 && 'lg:h-[calc(8px*60)]',
                  2 <= idx && idx <= 3 && 'lg:h-[calc(8px*39)]',
                )}
              />
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
