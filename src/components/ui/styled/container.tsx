/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import clsx from "@/utils/css/clsx";

type Until = "md" | "lg";

const untilMaxWidthMap: { [key in Until]: string } = {
  md: "md:max-w-screen-md",
  lg: "lg:max-w-screen-lg",
};

type ContainerProps = React.ComponentProps<"div"> & {
  fluid?: boolean;
  until?: Until;
  /**
   * @default "div"
   */
  as?: React.ElementType<any>;
};

export default function Container(props: ContainerProps) {
  const {
    className,
    fluid,
    until,
    as: Component = "div",
    ...restProps
  } = props;

  return (
    <Component
      className={clsx(
        fluid ? "w-full" : "container mx-auto",
        "px-5",
        until && untilMaxWidthMap[until],
        className,
      )}
      {...restProps}
    />
  );
}
