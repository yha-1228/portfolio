import { BsFillCircleFill } from 'react-icons/bs';
import resolveConfig from 'tailwindcss/resolveConfig';
import createStyleAttr from '@/utils/css/create-style-attr';
import { px } from '@/utils/css/unit';
import clsx from '@/utils/react/clsx';
import tailwindConfig from '../../../tailwind.config.js';
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
          '--space-between-content': theme?.spacing?.[4],
        })}
      >
        {spacer}
        <ul className="flex-1 border-l-2 border-solid border-l-gray-light-weak">
          {items.map((item) => (
            <li key={item.heading} className="mb-8 flex last:mb-0">
              <div className="relative ml-[var(--space-between-content)] w-full">
                <div
                  className={clsx(
                    'absolute -top-2',
                    'left-[calc(-1*calc(var(--space-between-content)+calc(var(--dot-size)/2))-2px+1px)]',
                  )}
                >
                  <BsFillCircleFill className="h-[var(--dot-size)] w-[var(--dot-size)] text-primary-600" />
                </div>
                <div className="absolute top-[-1.05rem] text-xl font-bold text-primary-600">
                  {item.point}
                </div>
                <div className="mt-7 space-y-4 border-t border-solid border-t-gray-light-weak pt-2">
                  <div className="font-bold">{item.heading}</div>
                  <Show when={!!item.content}>
                    <div className="space-y-3 leading-[1.65] text-gray-500">
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
