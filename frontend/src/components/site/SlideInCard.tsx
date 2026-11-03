import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

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

    // Check if element is already within viewport on initial client mount
    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh * 0.85 && rect.bottom > 0) {
      setIsVisible(true);
    }

    // Continuous bidirectional IntersectionObserver:
    // Triggers smooth slide-in every time the card scrolls into view,
    // and resets silently when the card is completely outside the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.04) {
            setIsVisible(true);
          } else if (!entry.isIntersecting || entry.intersectionRatio === 0) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: [0, 0.05],
        rootMargin: "0px",
      }
    );

    observer.observe(node);

    // Header/navbar direct anchor scroll event support
    const onSectionScrolled = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail && targetId && customEvent.detail === targetId) {
        setIsVisible(true);
      }
    };
    window.addEventListener("section-scrolled", onSectionScrolled);

    return () => {
      observer.disconnect();
      window.removeEventListener("section-scrolled", onSectionScrolled);
    };
  }, [targetId]);

  // Server-side rendering / Prerender fallback: keep fully visible for SEO & prerender
  if (!mounted) {
    return (
      <div ref={containerRef} className={cn("overflow-x-clip w-full", className)}>
        <div className="opacity-100 transform-none">{children}</div>
      </div>
    );
  }

  // Animation offsets:
  // right-to-left: starts offset to the right (+X), slides in smoothly to the left
  // left-to-right: starts offset to the left (-X), slides in smoothly to the right
  const offsetClass =
    direction === "right-to-left"
      ? "translate-x-12 sm:translate-x-16 md:translate-x-20"
      : "-translate-x-12 sm:-translate-x-16 md:-translate-x-20";

  return (
    <div ref={containerRef} className={cn("overflow-x-clip w-full", className)}>
      <div
        style={{
          transitionProperty: "transform, opacity",
          transitionDuration: "800ms",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className={cn(
          "will-change-[transform,opacity] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none",
          isVisible
            ? "opacity-100 translate-x-0"
            : cn("opacity-0 pointer-events-none", offsetClass)
        )}
      >
        {children}
      </div>
    </div>
  );
}
