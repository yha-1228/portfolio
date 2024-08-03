import resolveConfig from 'tailwindcss/resolveConfig';
import clsx from '@/utils/css/clsx';
import { px } from '@/utils/css/unit';
import createStyleAttr from '@/utils/react/create-style-attr';
import tailwindConfig from '../../../../tailwind.config';
import AvoidTelLink from '../unstyled/avoid-tel-link';
import Show from '../unstyled/show';

const { theme } = resolveConfig(tailwindConfig);

export type TimelineItem = {
  point: string;
  heading: React.ReactNode;
  content?: React.ReactNode;
};

export type TimelineProps = {
  items: TimelineItem[];
};

export default function Timeline({ items }: TimelineProps) {
  const spacer = <div className="w-[calc(var(--dot-size)/2)]" />;

  return (
    <div
      className={clsx(
        'flex',
        'pt-[9px]', // dotを上に上げた分、ルート要素はそれも囲うようにする。目視
      )}
      style={createStyleAttr({
        '--dot-size': px(16),
        '--space-between-content': theme?.spacing?.[6],
      })}
    >
      {spacer}
      <ul className="flex-1 border-l-2 border-solid border-l-primary-600">
        {items.map((item, index) => (
          <li key={index} className="mb-10 flex last:mb-0">
            <div className="relative ml-[var(--space-between-content)] w-full">
              <div
                className={clsx(
                  'absolute -top-2',
                  'left-[calc(-1*calc(var(--space-between-content)+calc(var(--dot-size)/2))-2px+1px)]',
                )}
              >
                <div className="size-[var(--dot-size)] rounded-full border-4 border-solid border-primary-600 bg-white" />
              </div>
              <div className="absolute top-[-0.85rem] font-semibold text-primary-600">
                <AvoidTelLink>{item.point}</AvoidTelLink>
              </div>
              <div className="mt-6 border-t border-solid border-t-gray-light-300 pt-2">
                <div className="py-1 text-xl font-bold leading-snug">
                  {item.heading}
                </div>
                <Show when={!!item.content}>
                  <div className="mt-3 space-y-2.5 text-sm leading-[1.65] text-gray-foreground-weak">
                    {item.content}
                  </div>
                </Show>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
