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
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setMounted(true);
    const node = ref.current;
    if (!node) return;

    // Check if element is already within viewport on mount
    const rect = node.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < viewportHeight * 0.9 && rect.bottom > 0) {
      setIsVisible(true);
      setIsDone(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => setIsDone(true), 950);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(node);

    // Listen to header/navbar direct anchor scroll events
    const onSectionScrolled = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail && targetId && customEvent.detail === targetId) {
        setIsVisible(true);
        setTimeout(() => setIsDone(true), 950);
      }
    };
    window.addEventListener("section-scrolled", onSectionScrolled);

    return () => {
      observer.disconnect();
      window.removeEventListener("section-scrolled", onSectionScrolled);
    };
  }, [targetId]);

  // Server-side rendering fallback: keep fully visible for SEO & prerender
  if (!mounted) {
    return (
      <div ref={ref} className={cn("opacity-100 transform-none", className)}>
        {children}
      </div>
    );
  }

  // Once animation completes: remove transform & will-change for crisp rendering & zero GPU memory retention
  if (isDone) {
    return (
      <div ref={ref} className={cn("opacity-100 transform-none transition-none", className)}>
        {children}
      </div>
    );
  }

  // Animation classes
  // right-to-left: starts offset to the right (+translate-x), slides into 0
  // left-to-right: starts offset to the left (-translate-x), slides into 0
  const initialTransformClass =
    direction === "right-to-left"
      ? "translate-x-12 sm:translate-x-16"
      : "-translate-x-12 sm:-translate-x-16";

  return (
    <div
      ref={ref}
      style={{
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={cn(
        "transition-all duration-700 md:duration-850 will-change-[transform,opacity]",
        isVisible
          ? "opacity-100 translate-x-0"
          : cn("opacity-0", initialTransformClass),
        className
      )}
    >
      {children}
    </div>
  );
}
