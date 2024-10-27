import { type ComponentPropsWithRef, forwardRef } from "react";
import { clsx } from "@/utils/css/clsx";

interface ContainerProps extends ComponentPropsWithRef<"div"> {
  fluid?: boolean;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
  const { className, fluid, ...restProps } = props;

  return (
    <div
      className={clsx(
        "mx-auto w-full px-5",
        !fluid && "sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg",
        className,
      )}
      {...restProps}
      ref={ref}
    />
  );
});

Container.displayName = "Container";

export { Container, type ContainerProps };
