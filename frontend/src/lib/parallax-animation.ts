/**
 * Autonomous, high-performance Parallax and 3D Pop animation controller
 * Features:
 * 1. 60/120fps GPU-accelerated Parallax scroll transitions for images, backgrounds, and floating badges
 * 2. Interactive 3D Perspective Tilt on cards during mouse move (Desktop)
 * 3. Viewport-driven Pop & Spring reveals with staggered thresholds
 */

export function setupParallaxAndPopAnimation() {
  if (typeof window === "undefined") return () => {};

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let ticking = false;
  let activeTiltEl: HTMLElement | null = null;

  // 1. Scroll-driven Parallax and Pop updates
  const update = () => {
    const vh = window.innerHeight || document.documentElement.clientHeight;

    // A. Scroll-triggered Pop elements
    const popElements = document.querySelectorAll<HTMLElement>(".scroll-pop, [data-pop-scroll]");
    popElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < vh - 30 && rect.bottom > 30;
      if (inView) {
        el.classList.add("in-view");
      } else if (rect.top > vh + 120 || rect.bottom < -120) {
        // Reset when scrolled far away to re-trigger seamlessly
        el.classList.remove("in-view");
      }
    });

    // B. GPU-accelerated Multi-Layer Parallax Elements
    if (!prefersReducedMotion) {
      const parallaxEls = document.querySelectorAll<HTMLElement>("[data-parallax]");
      parallaxEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Only compute for elements near the visible viewport
        if (rect.bottom > -150 && rect.top < vh + 150) {
          const type = el.getAttribute("data-parallax") || "image";
          const rate = parseFloat(el.getAttribute("data-parallax-rate") || (type === "bg" ? "0.22" : type === "float" ? "-0.15" : "0.12"));
          const maxShift = parseFloat(el.getAttribute("data-parallax-max") || (type === "bg" ? "70" : type === "float" ? "45" : "38"));
          const centerOffset = rect.top + rect.height / 2 - vh / 2;
          const translateY = -(centerOffset * rate);
          const clampedY = Math.max(-maxShift, Math.min(maxShift, translateY));

          if (type === "image") {
            el.style.transform = `translate3d(0, ${clampedY.toFixed(1)}px, 0) scale(1.12)`;
          } else if (type === "bg") {
            el.style.transform = `translate3d(0, ${clampedY.toFixed(1)}px, 0) scale(1.06)`;
          } else if (type === "float") {
            el.style.transform = `translate3d(0, ${clampedY.toFixed(1)}px, 0)`;
          } else {
            el.style.transform = `translate3d(0, ${clampedY.toFixed(1)}px, 0)`;
          }
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

  // 2. Interactive 3D Perspective Tilt on Desktop (Makes cards feel alive and ultra-luxurious)
  const handleMouseMove = (e: MouseEvent) => {
    if (prefersReducedMotion || window.innerWidth < 1024) return;
    const target = (e.target as HTMLElement).closest<HTMLElement>(".parallax-card, [data-tilt='true']");
    
    if (activeTiltEl && activeTiltEl !== target) {
      activeTiltEl.style.transform = "";
      activeTiltEl = null;
    }

    if (target) {
      activeTiltEl = target;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4.5; // max 4.5deg for refined feel
      const rotateY = ((x - centerX) / centerX) * 4.5;
      target.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, -6px, 0)`;
    }
  };

  const handleMouseLeave = () => {
    if (activeTiltEl) {
      activeTiltEl.style.transform = "";
      activeTiltEl = null;
    }
  };

  // Mark body as ready for animation
  document.body.classList.add("scroll-anim-ready", "parallax-ready");

  // Initial runs
  update();
  const t1 = setTimeout(update, 80);
  const t2 = setTimeout(update, 250);

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  document.addEventListener("mousemove", handleMouseMove, { passive: true });
  document.addEventListener("mouseleave", handleMouseLeave, { passive: true });

  return () => {
    clearTimeout(t1);
    clearTimeout(t2);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseleave", handleMouseLeave);
    if (activeTiltEl) {
      activeTiltEl.style.transform = "";
      activeTiltEl = null;
    }
  };
}
