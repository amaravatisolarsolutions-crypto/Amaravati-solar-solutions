/**
 * Autonomous, high-performance Pop and Parallax animation controller
 * Supports:
 * 1. Scroll-triggered Pop animations (triggers every time elements enter viewport)
 * 2. GPU-accelerated Parallax scroll transitions for images and accent cards
 * 3. Filter change and dynamic view pop resets
 */
export function setupParallaxAndPopAnimation() {
  if (typeof window === "undefined") return () => {};

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let ticking = false;

  const update = () => {
    const vh = window.innerHeight || document.documentElement.clientHeight;

    // 1. Scroll-triggered Pop elements
    const popElements = document.querySelectorAll<HTMLElement>(".scroll-pop, [data-pop-scroll]");
    popElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < vh - 40 && rect.bottom > 40;
      if (inView) {
        el.classList.add("in-view");
      } else {
        el.classList.remove("in-view");
      }
    });

    // 2. Parallax elements
    if (!prefersReducedMotion) {
      const parallaxEls = document.querySelectorAll<HTMLElement>("[data-parallax]");
      parallaxEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom > -100 && rect.top < vh + 100) {
          const rate = parseFloat(el.getAttribute("data-parallax-rate") || "0.1");
          const centerOffset = rect.top + rect.height / 2 - vh / 2;
          const translateY = -(centerOffset * rate);
          const clampedY = Math.max(-36, Math.min(36, translateY));
          el.style.transform = `translate3d(0, ${clampedY.toFixed(1)}px, 0) scale(1.08)`;
        }
      });
    }

    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };

  // Mark body as ready for animation
  document.body.classList.add("scroll-anim-ready", "parallax-ready");

  // Initial runs
  update();
  const t1 = setTimeout(update, 80);
  const t2 = setTimeout(update, 300);

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  return () => {
    clearTimeout(t1);
    clearTimeout(t2);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  };
}
