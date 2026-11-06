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

  // Dynamic hotspot synchronization for object-cover image
  const bannerContainerRef = useRef<HTMLDivElement>(null);
  const [hotspots, setHotspots] = useState<{
    b1: { left: string; top: string; width: string; height: string };
    b2: { left: string; top: string; width: string; height: string };
  }>({
    b1: { left: "7.27%", top: "71.22%", width: "22.17%", height: "7.03%" },
    b2: { left: "30.60%", top: "71.22%", width: "15.26%", height: "7.03%" },
  });

  useEffect(() => {
    const el = bannerContainerRef.current;
    if (!el) return;

    const updateHotspots = () => {
      const cw = el.clientWidth;
      const ch = el.clientHeight;
      if (!cw || !ch) return;

      const imgW = 1376;
      const imgH = 768;
      const imgRatio = imgW / imgH;
      const containerRatio = cw / ch;

      let renderW: number;
      let renderH: number;
      let offsetX: number;
      let offsetY: number;

      if (containerRatio > imgRatio) {
        // Container is wider than 16:9: scaled by width, cropped vertically
        renderW = cw;
        renderH = cw / imgRatio;
        offsetX = 0;
        offsetY = (ch - renderH) / 2;
      } else {
        // Container is narrower: scaled by height, cropped horizontally
        renderH = ch;
        renderW = ch * imgRatio;
        offsetY = 0;
        offsetX = (cw - renderW) / 2;
      }

      // Button 1 at 1x in 1376x768: x=100, y=547, w=305, h=54
      const b1Left = ((offsetX + (100 / imgW) * renderW) / cw) * 100;
      const b1Top = ((offsetY + (547 / imgH) * renderH) / ch) * 100;
      const b1Width = (((305 / imgW) * renderW) / cw) * 100;
      const b1Height = (((54 / imgH) * renderH) / ch) * 100;

      // Button 2 at 1x in 1376x768: x=421, y=547, w=210, h=54
      const b2Left = ((offsetX + (421 / imgW) * renderW) / cw) * 100;
      const b2Top = ((offsetY + (547 / imgH) * renderH) / ch) * 100;
      const b2Width = (((210 / imgW) * renderW) / cw) * 100;
      const b2Height = (((54 / imgH) * renderH) / ch) * 100;

      setHotspots({
        b1: {
          left: `${b1Left.toFixed(2)}%`,
          top: `${b1Top.toFixed(2)}%`,
          width: `${b1Width.toFixed(2)}%`,
          height: `${b1Height.toFixed(2)}%`,
        },
        b2: {
          left: `${b2Left.toFixed(2)}%`,
          top: `${b2Top.toFixed(2)}%`,
          width: `${b2Width.toFixed(2)}%`,
          height: `${b2Height.toFixed(2)}%`,
        },
      });
    };

    updateHotspots();
    const ro = new ResizeObserver(updateHotspots);
    ro.observe(el);
    window.addEventListener("resize", updateHotspots);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateHotspots);
    };
  }, []);

  const go = useCallback((i: number) => setIndex((i + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(index + 1), 5000);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  return (
    <section
      className="relative w-full aspect-[16/9] sm:h-[calc(100svh-114px)] sm:max-h-[820px] min-h-[220px] sm:min-h-[460px] overflow-hidden bg-navy touch-pan-y select-none"
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
            <div ref={bannerContainerRef} className="relative h-full w-full overflow-hidden select-none bg-navy">
              {/* Seamless, edge-to-edge widescreen banner with perfect screen fit */}
              <img
                src={s.image}
                alt="One Solar Partner for All Your Energy Needs - Complete Solar Solutions"
                width={1376}
                height={768}
                loading="eager"
                className="h-full w-full object-cover pointer-events-auto select-none"
              />
              
              {/* Interactive Hotspots for the two buttons drawn inside the banner */}
              <Link
                to="/book-a-demo"
                className="absolute cursor-pointer rounded-full transition-all hover:ring-2 hover:ring-white/80 hover:shadow-lg active:scale-95 z-10"
                style={{
                  left: hotspots.b1.left,
                  top: hotspots.b1.top,
                  width: hotspots.b1.width,
                  height: hotspots.b1.height,
                }}
                title="Get a Free Site Assessment"
                aria-label="Get a Free Site Assessment"
              />
              <Link
                to="/services"
                className="absolute cursor-pointer rounded-full transition-all hover:ring-2 hover:ring-[#0B2B4C]/50 hover:shadow-lg active:scale-95 z-10"
                style={{
                  left: hotspots.b2.left,
                  top: hotspots.b2.top,
                  width: hotspots.b2.width,
                  height: hotspots.b2.height,
                }}
                title="Our Solar Solutions"
                aria-label="Our Solar Solutions"
              />
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
                <div className="container-site">
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
