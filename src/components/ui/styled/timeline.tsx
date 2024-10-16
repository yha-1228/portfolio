export interface TimelineItem {
  point: string;
  heading: React.ReactNode;
  content?: React.ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} className="flex [&:last-child>*:nth-child(2)]:pb-0">
          {/* Dot + Axis */}
          <div className="flex shrink-0 flex-col items-center">
            {/* Dot */}
            <div className="size-4 rounded-full border-4 border-solid border-primary-600 bg-white" />
            {/* Axis */}
            <div className="h-full w-0.5 bg-primary-600" />
          </div>

          {/* Body */}
          <div className="ml-5 w-full pb-10">
            <div className="font-semibold leading-none text-primary-600">
              {item.point}
            </div>

            <div className="mt-4 border-t border-solid border-t-gray-light-300 pt-2">
              <div className="py-1 text-xl font-bold leading-snug">
                {item.heading}
              </div>
              {!!item.content && (
                <div className="mt-3 space-y-2.5 text-sm leading-[1.65] text-gray-foreground-weak">
                  {item.content}
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
