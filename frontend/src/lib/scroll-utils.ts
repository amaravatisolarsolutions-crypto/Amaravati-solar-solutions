export function scrollToTarget(targetId: string, updateHash = true, smooth = true) {
  const el = document.getElementById(targetId);
  if (!el) return false;

  // Accurately compute dynamic header clearance
  const headerEl = document.querySelector("header");
  let headerHeight = 80;
  if (headerEl) {
    headerHeight = headerEl.getBoundingClientRect().height || 80;
  }

  // Exact clearance: card starts directly below header with a neat ~6px gap
  const elementTop = el.getBoundingClientRect().top + window.scrollY;
  const targetY = Math.max(0, elementTop - headerHeight - 6);

  window.scrollTo({
    top: targetY,
    behavior: smooth ? "smooth" : "auto",
  });

  // Trigger custom event so SiteHeader updates activeSection immediately
  window.dispatchEvent(new CustomEvent("section-scrolled", { detail: targetId }));

  // Subtle pulse highlight animation on target card
  const cardEl = el.querySelector<HTMLElement>("[data-rooftop-card]") || el;
  cardEl.classList.add("ring-2", "ring-primary/40", "rounded-2xl", "transition-all", "duration-500");
  setTimeout(() => {
    cardEl.classList.remove("ring-2", "ring-primary/40", "rounded-2xl");
  }, 1800);

  return true;
}
