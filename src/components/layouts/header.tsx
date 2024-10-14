"use client";

import React, {
  type ComponentProps,
  type CSSProperties,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsChevronRight, BsList, BsX } from "react-icons/bs";
import { MOBILE_MENU_ID } from "@/constants";
import { useKeydown } from "@/hooks/use-keydown";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useOnRouteChange } from "@/hooks/use-on-route-change";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { routes } from "@/routes";
import { tailwindFullConfig } from "@/tailwind-config";
import { clsx } from "@/utils/css/clsx";
import { Container } from "../ui/styled/container";
import { LoopFocusContainer } from "../ui/unstyled/loop-focus-container";

function ActiveNavLink(props: ComponentProps<typeof Link>) {
  const { href, ...restProps } = props;
  const pathname = usePathname();
  const active = href === pathname;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      data-active={active ? "true" : undefined}
      {...restProps}
    />
  );
}

// ----------------------------------------

const routesWithoutHome = Object.values(routes).filter(
  (route) => route.href !== "/",
);

export const headerHeight = tailwindFullConfig.theme.spacing["16"];
export const hederBorderBottomWidth = tailwindFullConfig.theme.spacing.px;

export function Header() {
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMediaQuery({
    query: `(min-width: ${tailwindFullConfig.theme.screens.sm})`,
    callback: (event) => {
      if (isMobileMenuOpen) {
        if (event.matches) {
          setIsMobileMenuOpen(false);
        }
      }
    },
  });

  useScrollLock({ enabled: isMobileMenuOpen });

  useOnRouteChange(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  });

  useKeydown((event) => {
    if (isMobileMenuOpen) {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        mobileMenuButtonRef.current?.focus();
      }
    }
  });

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleHomeLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <LoopFocusContainer as="header" className="sticky top-0 z-header">
      <div
        style={
          {
            "--header-height": headerHeight,
            "--header-border-bottom-width": hederBorderBottomWidth,
          } as CSSProperties
        }
        className="relative h-[var(--header-height)] border-b-[length:var(--header-border-bottom-width)] border-solid border-b-gray-light-300 bg-white"
      >
        <Container as="nav">
          <div className="relative flex h-[calc(var(--header-height)-var(--header-border-bottom-width))] items-center justify-between">
            <Link
              href="/"
              className={clsx(
                "text-2xl font-bold transition-colors duration-200 ease-out hover:text-gray-foreground-weak",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-300",
              )}
              onClick={handleHomeLinkClick}
            >
              Yuta Hasegawa
            </Link>

            {/* mobile only */}
            <button
              type="button"
              ref={mobileMenuButtonRef}
              className={clsx(
                "flex size-9 items-center justify-center sm:hidden",
                "absolute -right-1.5 top-1/2 -translate-y-1/2",
              )}
              onClick={handleMobileMenuToggle}
              aria-label={
                isMobileMenuOpen ? "メニューを開く" : "メニューを閉じる"
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls={MOBILE_MENU_ID}
            >
              {isMobileMenuOpen ? (
                <BsX aria-hidden="true" className="size-8" />
              ) : (
                <BsList aria-hidden="true" className="size-8" />
              )}
            </button>

            {/* desktop only */}
            <ul className="hidden sm:flex">
              {routesWithoutHome.map((route) => (
                <li key={route.href}>
                  <ActiveNavLink
                    href={route.href}
                    className={clsx(
                      "relative inline-flex h-[calc(var(--header-height)-var(--header-border-bottom-width))] items-center px-3",
                      "font-bold text-gray-foreground/70",
                      "transition-colors duration-200 ease-out",
                      "hover:text-primary-600 hover:before:absolute hover:before:bottom-0 hover:before:left-0 hover:before:h-0.5 hover:before:w-full hover:before:bg-transparent hover:before:content-['']",
                      "active:bg-gray-light-100",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-300",
                      "data-[active]:font-bold data-[active]:text-primary-600",
                      "data-[active]:before:absolute data-[active]:before:bottom-0 data-[active]:before:left-0 data-[active]:before:h-[3px] data-[active]:before:w-full data-[active]:before:bg-primary-600 data-[active]:before:content-['']",
                      "data-[active]:hover:text-primary-600 data-[active]:hover:before:bg-primary-600",
                    )}
                  >
                    {route.label}
                  </ActiveNavLink>
                </li>
              ))}
            </ul>
          </div>
        </Container>

        {/* mobile only */}
        <Container
          id={MOBILE_MENU_ID}
          className={clsx(
            "sm:hidden",
            "absolute left-0 top-[var(--header-height)] w-full overflow-y-hidden bg-white transition-[height,visibility] duration-200 ease-in",
            isMobileMenuOpen
              ? "visible h-[calc(100dvh-var(--header-height))]"
              : "invisible block h-0",
          )}
        >
          <ul className="divide-y divide-solid divide-gray-light-200 py-3">
            {routesWithoutHome.map((route) => (
              <li key={route.href}>
                <ActiveNavLink
                  href={route.href}
                  className={clsx(
                    "flex h-12 items-center justify-between font-bold",
                    "[&>span]:text-gray-foreground-weak [&>span]:data-[active]:text-primary-600",
                  )}
                >
                  <span>{route.label}</span>
                  <BsChevronRight />
                </ActiveNavLink>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </LoopFocusContainer>
  );
}
