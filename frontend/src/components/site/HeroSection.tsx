import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Headphones, Home, Settings, Sparkles } from "lucide-react";
import heroAmaravati from "@/assets/hero-amaravati.jpg";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f0f6fc]/50 to-white pt-5 sm:pt-7 md:pt-10 pb-6 sm:pb-8 lg:pb-10 border-b border-slate-100">
      {/* Subtle ambient solar flare backgrounds */}
      <div className="absolute top-0 right-1/4 -z-10 size-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -z-10 size-80 rounded-full bg-[#0756B9]/5 blur-3xl pointer-events-none" />

      <div className="container-site px-4 sm:px-6">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-8 xl:gap-12 lg:items-center">
          {/* Left Column: Heading, Subheading, Action Buttons & Feature Badges */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Top small eyebrow heading */}
            <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-[#0756B9]/10 px-3 py-1 text-[10px] sm:text-[11px] md:text-xs font-black uppercase tracking-wider text-[#0756B9] border border-[#0756B9]/20 shadow-2xs">
              <Sparkles className="size-3 text-[#0756B9] shrink-0" />
              <span>CLEAN ENERGY | BRIGHTER TOMORROW</span>
            </div>

            {/* Main Heading */}
            <h1 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-[56px] font-black tracking-tight leading-[1.12]">
              <span className="block text-[#0B2B4C]">Powering Amaravati with</span>
              <span className="block text-[#B83A16] mt-1 sm:mt-1.5">Clean Solar Energy</span>
            </h1>

            {/* Description */}
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-[#53647C] leading-relaxed max-w-xl font-medium">
              Smart, reliable solar solutions for homes and businesses across Andhra Pradesh.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Button 1: Explore Solar Solutions */}
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 rounded-[30px] bg-gradient-to-r from-[#0756B9] to-[#0B2B4C] px-5 sm:px-6 py-2.5 sm:py-3.5 text-xs sm:text-sm md:text-base font-bold text-white shadow-md hover:shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer select-none"
              >
                <span>Explore Solar Solutions</span>
                <ArrowRight className="size-4 shrink-0" />
              </Link>

              {/* Button 2: Get Free Consultation */}
              <Link
                to="/book-a-demo"
                className="inline-flex items-center justify-center gap-2 rounded-[30px] bg-gradient-to-r from-[#B83A16] to-[#D44A20] px-5 sm:px-6 py-2.5 sm:py-3.5 text-xs sm:text-sm md:text-base font-bold text-white shadow-md hover:shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer select-none"
              >
                <Calendar className="size-4 shrink-0" />
                <span>Get Free Consultation</span>
              </Link>
            </div>

            {/* Bottom 3 Features with Dividers */}
            <div className="mt-7 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-200/90">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2.5 md:gap-4 items-center">
                {/* Feature 1 */}
                <div className="flex items-center gap-2.5">
                  <div className="grid size-8 sm:size-9 md:size-10 place-items-center rounded-xl bg-[#B83A16]/10 text-[#B83A16] shrink-0 border border-[#B83A16]/20">
                    <Settings className="size-4 sm:size-4.5" />
                  </div>
                  <span className="text-xs sm:text-[12px] md:text-sm font-extrabold text-[#0B2B4C] leading-tight">
                    End-to-End Solar Support
                  </span>
                </div>

                {/* Feature 2 */}
                <div className="flex items-center gap-2.5 sm:border-l sm:border-slate-200 sm:pl-3 md:pl-4">
                  <div className="grid size-8 sm:size-9 md:size-10 place-items-center rounded-xl bg-[#0756B9]/10 text-[#0756B9] shrink-0 border border-[#0756B9]/20">
                    <Home className="size-4 sm:size-4.5" />
                  </div>
                  <span className="text-xs sm:text-[12px] md:text-sm font-extrabold text-[#0B2B4C] leading-tight">
                    Residential & Commercial
                  </span>
                </div>

                {/* Feature 3 */}
                <div className="flex items-center gap-2.5 sm:border-l sm:border-slate-200 sm:pl-3 md:pl-4">
                  <div className="grid size-8 sm:size-9 md:size-10 place-items-center rounded-xl bg-[#B83A16]/10 text-[#B83A16] shrink-0 border border-[#B83A16]/20">
                    <Headphones className="size-4 sm:size-4.5" />
                  </div>
                  <span className="text-xs sm:text-[12px] md:text-sm font-extrabold text-[#0B2B4C] leading-tight">
                    Installation to After-Sales Service
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Asset Image matching Reference */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_16px_40px_rgba(11,43,76,0.14)] border-2 border-white bg-white group transition-all duration-300 hover:shadow-[0_20px_50px_rgba(11,43,76,0.2)]">
              <img
                src={heroAmaravati}
                alt="Amaravati Solar Solutions - Powering Amaravati with Clean Solar Energy"
                width={1024}
                height={512}
                loading="eager"
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0B2B4C]/10 via-transparent to-white/10" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Orange and Navy Curved Decorative Transition Line */}
      <div className="mt-6 sm:mt-8 lg:mt-10 h-1.5 w-full bg-gradient-to-r from-[#0B2B4C] via-[#0756B9] to-[#B83A16]" />
    </section>
  );
}
