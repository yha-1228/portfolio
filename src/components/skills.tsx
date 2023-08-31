import { SkillDetail, skillDetails, skillWords } from '@/data/skills';
import clsx from '@/utils/css/clsx';
import styles from './skills.module.css';
import Container from './ui/styled/container';
import Heading1 from './ui/styled/heading1';
import Heading2 from './ui/styled/heading2';
import Show from './ui/unstyled/show';

type SkillDetailCardProps = {
  heading: React.ReactNode;
  items: SkillDetail['items'];
  contentClassName?: string;
  accent?: boolean;
};

function SkillDetailCard({
  heading,
  items,
  contentClassName,
  accent,
}: SkillDetailCardProps) {
  const itemsGood = items.filter((item) => item.rank === 'good');
  const itemsNormal = items.filter((item) => item.rank === 'normal');
  const itemsBad = items.filter((item) => item.rank === 'bad');

  return (
    <div className="card-shadow">
      <div
        className={clsx(
          'rounded-t-lg py-4 text-center',
          accent
            ? 'border-b border-solid border-b-transparent bg-primary-600 text-white'
            : 'border-b border-solid border-b-gray-light-200 bg-white text-gray-foreground',
        )}
      >
        <h4 className="font-bold">{heading}</h4>
      </div>
      <div
        className={clsx(
          'space-y-5 rounded-b-lg border-solid bg-white px-5 pb-6 pt-5 text-gray-foreground lg:px-6',
          'border-2 border-t-0',
          accent ? 'border-primary-600' : 'border-transparent',
          contentClassName,
        )}
      >
        <Show when={itemsGood.length > 0}>
          <div>
            <h5 className="pb-2 pt-3 text-lg font-bold">可能</h5>
            <ul className="mt-4 space-y-1.5 text-sm text-gray-foreground-weak">
              {itemsGood.map((item) => (
                <li
                  key={item.text}
                  className={clsx(
                    'bg-[length:18px_18px] bg-[0_0.12rem] bg-no-repeat ps-[1.75rem] leading-[1.6]',
                    "bg-[url('/assets/check-circle-fill-color-foreground.svg')]",
                  )}
                >
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </Show>
        <Show when={itemsNormal.length > 0}>
          <div>
            <h5 className="pb-2 pt-3 text-lg font-bold">少し可能</h5>
            <ul className="mt-4 space-y-1.5 text-sm text-gray-foreground-weak">
              {itemsNormal.map((item) => (
                <li
                  key={item.text}
                  className={clsx(
                    'bg-[length:18px_18px] bg-[0_0.12rem] bg-no-repeat ps-[1.75rem] leading-[1.6]',
                    "bg-[url('/assets/check-circle-color-foreground.svg')]",
                  )}
                >
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </Show>
        <Show when={itemsBad.length > 0}>
          <div>
            <h5 className="pb-2 pt-3 text-lg font-bold">未経験レベル</h5>
            <ul className="mt-4 space-y-1.5 text-sm text-gray-foreground-weak">
              {itemsBad.map((item) => (
                <li
                  key={item.text}
                  className={clsx(
                    'bg-[length:18px_18px] bg-[0_0.12rem] bg-no-repeat ps-[1.75rem] leading-[1.6]',
                    "bg-[url('/assets/dash-circle-color-foreground.svg')]",
                  )}
                >
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
                  className={clsx(
                    'whitespace-nowrap text-xl !leading-[1.2] text-gray-foreground-weak lg:text-2xl',
                    skillWord.specialty &&
                      'marker font-bold text-gray-foreground',
                  )}
                >
                  {skillWord.label}
                </div>
              ))}
            </div>
            <div className="mt-16">
              <Heading2 className="sr-only">経験レベル</Heading2>
              <div className="mt-6 space-y-6 md:flex md:flex-wrap md:justify-between md:gap-x-[16px] md:gap-y-[20px] md:space-y-0">
                {skillDetails.map((skillDetail, idx) => (
                  <div
                    key={skillDetail.category}
                    className="md:w-[calc(50%-calc(16px/2))]"
                  >
                    <SkillDetailCard
                      accent={idx === 0}
                      contentClassName={clsx(
                        0 <= idx && idx <= 1 && 'md:h-[490px]',
                        2 <= idx && idx <= 3 && 'md:h-[310px]',
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
