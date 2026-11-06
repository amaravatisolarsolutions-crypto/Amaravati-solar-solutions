import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  Headphones,
  Home,
  Settings,
  ShieldCheck,
  TrendingDown,
  Sparkles,
  Zap,
} from "lucide-react";

import heroSunriseClassic from "@/assets/hero-sunrise-classic.jpg";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FFF8F0] to-[#FFF4E5] border-b border-orange-100/80">
      {/* Ambient Sunburst & Atmospheric Glows */}
      <div className="absolute top-0 right-1/4 -z-10 size-[420px] rounded-full bg-gradient-to-br from-amber-400/20 via-orange-400/15 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 -z-10 size-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      {/* Main Hero Container */}
      <div className="container-site pt-5 sm:pt-7 md:pt-9 lg:pt-10 pb-4 sm:pb-6 md:pb-8">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-8 xl:gap-12 items-center">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: Headings, Value Proposition, Action CTAs & Trust Badges */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            
            {/* Top Eyebrow Tag with Vibrant Orange Line */}
            <div className="inline-flex items-center gap-2.5 self-start">
              <span className="h-1 w-6 sm:w-8 rounded-full bg-[#E04F16]" />
              <span className="text-[10px] sm:text-[11px] md:text-xs font-black uppercase tracking-[0.2em] text-[#0B2545]">
                CLEAN ENERGY &nbsp;|&nbsp; BRIGHTER TOMORROW
              </span>
            </div>

            {/* High-Impact Main Heading */}
            <h1 className="mt-2.5 sm:mt-3 text-3xl sm:text-4xl md:text-[40px] lg:text-[42px] xl:text-[48px] font-black tracking-tight leading-[1.12]">
              <span className="block text-[#0B2545]">Powering Amaravati with</span>
              <span className="block bg-gradient-to-r from-[#D9410E] via-[#E04F16] to-[#F97316] bg-clip-text text-transparent mt-1">
                Clean Solar Energy
              </span>
            </h1>

            {/* Subtitle / Description */}
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-[#475569] leading-relaxed max-w-xl font-medium">
              Smart, reliable solar solutions for homes and businesses across Andhra Pradesh.
            </p>

            {/* Action CTA Buttons */}
            <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Primary Button: Explore Solar Solutions */}
              <Link
                to="/services"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#084B9E] hover:bg-[#063875] px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-bold text-white shadow-[0_6px_20px_rgba(8,75,158,0.28)] hover:shadow-lg hover:shadow-blue-900/20 active:scale-95 transition-all cursor-pointer select-none"
              >
                <span>Explore Solar Solutions</span>
                <ArrowRight className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              {/* Secondary Button: Get Free Consultation */}
              <Link
                to="/book-a-demo"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D9410E] via-[#E04F16] to-[#F05A24] hover:from-[#C03507] hover:to-[#D9410E] px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-bold text-white shadow-[0_6px_20px_rgba(224,79,22,0.35)] hover:shadow-lg hover:shadow-orange-600/30 active:scale-95 transition-all cursor-pointer select-none"
              >
                <Calendar className="size-4 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                <span>Get Free Consultation</span>
              </Link>
            </div>

            {/* 3 Core Trust Badges with Dividers */}
            <div className="mt-6 sm:mt-7 pt-4 sm:pt-5 border-t border-slate-200/90">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2 md:gap-3 items-center">
                
                {/* Feature 1 */}
                <div className="flex items-center gap-2.5">
                  <div className="grid size-8 sm:size-9 place-items-center rounded-full bg-[#E04F16]/10 text-[#E04F16] shrink-0 border border-[#E04F16]/20 shadow-2xs">
                    <Settings className="size-4 sm:size-4.5" />
                  </div>
                  <span className="text-[11px] sm:text-xs md:text-[13px] font-extrabold text-[#0B2545] leading-tight">
                    End-to-End Solar Support
                  </span>
                </div>

                {/* Feature 2 */}
                <div className="flex items-center gap-2.5 sm:border-l sm:border-slate-300 sm:pl-2.5 md:pl-3">
                  <div className="grid size-8 sm:size-9 place-items-center rounded-full bg-[#084B9E]/10 text-[#084B9E] shrink-0 border border-[#084B9E]/20 shadow-2xs">
                    <Home className="size-4 sm:size-4.5" />
                  </div>
                  <span className="text-[11px] sm:text-xs md:text-[13px] font-extrabold text-[#0B2545] leading-tight">
                    Residential & Commercial
                  </span>
                </div>

                {/* Feature 3 */}
                <div className="flex items-center gap-2.5 sm:border-l sm:border-slate-300 sm:pl-2.5 md:pl-3">
                  <div className="grid size-8 sm:size-9 place-items-center rounded-full bg-[#E04F16]/10 text-[#E04F16] shrink-0 border border-[#E04F16]/20 shadow-2xs">
                    <Headphones className="size-4 sm:size-4.5" />
                  </div>
                  <span className="text-[11px] sm:text-xs md:text-[13px] font-extrabold text-[#0B2545] leading-tight">
                    Installation to After-Sales Service
                  </span>
                </div>

              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Ultra-Premium Sun-Drenched Showcase Visual with Floating Trust Cards */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 xl:col-span-6 w-full flex items-center justify-center relative">
            
            {/* The Main Hero Visual Showcase Card */}
            <div className="relative w-full h-[260px] sm:h-[340px] md:h-[390px] lg:h-[410px] xl:h-[450px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(224,79,22,0.16)] border border-orange-200/60 group transition-all duration-300">
              
              <img
                src={heroSunriseClassic}
                alt="Amaravati Solar Solutions — Rooftop Solar with Dhyana Buddha & Krishna River at Sunrise"
                width={1920}
                height={1080}
                loading="eager"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
              />

              {/* Natural Warm Sun Flare Vignette */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B2545]/30 via-transparent to-amber-500/10" />

              {/* Top-Right Floating Trust Badge: PM Surya Ghar Subsidy */}
              <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10 flex items-center gap-2 rounded-xl bg-white/95 backdrop-blur-md px-3 py-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.12)] border border-white/80 animate-fade-in">
                <div className="grid size-6 sm:size-7 place-items-center rounded-lg bg-emerald-500/15 text-emerald-600 shrink-0">
                  <Zap className="size-3.5 sm:size-4 fill-emerald-500" />
                </div>
                <div>
                  <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                    PM Surya Ghar
                  </div>
                  <div className="text-[11px] sm:text-xs font-black text-emerald-700 leading-none">
                    Up to ₹78,000 Subsidy
                  </div>
                </div>
              </div>

              {/* Bottom-Left Floating Trust Badge: 90% Bill Savings */}
              <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 z-10 flex items-center gap-2.5 rounded-xl bg-white/95 backdrop-blur-md px-3 py-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.12)] border border-white/80">
                <div className="grid size-6 sm:size-7 place-items-center rounded-lg bg-orange-500/15 text-[#E04F16] shrink-0">
                  <TrendingDown className="size-3.5 sm:size-4" />
                </div>
                <div>
                  <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                    AP Net-Metering
                  </div>
                  <div className="text-[11px] sm:text-xs font-black text-[#D9410E] leading-none">
                    Save Up to 90% Bills
                  </div>
                </div>
              </div>

              {/* Bottom-Right Floating Trust Badge: 25-Year Warranty */}
              <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 z-10 hidden sm:flex items-center gap-2 rounded-xl bg-[#0B2545]/90 backdrop-blur-md px-3 py-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.18)] border border-white/20 text-white">
                <ShieldCheck className="size-4 text-amber-400 shrink-0" />
                <span className="text-[11px] font-extrabold tracking-wide">
                  25-Yr Linear Warranty
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* Dynamic Wave Swoosh Transition with Orange & Navy Arcs */}
      {/* ========================================================= */}
      <div className="relative w-full overflow-hidden leading-none pointer-events-none mt-2">
        <svg
          viewBox="0 0 1440 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-5 sm:h-7 md:h-8 text-white preserve-3d"
          preserveAspectRatio="none"
        >
          {/* Subtle Orange Accent Stroke */}
          <path
            d="M0,20 C320,28 720,14 1440,24"
            stroke="#E04F16"
            strokeWidth="2.5"
            strokeOpacity="0.85"
            fill="none"
          />
          {/* Elegant Navy Accent Stroke */}
          <path
            d="M0,24 C380,32 800,18 1440,27"
            stroke="#084B9E"
            strokeWidth="2"
            strokeOpacity="0.65"
            fill="none"
          />
        </svg>
      </div>
    </section>
  );
}
