import { twMerge } from 'tailwind-merge';
import { SkillDetail, skillDetails, skillWords } from '@/data/skills';
import clsx from '@/utils/css/clsx';
import styles from './skills.module.css';
import Container from './ui/container';
import Heading1 from './ui/heading1';
import Heading2 from './ui/heading2';
import Show from './ui/unstyled/show';

type SkillDetailCardProps = {
  heading: React.ReactNode;
  items: SkillDetail['items'];
  className?: string;
  accent?: boolean;
};

function SkillDetailCard({
  heading,
  items,
  className,
  accent,
}: SkillDetailCardProps) {
  const itemsGood = items.filter((item) => item.rank === 'good');
  const itemsNormal = items.filter((item) => item.rank === 'normal');
  const itemsBad = items.filter((item) => item.rank === 'bad');

  return (
    <div
      className={twMerge(
        'rounded-lg pt-6 pb-6 bg-white card-shadow',
        accent && 'border-solid border-2 border-primary-600',
        className,
      )}
    >
      <div className="text-center">
        <h4
          className={clsx(
            'font-bold',
            accent ? 'text-primary-600' : 'text-gray-foreground-weak',
          )}
        >
          {heading}
        </h4>
        <hr
          className={clsx(
            'mx-auto mt-2 h-0.5 w-[2.5rem] border-0',
            accent ? 'bg-primary-600' : 'bg-gray-light-300',
          )}
        />
      </div>
      <div className="space-y-5 border-solid px-5 text-gray-foreground lg:px-6">
        <Show when={itemsGood.length > 0}>
          <div>
            <h5 className="pb-2 pt-3 text-xl font-bold text-primary-600">
              可能
            </h5>
            <ul className="space-y-1.5 pl-4">
              {itemsGood.map((item) => (
                <li key={item.text} className="list-disc leading-[1.6]">
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </Show>
        <Show when={itemsNormal.length > 0}>
          <div>
            <h5 className="pb-2 pt-3 text-xl font-bold">少し可能</h5>
            <ul className="space-y-1.5 pl-4">
              {itemsNormal.map((item) => (
                <li key={item.text} className="list-disc leading-[1.6]">
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </Show>
        <Show when={itemsBad.length > 0}>
          <div className="text-gray-foreground-weak">
            <h5 className="pb-2 pt-3 text-xl font-bold">未経験レベル</h5>
            <ul className="space-y-1.5 pl-4">
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
  );
}

// ----------------------------------------

export default function Skills() {
  return (
    <div
      className={clsx(
        styles.root,
        'border-t border-solid border-t-gray-light-200 py-14',
      )}
    >
      <Container>
        <div className="space-y-6">
          <Heading1>スキル</Heading1>
          <div>
            <div className="flex flex-wrap gap-x-3 gap-y-[10px]">
              {skillWords.map((skillWord) => (
                <div
                  key={skillWord.label}
                  className={twMerge(
                    'whitespace-nowrap text-xl lg:text-2xl leading-[1.05] text-gray-foreground-weak',

                    skillWord.specialty &&
                      'font-bold text-gray-foreground maker',
                  )}
                >
                  {skillWord.label}
                </div>
              ))}
            </div>
            <div className="mt-16">
              <Heading2 className="text-center">経験レベル</Heading2>
              <div className="mt-6 space-y-6 md:flex md:flex-wrap md:justify-between md:gap-x-[16px] md:gap-y-[20px] md:space-y-0">
                {skillDetails.map((skillDetail, idx) => (
                  <div
                    key={skillDetail.category}
                    className="md:w-[calc(50%-calc(16px/2))]"
                  >
                    <SkillDetailCard
                      accent={idx === 0}
                      className={clsx(
                        0 <= idx && idx <= 1 && 'md:h-[540px]',
                        2 <= idx && idx <= 3 && 'md:h-[360px]',
                      )}
                      heading={skillDetail.category}
                      items={skillDetail.items}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
