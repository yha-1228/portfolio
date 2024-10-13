/**
 * 指定した要素の配下にある`button`, `a`の配列を検索する。
 */
export function findFocusableElements(parentElement: HTMLElement) {
  return Array.from(
    parentElement.querySelectorAll<HTMLAnchorElement | HTMLButtonElement>(
      "a, button",
    ),
  );
}

/**
 * `Tab`または`Shift + Tab`によるフォーカスを、指定した要素の配下に限定する。
 */
export function loopFocus(event: KeyboardEvent, parentElement: HTMLElement) {
  if (event.key === "Tab") {
    const focusableElements = findFocusableElements(parentElement);
    if (focusableElements.length === 0) return;

    const nextFocusIndex = focusableElements.findIndex(
      (element) => element === document.activeElement,
    );

    // 最後から進もうとしたら、最初に飛ばす
    if (!event.shiftKey && nextFocusIndex === focusableElements.length - 1) {
      event.preventDefault();

      const nextFocusElement = focusableElements[0];
      nextFocusElement?.focus();
      return;
    }

    // 最初から戻ろうとしたら、最後に飛ばす
    if (event.shiftKey && nextFocusIndex === 0) {
      event.preventDefault();

      const nextFocusElement = focusableElements.at(-1);
      nextFocusElement?.focus();
      return;
    }
  }
}
