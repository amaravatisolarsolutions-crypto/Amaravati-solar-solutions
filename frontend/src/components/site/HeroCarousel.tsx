import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import heroBannerMain from "@/assets/hero-banner-main.png";
import commercial from "@/assets/hero-commercial.jpg";
import industrial from "@/assets/hero-industrial.jpg";
import future from "@/assets/hero-future.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Cta = { label: string; to: "/contact" | "/services" | "/book-a-demo" };
const SLIDES: { tag: string; title: string; text: string; image: string; ctas: [Cta, Cta]; isCustomBanner?: boolean }[] = [
  {
    tag: "Complete Solar Solutions",
    title: "One Solar Partner for All Your Energy Needs",
    text: "Residential • Commercial • Industrial • Agricultural",
    image: heroBannerMain,
    ctas: [{ label: "Get a Free Site Assessment", to: "/book-a-demo" }, { label: "Our Solar Solutions", to: "/services" }],
    isCustomBanner: true,
  },
  { tag: "Commercial Solar", title: "Power Your Business with Solar.", text: "Reduce electricity expenses and move towards a smarter energy future.", image: commercial, ctas: [{ label: "Explore Commercial Solar", to: "/services" }, { label: "Book a Demo", to: "/book-a-demo" }] },
  { tag: "Industrial Solar", title: "Smarter Energy for a Stronger Industry.", text: "Scalable solar power solutions designed for industrial and manufacturing facilities.", image: industrial, ctas: [{ label: "Our Services", to: "/services" }, { label: "Request a Quote", to: "/contact" }] },
  { tag: "Sustainable Future", title: "Make the Switch to Solar.", text: "Discover a cleaner, more efficient way to power your everyday life.", image: future, ctas: [{ label: "Start Your Solar Journey", to: "/book-a-demo" }, { label: "Contact Us", to: "/contact" }] },
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const touchY = useRef<number | null>(null);

  const go = useCallback((i: number) => setIndex((i + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(index + 1), 5000);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  return (
    <section
      className="relative w-full aspect-[2/1] max-h-[calc(100svh-114px)] min-h-[220px] sm:min-h-[340px] md:min-h-[460px] overflow-hidden bg-[#e4f1fb] touch-pan-y select-none"
      aria-roledescription="carousel"
      aria-label="Solar solutions"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        const touch = e.touches[0];
        if (touch) {
          touchX.current = touch.clientX;
          touchY.current = touch.clientY;
        }
      }}
      onTouchEnd={(e) => {
        if (touchX.current == null || touchY.current == null) return;
        const touch = e.changedTouches[0];
        if (!touch) return;
        const dx = touch.clientX - touchX.current;
        const dy = touch.clientY - touchY.current;
        // Prioritize horizontal swipe over vertical scrolling
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 35) {
          go(index + (dx < 0 ? 1 : -1));
        }
        touchX.current = null;
        touchY.current = null;
      }}
    >
      {SLIDES.map((s, i) => (
        <div
          key={s.title}
          className={cn("absolute inset-0 transition-opacity duration-1000", i === index ? "opacity-100" : "pointer-events-none opacity-0")}
          aria-hidden={i !== index}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${SLIDES.length}`}
        >
          {s.isCustomBanner ? (
            <div className="relative h-full w-full flex items-center justify-center bg-[#e4f1fb] overflow-hidden [container-type:size]">
              {/* Crisp, undistorted banner fitting perfectly edge-to-edge */}
              <div
                className="relative flex items-center justify-center max-w-full max-h-full"
                style={{
                  width: "min(100cqw, calc(100cqh * 2))",
                  height: "min(100cqh, calc(100cqw / 2))",
                  aspectRatio: "2 / 1",
                }}
              >
                <img
                  src={s.image}
                  alt="One Solar Partner for All Your Energy Needs - Complete Solar Solutions"
                  width={1024}
                  height={512}
                  loading="eager"
                  className="h-full w-full object-contain pointer-events-auto select-none block"
                />
                
                {/* Interactive Hotspots for the two buttons drawn inside the banner */}
                <Link
                  to="/book-a-demo"
                  className="absolute cursor-pointer rounded-full transition-all hover:ring-2 hover:ring-white/80 hover:shadow-lg active:scale-95"
                  style={{
                    left: "4.69%",
                    top: "72.0%",
                    width: "23.34%",
                    height: "7.6%",
                  }}
                  title="Get a Free Site Assessment"
                  aria-label="Get a Free Site Assessment"
                />
                <Link
                  to="/services"
                  className="absolute cursor-pointer rounded-full transition-all hover:ring-2 hover:ring-[#082B4C]/50 hover:shadow-lg active:scale-95"
                  style={{
                    left: "29.59%",
                    top: "72.0%",
                    width: "17.00%",
                    height: "7.6%",
                  }}
                  title="Our Solar Solutions"
                  aria-label="Our Solar Solutions"
                />
              </div>
            </div>
          ) : (
            <>
              <img
                src={s.image}
                alt=""
                width={1920}
                height={1088}
                loading="lazy"
                className={cn("h-full w-full object-cover transition-transform duration-[6000ms] ease-out", i === index ? "scale-105" : "scale-100")}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/35 sm:bg-hero-overlay" />
              <div className="absolute inset-0 flex items-start pt-3 sm:pt-5 md:pt-6 lg:pt-8 pb-12 sm:pb-16">
                <div className="container-site px-4 sm:px-6">
                  {i === index && (
                    <div className="max-w-[320px] sm:max-w-2xl lg:max-w-3xl">
                      <p className="eyebrow animate-rise text-gold text-[10px] sm:text-xs md:text-sm font-extrabold uppercase tracking-widest">{s.tag}</p>
                      <h1 className="animate-rise mt-1 sm:mt-2 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.12] text-white" style={{ animationDelay: "80ms" }}>
                        {s.title}
                      </h1>
                      <p className="animate-rise mt-2 sm:mt-3 max-w-[300px] sm:max-w-xl text-xs sm:text-base md:text-lg text-white/90 leading-normal sm:leading-relaxed" style={{ animationDelay: "160ms" }}>
                        {s.text}
                      </p>
                      <div className="animate-rise mt-4 sm:mt-6 flex items-center gap-2.5 sm:gap-4" style={{ animationDelay: "240ms" }}>
                        <Button asChild variant="cta" className="h-9 sm:h-12 px-5 sm:px-7 text-xs sm:text-base font-bold rounded-[30px] bg-[#B83A16] hover:bg-[#A33112] text-white shadow-md hover:scale-105 active:scale-95 transition-all">
                          <Link to={s.ctas[0].to}>{s.ctas[0].label}</Link>
                        </Button>
                        <Button asChild variant="heroOutline" className="hidden sm:inline-flex h-12 px-7 text-base font-bold rounded-[30px] border-white/50 text-white backdrop-blur-sm hover:bg-[#A33112] hover:border-[#A33112] active:scale-95 transition-all">
                          <Link to={s.ctas[1].to}>{s.ctas[1].label}</Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-2 sm:bottom-4 lg:bottom-6 z-20 pointer-events-auto">
        <div className="container-site flex items-center justify-center sm:justify-between gap-4">
          <div className="flex items-center gap-1 sm:gap-2.5 bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
            {SLIDES.map((s, i) => (
              <button
                key={s.tag}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}: ${s.tag}`}
                aria-current={i === index}
                className={cn(
                  "group relative h-1 sm:h-1.5 overflow-hidden rounded-full transition-all duration-300 cursor-pointer",
                  i === index ? "w-4 sm:w-12 bg-white shadow-xs" : "w-1.5 sm:w-8 bg-white/40 hover:bg-white/70"
                )}
              >
                {i === index && (
                  <span key={`${index}-${paused}`} className={cn("absolute inset-0 bg-[#B83A16]", paused ? "" : "animate-progress")} />
                )}
              </button>
            ))}
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="grid size-9 place-items-center rounded-full border border-white/30 text-white bg-black/25 backdrop-blur-sm hover:bg-black/40 active:scale-90 transition-all cursor-pointer select-none shadow-sm"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="grid size-9 place-items-center rounded-full border border-white/30 text-white bg-black/25 backdrop-blur-sm hover:bg-black/40 active:scale-90 transition-all cursor-pointer select-none shadow-sm"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
