import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  IndianRupee,
  Leaf,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import heroAmaravatiPanoramic from "@/assets/hero-amaravati-exact-panoramic.jpg";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#041220] h-[calc(100vh-172px)] min-h-[420px] max-h-[490px] sm:max-h-[510px] lg:max-h-[530px] flex items-center border-b border-orange-200/90">
      
      {/* 1. ULTRA-HIGH RESOLUTION 4K BACKGROUND (KRISHNA RIVER, ICONIC BRIDGE, AMARAVATI SUNSET SKYLINE) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={heroAmaravatiPanoramic}
          alt="Amaravati Solar Solutions — Ultra-Wide Panoramic 4K Sunset over Krishna Riverfront, Iconic Bridge & Solar City"
          width={3840}
          height={2160}
          loading="eager"
          fetchPriority="high"
          data-parallax="bg"
          data-parallax-rate="0.18"
          data-parallax-max="50"
          className="w-full h-full object-cover object-[center_32%] lg:object-[62%_center] transition-transform duration-300 ease-out will-change-transform"
        />

        {/* Mobile / Tablet Gradient Overlay (Ensures 100% Text Contrast) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#041220]/95 via-[#061A2E]/80 to-[#041220]/35 lg:hidden pointer-events-none" />
      </div>

      {/* 2. DESKTOP DYNAMIC GEOMETRIC DARK BACKDROP WITH RADIANT ORANGE SWOOP ARC (BALANCED WIDTH TO PRESERVE BRIDGE & SUN) */}
      <div className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-1">
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1000 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Deep Cinematic Navy Gradient for Text Backing */}
            <linearGradient id="heroDarkBackdrop" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#041220" stopOpacity="0.98" />
              <stop offset="40%" stopColor="#061A2E" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#08233C" stopOpacity="0.88" />
              <stop offset="95%" stopColor="#0A2C4C" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0A2C4C" stopOpacity="0.0" />
            </linearGradient>

            {/* Radiant Vibrant Golden-Orange Contour Gradient */}
            <linearGradient id="heroOrangeContour" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFB300" stopOpacity="1" />
              <stop offset="35%" stopColor="#FF6A1A" stopOpacity="1" />
              <stop offset="80%" stopColor="#E04F16" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#D9410E" stopOpacity="0.8" />
            </linearGradient>

            {/* Glowing Neon Shadow Filter for Orange Arc */}
            <filter id="heroOrangeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Dark Mask on Left Covering Text Zone without encroaching on the bridge */}
          <path
            d="M 0 0 L 460 0 C 560 140, 550 340, 360 500 L 0 500 Z"
            fill="url(#heroDarkBackdrop)"
          />

          {/* Ambient Glow behind Orange Contour Arc */}
          <path
            d="M 460 0 C 560 140, 550 340, 360 500"
            stroke="#FF6A1A"
            strokeWidth="8"
            strokeOpacity="0.35"
            strokeLinecap="round"
            filter="url(#heroOrangeGlow)"
          />

          {/* Crisp Razor-Sharp Vibrant Orange Contour Swoosh Line */}
          <path
            d="M 460 0 C 560 140, 550 340, 360 500"
            stroke="url(#heroOrangeContour)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* 3. TOP-LEFT RADIANT SUN FLARE (EXACT REFERENCE, NEVER CROPPED, FULLY VISIBLE) */}
      <div className="absolute top-2 left-2 sm:top-3 sm:left-4 z-10 pointer-events-none">
        <div className="relative size-24 sm:size-28">
          {/* Outer Golden Glow */}
          <div className="absolute -top-6 -left-6 size-36 sm:size-40 rounded-full bg-gradient-to-br from-amber-400/40 via-orange-500/20 to-transparent blur-xl" />
          {/* Core Glowing Sun Disc */}
          <div className="absolute top-1 left-1 size-10 sm:size-12 rounded-full bg-gradient-to-br from-white via-amber-200 to-amber-400 shadow-[0_0_30px_rgba(255,190,40,0.95)] border border-amber-100" />
          {/* Concentric Halo Rings */}
          <div className="absolute top-0 left-0 size-16 sm:size-18 rounded-full border border-amber-300/40 bg-amber-400/10 blur-[0.5px]" />
          <div className="absolute -top-2 -left-2 size-22 sm:size-26 rounded-full border border-amber-400/20" />
          {/* Radiating Light Beams */}
          <div className="absolute top-6 left-6 w-32 h-0.5 bg-gradient-to-r from-amber-200/60 to-transparent rotate-35 blur-[0.5px]" />
          <div className="absolute top-6 left-6 w-28 h-0.5 bg-gradient-to-r from-amber-200/50 to-transparent rotate-60 blur-[0.5px]" />
          <div className="absolute top-6 left-6 w-24 h-0.5 bg-gradient-to-r from-amber-200/40 to-transparent rotate-15 blur-[0.5px]" />
        </div>
      </div>

      {/* 4. MAIN HERO CONTENT CONTAINER (COMPACT PADDING FOR PERFECT VIEWPORT FIT) */}
      <div className="container-site relative z-10 py-4 sm:py-5 lg:py-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center">
          
          {/* LEFT COLUMN: Eyebrow, Monumental Headline, Subtitle, Action Buttons */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center text-left">
            
            {/* Eyebrow Spaced Spans: SOLAR | SUSTAINABLE | AMARAVATI */}
            <div className="inline-flex items-center gap-2 self-start mb-2 sm:mb-2.5">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.26em] text-white/95 drop-shadow-sm flex items-center gap-2">
                <span className="text-white">SOLAR</span>
                <span className="text-amber-400 font-semibold">|</span>
                <span className="text-white">SUSTAINABLE</span>
                <span className="text-amber-400 font-semibold">|</span>
                <span className="text-amber-300 font-black">AMARAVATI</span>
              </span>
            </div>

            {/* Monumental 3-Line Two-Tone Headline (Crisply Scaled for Viewport Fit) */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[45px] font-black tracking-tight leading-[1.08] text-white">
              <span className="block drop-shadow-md">Powering</span>
              <span className="block drop-shadow-md mt-0.5">Amaravati with</span>
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#FFA238] via-[#FF6A1A] to-[#E04F16] drop-shadow-[0_4px_22px_rgba(255,106,26,0.5)]">
                Solar Energy
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-2 sm:mt-2.5 text-xs sm:text-[13px] md:text-sm text-white/90 leading-snug max-w-lg font-medium drop-shadow-sm">
              Reliable, affordable and future-ready solar solutions for a cleaner tomorrow across Andhra Pradesh.
            </p>

            {/* 2 Focused CTA Action Buttons */}
            <div className="mt-4 sm:mt-4.5 flex flex-wrap items-center gap-2.5 sm:gap-3">
              
              {/* Primary Button: Solid Vibrant Orange Pill */}
              <Link
                to="/solar-solutions"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D9410E] via-[#E04F16] to-[#F97316] hover:from-[#C03507] hover:to-[#D9410E] px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-[0_4px_16px_rgba(224,79,22,0.45)] hover:shadow-lg active:scale-95 transition-all select-none"
              >
                <span>Explore Plans</span>
                <ArrowRight className="size-3.5 sm:size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              {/* Secondary Button: Solid Navy Blue Pill with White Text */}
              <Link
                to="/book-a-demo"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#082B4C] hover:bg-[#0B3A68] text-white border border-[#1E4E80]/80 hover:border-sky-400/60 px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold shadow-[0_4px_14px_rgba(8,43,76,0.6)] hover:shadow-lg active:scale-95 transition-all select-none"
              >
                <span>Get a Free Quote</span>
              </Link>
            </div>

            {/* Mobile / Tablet Quick 4-Pill Strip (Only shown on small screens where right card wraps) */}
            <div className="mt-4 pt-3 border-t border-white/15 grid grid-cols-2 gap-2 lg:hidden">
              <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-white/90">
                <span className="size-1.5 rounded-full bg-amber-400" />
                <span>Clean Energy</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-white/90">
                <span className="size-1.5 rounded-full bg-orange-400" />
                <span>Lower Power Bills</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-white/90">
                <span className="size-1.5 rounded-full bg-amber-400" />
                <span>Long-Term Reliability</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-white/90">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                <span>Higher Savings</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: SLEEK COMPACT FLOATING GLASS CARD (PRESERVES BRIDGE & SUN VISIBILITY) */}
          <div className="lg:col-span-5 xl:col-span-5 hidden lg:flex items-center justify-end relative">
            
            <div
              data-parallax="float"
              data-parallax-rate="-0.15"
              data-parallax-max="30"
              className="parallax-card w-full max-w-[270px] xl:max-w-[290px] rounded-2xl bg-slate-950/40 border border-white/20 backdrop-blur-md shadow-[0_16px_40px_rgba(0,0,0,0.5)] p-3.5 xl:p-4 text-white relative overflow-hidden group cursor-default"
            >
              
              {/* Subtle Ambient Golden Glow Inside Card */}
              <div className="absolute top-0 right-0 -mr-8 -mt-8 size-28 rounded-full bg-gradient-to-br from-amber-400/20 via-orange-500/10 to-transparent blur-xl pointer-events-none" />

              <div className="space-y-2.5 relative z-1">
                
                {/* 1. Clean Energy */}
                <div className="flex items-center gap-2.5 group/item">
                  <div className="grid size-8 sm:size-9 place-items-center rounded-full bg-gradient-to-br from-amber-500/25 to-orange-500/15 border border-amber-400/50 text-amber-300 shrink-0 shadow-inner group-hover/item:scale-108 transition-transform">
                    <Leaf className="size-4 text-amber-300" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-[13px] font-black text-white tracking-tight leading-snug">
                      Clean Energy
                    </h4>
                    <p className="text-[10px] text-white/75 font-medium truncate">
                      100% Sustainable &amp; Green
                    </p>
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* 2. Lower Electricity Bills */}
                <div className="flex items-center gap-2.5 group/item">
                  <div className="grid size-8 sm:size-9 place-items-center rounded-full bg-gradient-to-br from-orange-500/25 to-amber-500/15 border border-orange-400/50 text-orange-400 shrink-0 shadow-inner group-hover/item:scale-108 transition-transform">
                    <IndianRupee className="size-4 text-orange-400" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-[13px] font-black text-white tracking-tight leading-snug">
                      Lower Electricity Bills
                    </h4>
                    <p className="text-[10px] text-white/75 font-medium truncate">
                      Save up to 90% Every Month
                    </p>
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* 3. Long-Term Reliability */}
                <div className="flex items-center gap-2.5 group/item">
                  <div className="grid size-8 sm:size-9 place-items-center rounded-full bg-gradient-to-br from-amber-500/25 to-orange-500/15 border border-amber-400/50 text-amber-300 shrink-0 shadow-inner group-hover/item:scale-108 transition-transform">
                    <ShieldCheck className="size-4 text-amber-300" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-[13px] font-black text-white tracking-tight leading-snug">
                      Long-Term Reliability
                    </h4>
                    <p className="text-[10px] text-white/75 font-medium truncate">
                      25-Year Performance Guarantee
                    </p>
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* 4. Higher Savings */}
                <div className="flex items-center gap-2.5 group/item">
                  <div className="grid size-8 sm:size-9 place-items-center rounded-full bg-gradient-to-br from-emerald-500/25 to-teal-500/15 border border-emerald-400/50 text-emerald-300 shrink-0 shadow-inner group-hover/item:scale-108 transition-transform">
                    <TrendingUp className="size-4 text-emerald-300" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-[13px] font-black text-white tracking-tight leading-snug">
                      Higher Savings
                    </h4>
                    <p className="text-[10px] text-white/75 font-medium truncate">
                      Fast 3-Yr ROI + ₹78,000 Subsidy
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
