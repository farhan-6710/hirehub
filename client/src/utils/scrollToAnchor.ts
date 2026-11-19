import type { MouseEvent } from "react";

// Smooth-scrolls to an in-page anchor and updates the URL hash without a jump.
export function scrollToAnchor(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
): void {
  event.preventDefault();

  const target = document.querySelector(href);
  if (!(target instanceof HTMLElement)) {
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.replaceState(null, "", href);
    }
    return;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", href);
}
