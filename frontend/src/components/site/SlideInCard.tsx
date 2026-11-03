import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SlideInContextType {
  isVisible: boolean;
  direction: "right-to-left" | "left-to-right";
}

const SlideInContext = createContext<SlideInContextType>({
  isVisible: false,
  direction: "right-to-left",
});

export function useSlideIn() {
  return useContext(SlideInContext);
}

interface SlideInCardProps {
  direction: "right-to-left" | "left-to-right";
  children: ReactNode;
  className?: string;
  targetId?: string;
}

export function SlideInCard({
  direction,
  children,
  className = "",
  targetId,
}: SlideInCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const node = containerRef.current;
    if (!node) return;

    let rafId: number | null = null;

    const updateVisibility = () => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      // An element enters view when its top edge is inside the viewport (vh - 50px)
      // and resets when it is completely out of the viewport (either above or below).
      const inView = rect.top < vh - 50 && rect.bottom > 50;
      setIsVisible(inView);
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateVisibility();
        rafId = null;
      });
    };

    // Run check immediately on mount and on the following frame
    updateVisibility();
    const timer = setTimeout(updateVisibility, 150);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Anchor navigation click trigger
    const onSectionScrolled = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail && targetId && customEvent.detail === targetId) {
        setIsVisible(true);
      }
    };
    window.addEventListener("section-scrolled", onSectionScrolled);

    return () => {
      clearTimeout(timer);
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("section-scrolled", onSectionScrolled);
    };
  }, [targetId]);

  // SSR / Prerender fallback: keep fully visible for SEO & prerender crawlers
  if (!mounted) {
    return (
      <SlideInContext.Provider value={{ isVisible: true, direction }}>
        <div ref={containerRef} className={cn("overflow-x-clip w-full", className)}>
          <div className="opacity-100 transform-none">{children}</div>
        </div>
      </SlideInContext.Provider>
    );
  }

  return (
    <SlideInContext.Provider value={{ isVisible, direction }}>
      <div ref={containerRef} className={cn("overflow-x-clip w-full", className)}>
        {children}
      </div>
    </SlideInContext.Provider>
  );
}

export function SlideInItem({
  children,
  className = "",
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const { isVisible, direction } = useSlideIn();

  // Offset distance:
  // right-to-left: starts offset to the right (+X), glides left to 0
  // left-to-right: starts offset to the left (-X), glides right to 0
  const offsetClass =
    direction === "right-to-left"
      ? "translate-x-12 sm:translate-x-16 md:translate-x-20"
      : "-translate-x-12 sm:-translate-x-16 md:-translate-x-20";

  return (
    <div
      style={{
        transitionProperty: "transform, opacity",
        transitionDuration: "800ms",
        transitionDelay: `${delayMs}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={cn(
        "will-change-[transform,opacity] transition-all motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none",
        isVisible
          ? "opacity-100 translate-x-0"
          : cn("opacity-0 pointer-events-none", offsetClass),
        className
      )}
    >
      {children}
    </div>
  );
}
