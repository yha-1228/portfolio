import { type CSSProperties } from "react";
import { tailwindFullConfig } from "@/tailwind-config";
import clsx from "@/utils/css/clsx";

const { theme } = tailwindFullConfig;

export interface TimelineItem {
  point: string;
  heading: React.ReactNode;
  content?: React.ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div
      style={
        {
          "--dot-size": theme.spacing["4"],
          "--border-width": theme.spacing["0.5"],
        } as CSSProperties
      }
      className="pl-[calc(var(--dot-size)/2)]"
    >
      <ul className="space-y-10 border-l-[length:var(--border-width)] border-solid border-l-primary-600">
        {items.map((item, index) => (
          <li key={index} className="relative w-full">
            {/* Dot */}
            <div
              className={clsx(
                "absolute left-[calc(-8px-calc(var(--border-width)/2))] top-0",
                "size-[var(--dot-size)] rounded-full border-4 border-solid border-primary-600 bg-white",
              )}
            />

            {/* Body */}
            <div className="ml-6">
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
    </div>
  );
}
