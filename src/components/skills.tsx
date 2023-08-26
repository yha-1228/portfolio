import { twMerge } from 'tailwind-merge';
import { SkillDetail, skillDetails, skillWords } from '@/data/skills';
import clsx from '@/utils/react/clsx';
import Container from './ui/container';
import Heading1 from './ui/heading1';
import Heading2 from './ui/heading2';
import Show from './ui/unstyled/show';

type SkillDetailCardProps = {
  heading: React.ReactNode;
  items: SkillDetail['items'];
  className?: string;
};

function SkillDetailCard({ heading, items, className }: SkillDetailCardProps) {
  const itemsGood = items.filter((item) => item.rank === 'good');
  const itemsNormal = items.filter((item) => item.rank === 'normal');
  const itemsBad = items.filter((item) => item.rank === 'bad');

  return (
    <section
      className={twMerge(
        'rounded-lg border border-solid border-gray-light-300',
        className,
      )}
    >
      <div className="px-5 pb-6 pt-4 lg:px-6 lg:pb-7 lg:pt-5">
        <div className="text-center">
          <h4 className="pb-1.5 font-bold">{heading}</h4>
          <hr className="mx-auto h-0.5 w-[2.5rem] border-0 bg-gray-light-300" />
        </div>
        <div className="mt-2 text-gray-foreground-weak">
          <Show when={itemsGood.length > 0}>
            <div>
              <h5 className="pb-2 pt-5 text-xl font-bold text-primary-600">
                可能
              </h5>
              <ul className="space-y-1 pl-4">
                {itemsGood.map((item) => (
                  <li
                    key={item.text}
                    className="list-disc leading-[1.6] text-gray-foreground"
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </Show>
          <Show when={itemsNormal.length > 0}>
            <div>
              <h5 className="pb-2 pt-5 text-xl font-bold">少し可能</h5>
              <ul className="space-y-1 pl-4">
                {itemsNormal.map((item) => (
                  <li key={item.text} className="list-disc leading-[1.6]">
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </Show>
          <Show when={itemsBad.length > 0}>
            <div>
              <h5 className="pb-2 pt-5 text-xl font-bold">未経験レベル</h5>
              <ul className="space-y-1 pl-4">
                {itemsBad.map((item) => (
                  <li key={item.text} className="list-disc leading-[1.6]">
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </Show>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------

export default function Skills() {
  return (
    <div className="py-8">
      <Container>
        <section className="space-y-6">
          <Heading1>スキル</Heading1>
          <div>
            <div className="flex flex-wrap gap-x-3 gap-y-[10px]">
              {skillWords.map((skillWord) => (
                <div
                  key={skillWord.label}
                  className={twMerge(
                    'whitespace-nowrap text-xl leading-[1.05] text-gray-foreground-weak',
                    skillWord.specialty &&
                      'font-bold text-gray-foreground maker',
                  )}
                >
                  {skillWord.label}
                </div>
              ))}
            </div>
            <section className="mt-12 space-y-5">
              <Heading2>詳細</Heading2>
              <div className="space-y-6 md:flex md:flex-wrap md:justify-between md:gap-x-[16px] md:gap-y-[20px] md:space-y-0">
                {skillDetails.map((skillDetail, idx) => (
                  <div
                    key={skillDetail.category}
                    className="md:w-[calc(50%-calc(16px/2))]"
                  >
                    <SkillDetailCard
                      className={clsx(
                        0 <= idx && idx <= 1 && 'md:h-[540px]',
                        2 <= idx && idx <= 3 && 'md:h-[400px]',
                      )}
                      heading={skillDetail.category}
                      items={skillDetail.items}
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </Container>
    </div>
  );
}
