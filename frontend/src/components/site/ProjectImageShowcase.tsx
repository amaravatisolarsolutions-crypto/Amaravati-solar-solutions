import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/site-data";
import { cn } from "@/lib/utils";

interface ProjectImageShowcaseProps {
  project: Project;
  onClose?: () => void;
  className?: string;
}

export function ProjectImageShowcase({
  project,
  onClose,
  className,
}: ProjectImageShowcaseProps) {
  const navigate = useNavigate();
  const images = project.images && project.images.length > 0 ? project.images : [project.image];
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      touchStartX.current = touch.clientX;
      touchStartY.current = touch.clientY;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const dx = touch.clientX - touchStartX.current;
    const dy = touch.clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 35) {
      if (dx < 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate({ to: "/projects" });
    }
  };

  // Format capacity badge like "75KWP" or "10KWP"
  const rawCapacity = (project.capacity?.split(" ")?.[0] || "").toUpperCase();
  const capacityBadge = rawCapacity.endsWith("KW") || rawCapacity.endsWith("KWP") || rawCapacity.endsWith("HP")
    ? rawCapacity
    : `${rawCapacity || "75"}KWP`;

  return (
    <div
      className={cn(
        "w-full rounded-2xl bg-white p-3 sm:p-4 shadow-sm border border-slate-200/90 transition-all",
        className
      )}
    >
      {/* 1. TOP HEADER */}
      <div className="flex items-start justify-between gap-3">
        <div>
          {/* Badges Row */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-md bg-[#fef3c7] px-2 py-0.5 text-[11px] font-black uppercase tracking-wider text-[#92400e] border border-amber-300/40">
              {capacityBadge}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-[#d1fae5] px-2 py-0.5 text-[11px] font-bold text-[#065f46]">
              <span className="font-bold">✓</span> Completed Project
            </span>
          </div>

          {/* Title */}
          <h2 className="mt-1.5 text-base sm:text-lg md:text-xl font-black text-[#0f2a1d] tracking-tight">
            {project.title}
          </h2>

          {/* Location */}
          <div className="mt-0.5 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <MapPin className="size-3 text-slate-400 shrink-0" />
            <span>{project.location}</span>
          </div>
        </div>

        {/* Top-Right Circular Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Back to projects"
          title="Back to projects"
          className="grid size-7 sm:size-8 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-90 transition-all cursor-pointer"
        >
          <X className="size-3.5" />
        </button>
      </div>

      {/* 2. MAIN DISPLAY FRAME */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative mt-2.5 sm:mt-3 overflow-hidden rounded-xl bg-slate-950 aspect-[16/10] sm:aspect-[16/9] max-h-[250px] sm:max-h-[280px] w-full flex items-center justify-center select-none shadow-sm touch-pan-y"
      >
        {/* Previous Button (<) */}
        <button
          type="button"
          onClick={prevImage}
          aria-label="Previous image"
          className="absolute left-2 sm:left-2.5 z-20 grid size-7 sm:size-8 place-items-center rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-sm transition-all hover:scale-105 active:scale-90 shadow-md cursor-pointer"
        >
          <ChevronLeft className="size-3.5 sm:size-4" />
        </button>

        {/* Active Large Image */}
        <img
          key={activeIndex}
          src={images[activeIndex]}
          alt={`${project.title} - view ${activeIndex + 1}`}
          className="h-full w-full object-cover transition-opacity duration-300 pointer-events-none"
        />

        {/* Next Button (>) */}
        <button
          type="button"
          onClick={nextImage}
          aria-label="Next image"
          className="absolute right-2 sm:right-2.5 z-20 grid size-7 sm:size-8 place-items-center rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-sm transition-all hover:scale-105 active:scale-90 shadow-md cursor-pointer"
        >
          <ChevronRight className="size-3.5 sm:size-4" />
        </button>

        {/* Counter Pill */}
        <div className="absolute bottom-2 right-2 z-20 rounded-md bg-black/80 backdrop-blur-md px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-white tracking-widest shadow-md">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* 3. THUMBNAILS ROW */}
      <div className="mt-2.5 sm:mt-3 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
        {images.map((img, i) => {
          const isActive = activeIndex === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`View photo ${i + 1}`}
              className={cn(
                "relative size-9 sm:size-10 overflow-hidden rounded-lg transition-all duration-200 cursor-pointer active:scale-95",
                isActive
                  ? "ring-2 ring-[#065f46] ring-offset-1 scale-105 shadow-sm opacity-100"
                  : "opacity-65 hover:opacity-100 hover:scale-102 border border-slate-200"
              )}
            >
              <img
                src={img}
                alt={`Thumbnail ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
