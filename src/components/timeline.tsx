export type TimelineItem = {
  time: string;
  heading: string;
  content?: React.ReactNode;
};

type TimelineProps = {
  items: TimelineItem[];
};

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="">
      {items.map((item) => (
        <div key={item.time}>
          <div className="border-l-4 border-solid border-primary-500 pl-4 font-bold text-primary-500 ">
            {item.time}
          </div>
          <div className="border-l-4 border-solid border-l-gray-light-weak pl-4 text-lg font-bold">
            {item.heading}
          </div>
          {item.content && (
            <div className="space-y-3 border-l-4 border-solid border-l-gray-light-weak pb-5 pl-4 pt-4">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
