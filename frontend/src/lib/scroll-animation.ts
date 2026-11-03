/**
 * Autonomous, high-performance scroll animation controller for Rooftop Solar cards.
 * Triggers smooth right-to-left and left-to-right CSS transitions on both Text and Image
 * every time the cards enter the viewport, and resets silently when scrolled out of view.
 */
export function setupRooftopScrollAnimation() {
  if (typeof window === "undefined") return () => {};

  let ticking = false;

  const update = () => {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const cards = document.querySelectorAll<HTMLElement>("[data-rooftop-card]");

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      // Element is considered in-view when its top edge is inside viewport (vh - 50px)
      // and its bottom edge is still visible (greater than 40px above top).
      const inView = rect.top < vh - 40 && rect.bottom > 40;

      const items = card.querySelectorAll<HTMLElement>(".slide-rtl, .slide-ltr");
      items.forEach((item) => {
        if (inView) {
          item.classList.add("in-view");
        } else {
          item.classList.remove("in-view");
        }
      });
    });

    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };

  // Activate CSS animations on client
  document.body.classList.add("scroll-anim-ready");

  // Immediate check on mount and subsequent tick
  update();
  const t1 = setTimeout(update, 100);
  const t2 = setTimeout(update, 400);

  // Handler for explicit navigation trigger (e.g. from Amaravati Solar Solution dropdown)
  const onAnimateCard = (e: Event) => {
    const customEvent = e as CustomEvent<string>;
    const targetId = customEvent.detail;
    if (!targetId) return;

    const section = document.getElementById(targetId);
    if (!section) return;

    const card = section.querySelector<HTMLElement>("[data-rooftop-card]") || (section as HTMLElement);
    const items = card.querySelectorAll<HTMLElement>(".slide-rtl, .slide-ltr");

    // 1. Temporarily remove in-view to reset slide transition
    items.forEach((item) => {
      item.classList.remove("in-view");
    });
    card.classList.remove("rooftop-card-pop");

    // 2. Force DOM reflow
    void card.offsetWidth;

    // 3. Re-add in-view for smooth slide transition
    items.forEach((item) => {
      item.classList.add("in-view");
    });

    // 4. Trigger premium spring scale pop
    card.classList.add("rooftop-card-pop");

    setTimeout(() => {
      card.classList.remove("rooftop-card-pop");
    }, 1200);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  window.addEventListener("section-scrolled", onScroll);
  window.addEventListener("animate-rooftop-card", onAnimateCard);

  return () => {
    clearTimeout(t1);
    clearTimeout(t2);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    window.removeEventListener("section-scrolled", onScroll);
    window.removeEventListener("animate-rooftop-card", onAnimateCard);
  };
}

