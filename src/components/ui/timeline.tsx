export type TimelineItem = {
  time: string | string[];
  heading: string;
  content: React.ReactNode;
};

type TimelineProps = {
  items: TimelineItem[];
};

export default function Timeline({ items }: TimelineProps) {
  const lastIndex = items.length - 1;

  return (
    <div>
      {items.map((item, index) => (
        <div key={item.heading + item.content}>
          {Array.isArray(item.time) ? (
            <>
              {item.time.map((t) => (
                <div
                  key={t}
                  className="border-l-4 border-solid border-primary-600 pl-4 text-xl font-bold leading-[1.45] text-primary-600"
                >
                  {t}
                </div>
              ))}
            </>
          ) : (
            <div className="border-l-4 border-solid border-primary-600 pl-4 text-xl font-bold text-primary-600">
              {item.time}
            </div>
          )}
          <div className="h-4 border-l-4 border-solid border-l-gray-light-weak" />
          <div className="flex justify-between">
            <div className="border-l-4 border-solid border-l-gray-light-weak" />

            <div className="flex-1 pl-5">
              <div className="space-y-4 border-t border-solid border-t-gray-light-weak pt-3">
                <div className="font-bold">{item.heading}</div>
                <div className="space-y-3 leading-[1.65] text-gray-500">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
          {index !== lastIndex && (
            <div className="h-5 border-l-4 border-solid border-l-gray-light-weak" />
          )}
        </div>
      ))}
    </div>
  );
}
