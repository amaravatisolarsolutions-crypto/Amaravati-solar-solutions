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
  el.classList.add("ring-4", "ring-primary/40", "transition-all", "duration-500");
  setTimeout(() => {
    el.classList.remove("ring-4", "ring-primary/40");
  }, 1800);

  return true;
}
