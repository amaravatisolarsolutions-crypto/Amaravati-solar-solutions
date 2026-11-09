import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  Settings2,
  Home,
  Factory,
} from "lucide-react";

import heroAmaravatiPanoramic from "@/assets/hero-amaravati-exact-panoramic.jpg";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white min-h-[380px] sm:min-h-[420px] lg:min-h-0 lg:h-[calc(100vh-180px)] xl:h-[calc(100vh-186px)] 2xl:h-[calc(100vh-192px)] flex items-center border-b border-orange-100">
      
      {/* 1. SCENIC PANORAMA (EXACT USER IMAGE DIRECTLY — NO MODIFICATIONS, NO BLUR) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden select-none">
        <img
          src={heroAmaravatiPanoramic}
          alt="Amaravati Solar Solutions — Clean Solar Energy across Amaravati, Andhra Pradesh and beyond"
          width={1024}
          height={394}
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover object-[72%_center] sm:object-[72%_center] lg:object-[74%_center]"
        />
        {/* Light Glassmorphism shade on left — translucent frosted glass with soft blur (photo visible through glass, not solid white) */}
        <div
          className="absolute inset-y-0 left-0 w-full sm:w-10/12 md:w-8/12 lg:w-7/12 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.60) 0%, rgba(255,255,255,0.38) 50%, rgba(255,255,255,0.12) 80%, rgba(255,255,255,0) 100%)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            maskImage:
              "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>

      {/* 2. DYNAMIC BOTTOM-LEFT ACCENT SWOOP (EXACT ORANGE & NAVY ACCENT CURVES MATCHING REFERENCE) */}
      <div className="absolute bottom-0 left-0 w-60 sm:w-72 md:w-80 lg:w-[420px] pointer-events-none z-10 select-none">
        <svg
          viewBox="0 0 460 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          {/* Orange Accent Curve (#E04F16) */}
          <path
            d="M 0 48 C 140 48, 280 24, 460 58"
            stroke="#E04F16"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Deep Navy Accent Curve (#082B4C) */}
          <path
            d="M 0 55 C 140 55, 280 31, 460 64"
            stroke="#082B4C"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {/* 2. MAIN HERO CONTENT CONTAINER (EXACT VECTOR TYPOGRAPHY & BUTTONS) */}
      <div className="container-site relative z-10 py-2.5 sm:py-3 lg:py-2.5 xl:py-4 2xl:py-6 w-full">
        <div className="max-w-2xl lg:max-w-xl xl:max-w-2xl flex flex-col justify-center text-left">
          
          {/* Eyebrow: — ENERGY WITHOUT LIMITS. PROGRESS WITHOUT BOUNDARIES. */}
          <div className="inline-flex items-center gap-2 self-start mb-1.5 sm:mb-2 lg:mb-1.5 xl:mb-2.5">
            <span className="w-5 sm:w-6 h-[2.5px] bg-[#E04F16] rounded-full inline-block" />
            <span className="text-[10px] sm:text-[11px] xl:text-[12px] font-extrabold uppercase tracking-[0.16em] text-[#082B4C]">
              ENERGY WITHOUT LIMITS. PROGRESS WITHOUT BOUNDARIES.
            </span>
          </div>

          {/* Monumental 2-Tone Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-[30px] xl:text-[40px] 2xl:text-[48px] font-black tracking-tight leading-[1.12] text-[#082B4C]">
            <span className="block drop-shadow-xs">Turning Sunlight into</span>
            <span className="block mt-0.5 sm:mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#D9410E] via-[#E04F16] to-[#F97316] drop-shadow-[0_2px_10px_rgba(224,79,22,0.25)]">
              Something Greater.
            </span>
          </h1>

          {/* 2 Action Buttons Side-by-Side */}
          <div className="mt-3.5 sm:mt-4 lg:mt-3 xl:mt-4 flex flex-wrap items-center gap-2 sm:gap-2.5">
            
            {/* Primary Button: Solid Deep Navy Blue Pill */}
            <Link
              to="/solar-solutions"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#082B4C] hover:bg-[#E04F16] text-white px-3.5 sm:px-4.5 py-1.5 sm:py-2 text-xs sm:text-[12px] font-bold shadow-[0_4px_14px_rgba(8,43,76,0.3)] hover:shadow-lg active:scale-95 transition-all select-none"
            >
              <span>Explore Solar Solutions</span>
              <ArrowRight className="size-3.5 sm:size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            {/* Secondary Button: Terracotta Orange Pill with Calendar Icon */}
            <Link
              to="/book-a-demo"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D9410E] via-[#E04F16] to-[#F97316] hover:from-[#C03507] hover:to-[#D9410E] text-white px-3.5 sm:px-4.5 py-1.5 sm:py-2 text-xs sm:text-[12px] font-bold shadow-[0_4px_14px_rgba(224,79,22,0.3)] hover:shadow-lg active:scale-95 transition-all select-none"
            >
              <Calendar className="size-3.5 sm:size-4 text-white shrink-0" />
              <span>Get Free Consultation</span>
            </Link>
          </div>

          {/* 3 Feature Badges Beneath Buttons */}
          <div className="mt-3 sm:mt-3.5 lg:mt-2.5 xl:mt-3.5 pt-2 sm:pt-2.5 border-t border-slate-200/90 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 lg:gap-2 xl:gap-3 max-w-xl">
            
            {/* Badge 1: End-to-End Solar Support */}
            <div className="flex items-center gap-1.5 sm:gap-2 group">
              <div className="grid size-6.5 sm:size-7 xl:size-7.5 place-items-center rounded-full bg-orange-100/90 border border-orange-200 text-[#E04F16] shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Settings2 className="size-3.5 xl:size-3.5 text-[#E04F16]" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] sm:text-[10.5px] xl:text-[11.5px] font-bold text-[#082B4C] leading-snug">
                  End-to-End Solar Support
                </span>
              </div>
            </div>

            {/* Badge 2: Residential & Commercial */}
            <div className="flex items-center gap-1.5 sm:gap-2 group">
              <div className="grid size-6.5 sm:size-7 xl:size-7.5 place-items-center rounded-full bg-sky-100/90 border border-sky-200 text-[#082B4C] shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Home className="size-3.5 xl:size-3.5 text-[#082B4C]" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] sm:text-[10.5px] xl:text-[11.5px] font-bold text-[#082B4C] leading-snug">
                  Residential &amp; Commercial
                </span>
              </div>
            </div>

            {/* Badge 3: Industrial Solar Solutions */}
            <div className="flex items-center gap-1.5 sm:gap-2 group">
              <div className="grid size-6.5 sm:size-7 xl:size-7.5 place-items-center rounded-full bg-amber-100/90 border border-amber-200 text-[#E04F16] shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Factory className="size-3.5 xl:size-3.5 text-[#E04F16]" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] sm:text-[10.5px] xl:text-[11.5px] font-bold text-[#082B4C] leading-snug">
                  Industrial Solar Solutions
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}