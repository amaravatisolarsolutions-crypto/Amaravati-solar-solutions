import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  Settings2,
  Home,
  Headphones,
} from "lucide-react";

import heroAmaravatiPanoramic from "@/assets/hero-amaravati-exact-panoramic.jpg";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white min-h-[500px] sm:min-h-[540px] md:min-h-[580px] lg:h-[590px] xl:h-[640px] 2xl:h-[690px] flex items-center border-b border-orange-100">
      
      {/* 1. SCENIC PANORAMA (EXACT USER IMAGE DIRECTLY — NO MODIFICATIONS, NO BLUR) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden select-none">
        <img
          src={heroAmaravatiPanoramic}
          alt="Amaravati Solar Solutions — Clean Solar Energy across Amaravati and Andhra Pradesh"
          width={1024}
          height={394}
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover object-[72%_top] sm:object-[72%_top] lg:object-[72%_top]"
        />
        {/* Soft white gradient on the left for text legibility, keeping right half 100% natural */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-7/12 bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none" />
      </div>

      {/* 2. DYNAMIC BOTTOM-LEFT ACCENT SWOOP (EXACT ORANGE & NAVY ACCENT CURVES MATCHING REFERENCE) */}
      <div className="absolute bottom-0 left-0 w-72 sm:w-80 md:w-96 lg:w-[460px] pointer-events-none z-10 select-none">
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
      <div className="container-site relative z-10 py-8 sm:py-10 md:py-12 lg:py-14 w-full">
        <div className="max-w-2xl lg:max-w-xl xl:max-w-2xl flex flex-col justify-center text-left">
          
          {/* Eyebrow: — CLEAN ENERGY | BRIGHTER TOMORROW */}
          <div className="inline-flex items-center gap-2 self-start mb-3 sm:mb-3.5">
            <span className="w-6 h-[2.5px] bg-[#E04F16] rounded-full inline-block" />
            <span className="text-[11px] sm:text-xs md:text-[13px] font-extrabold uppercase tracking-[0.22em] text-[#082B4C] flex items-center gap-2">
              <span>CLEAN ENERGY</span>
              <span className="text-slate-400 font-light">|</span>
              <span>BRIGHTER TOMORROW</span>
            </span>
          </div>

          {/* Monumental 2-Tone Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[54px] font-black tracking-tight leading-[1.1] text-[#082B4C]">
            <span className="block drop-shadow-sm">Powering Amaravati with</span>
            <span className="block mt-1 sm:mt-1.5 text-transparent bg-clip-text bg-gradient-to-r from-[#D9410E] via-[#E04F16] to-[#F97316] drop-shadow-[0_2px_12px_rgba(224,79,22,0.25)]">
              Clean Solar Energy
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-[17px] text-slate-700 leading-relaxed font-semibold max-w-lg drop-shadow-sm">
            Smart, reliable solar solutions for homes and businesses across Andhra Pradesh.
          </p>

          {/* 2 Action Buttons Side-by-Side */}
          <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
            
            {/* Primary Button: Solid Deep Navy Blue Pill */}
            <Link
              to="/solar-solutions"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#082B4C] hover:bg-[#E04F16] text-white px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold shadow-[0_4px_16px_rgba(8,43,76,0.35)] hover:shadow-lg active:scale-95 transition-all select-none"
            >
              <span>Explore Solar Solutions</span>
              <ArrowRight className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            {/* Secondary Button: Terracotta Orange Pill with Calendar Icon */}
            <Link
              to="/book-a-demo"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D9410E] via-[#E04F16] to-[#F97316] hover:from-[#C03507] hover:to-[#D9410E] text-white px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold shadow-[0_4px_16px_rgba(224,79,22,0.35)] hover:shadow-lg active:scale-95 transition-all select-none"
            >
              <Calendar className="size-4 text-white shrink-0" />
              <span>Get Free Consultation</span>
            </Link>
          </div>

          {/* 3 Feature Badges Beneath Buttons */}
          <div className="mt-7 sm:mt-8 pt-4 sm:pt-5 border-t border-slate-200/90 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl">
            
            {/* Badge 1: End-to-End Solar Support */}
            <div className="flex items-center gap-2.5 group">
              <div className="grid size-9 sm:size-10 place-items-center rounded-full bg-orange-100/90 border border-orange-200 text-[#E04F16] shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <Settings2 className="size-4.5 text-[#E04F16]" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs sm:text-[13px] font-bold text-[#082B4C] leading-snug">
                  End-to-End Solar Support
                </span>
              </div>
            </div>

            {/* Badge 2: Residential & Commercial */}
            <div className="flex items-center gap-2.5 group">
              <div className="grid size-9 sm:size-10 place-items-center rounded-full bg-sky-100/90 border border-sky-200 text-[#082B4C] shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <Home className="size-4.5 text-[#082B4C]" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs sm:text-[13px] font-bold text-[#082B4C] leading-snug">
                  Residential &amp; Commercial
                </span>
              </div>
            </div>

            {/* Badge 3: Installation to After-Sales Service */}
            <div className="flex items-center gap-2.5 group">
              <div className="grid size-9 sm:size-10 place-items-center rounded-full bg-amber-100/90 border border-amber-200 text-[#E04F16] shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <Headphones className="size-4.5 text-[#E04F16]" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs sm:text-[13px] font-bold text-[#082B4C] leading-snug">
                  Installation to After-Sales Service
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}