import resolveConfig from 'tailwindcss/resolveConfig';
import clsx from '@/utils/css/clsx';
import { px } from '@/utils/css/unit';
import createStyleAttr from '@/utils/react/create-style-attr';
import tailwindConfig from '../../../tailwind.config';
import Show from './unstyled/show';

const { theme } = resolveConfig(tailwindConfig);

type TimelineItem = {
  point: string;
  heading: string;
  content?: React.ReactNode;
};

type TimelineProps = {
  items: TimelineItem[];
};

export default function Timeline({ items }: TimelineProps) {
  const spacer = <div className="w-[calc(var(--dot-size)/2)]" />;

  return (
    <div>
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
        <ul className="flex-1 border-l-2 border-solid border-l-gray-light-300">
          {items.map((item) => (
            <li key={item.heading} className="mb-10 flex last:mb-0">
              <div className="relative ml-[var(--space-between-content)] w-full">
                <div
                  className={clsx(
                    'absolute -top-2',
                    'left-[calc(-1*calc(var(--space-between-content)+calc(var(--dot-size)/2))-2px+1px)]',
                  )}
                >
                  <div className="h-[var(--dot-size)] w-[var(--dot-size)] rounded-full border-4 border-solid border-gray-light-300 bg-white" />
                </div>
                <div className="pointer-events-none absolute top-[-0.85rem] font-semibold">
                  {item.point}
                </div>
                <div className="mt-5 border-t border-solid border-t-gray-light-200 pt-2">
                  <div className="text-xl font-bold">{item.heading}</div>
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
    </div>
  );
}
