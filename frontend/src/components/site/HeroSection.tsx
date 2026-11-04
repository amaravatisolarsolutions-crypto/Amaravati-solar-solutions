import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Headphones, Home, Settings, Sparkles } from "lucide-react";
import heroResidential from "@/assets/hero-residential.jpg";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f8fafc] via-[#ffffff] to-[#f1f5f9] pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-8 sm:pb-10 lg:pb-14 border-b border-slate-200/80">
      {/* Ambient background lighting */}
      <div className="absolute top-0 right-1/4 -z-10 size-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -z-10 size-80 rounded-full bg-[#0756B9]/5 blur-3xl pointer-events-none" />

      <div className="container-site px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12 items-center">
          {/* Left Column: Heading, Subheading, Action Buttons & Feature Badges */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            {/* Top small eyebrow heading */}
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-[#0756B9]/10 px-3.5 py-1 text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#0756B9] border border-[#0756B9]/20 shadow-2xs">
              <Sparkles className="size-3.5 text-[#0756B9] shrink-0" />
              <span>CLEAN ENERGY | BRIGHTER TOMORROW</span>
            </div>

            {/* Main Heading */}
            <h1 className="mt-4 sm:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[52px] font-black tracking-tight leading-[1.12]">
              <span className="block text-[#0B2B4C]">Powering Amaravati with</span>
              <span className="block text-[#B83A16] mt-1 sm:mt-2">Clean Solar Energy</span>
            </h1>

            {/* Description */}
            <p className="mt-3.5 sm:mt-4 text-sm sm:text-base md:text-lg text-[#53647C] leading-relaxed max-w-xl font-medium">
              Smart, reliable solar solutions for homes and businesses across Andhra Pradesh.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Button 1: Explore Solar Solutions */}
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0756B9] to-[#0B2B4C] px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm md:text-base font-bold text-white shadow-md hover:shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer select-none"
              >
                <span>Explore Solar Solutions</span>
                <ArrowRight className="size-4.5 shrink-0" />
              </Link>

              {/* Button 2: Get Free Consultation */}
              <Link
                to="/book-a-demo"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#B83A16] to-[#D44A20] px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm md:text-base font-bold text-white shadow-md hover:shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer select-none"
              >
                <Calendar className="size-4.5 shrink-0" />
                <span>Get Free Consultation</span>
              </Link>
            </div>

            {/* Bottom 3 Features with Dividers */}
            <div className="mt-8 sm:mt-10 pt-6 border-t border-slate-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-2.5 md:gap-4 items-center">
                {/* Feature 1 */}
                <div className="flex items-center gap-2.5">
                  <div className="grid size-9 sm:size-10 place-items-center rounded-xl bg-[#B83A16]/10 text-[#B83A16] shrink-0 border border-[#B83A16]/20">
                    <Settings className="size-4.5 sm:size-5" />
                  </div>
                  <span className="text-xs sm:text-[12px] md:text-sm font-extrabold text-[#0B2B4C] leading-tight">
                    End-to-End Solar Support
                  </span>
                </div>

                {/* Feature 2 */}
                <div className="flex items-center gap-2.5 sm:border-l sm:border-slate-300 sm:pl-3 md:pl-4">
                  <div className="grid size-9 sm:size-10 place-items-center rounded-xl bg-[#0756B9]/10 text-[#0756B9] shrink-0 border border-[#0756B9]/20">
                    <Home className="size-4.5 sm:size-5" />
                  </div>
                  <span className="text-xs sm:text-[12px] md:text-sm font-extrabold text-[#0B2B4C] leading-tight">
                    Residential & Commercial
                  </span>
                </div>

                {/* Feature 3 */}
                <div className="flex items-center gap-2.5 sm:border-l sm:border-slate-300 sm:pl-3 md:pl-4">
                  <div className="grid size-9 sm:size-10 place-items-center rounded-xl bg-[#B83A16]/10 text-[#B83A16] shrink-0 border border-[#B83A16]/20">
                    <Headphones className="size-4.5 sm:size-5" />
                  </div>
                  <span className="text-xs sm:text-[12px] md:text-sm font-extrabold text-[#0B2B4C] leading-tight">
                    Installation to After-Sales Service
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Large Premium Residential Solar House Visual */}
          <div className="lg:col-span-6 xl:col-span-6 w-full flex items-center justify-center">
            <div className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] lg:h-[500px] xl:h-[540px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(11,43,76,0.16)] border border-slate-100 group transition-all duration-300">
              <img
                src={heroResidential}
                alt="Amaravati Solar Solutions - Modern Residential Rooftop Solar System"
                width={1920}
                height={1080}
                loading="eager"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B2B4C]/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Orange and Navy Curved Decorative Transition Line */}
      <div className="mt-8 sm:mt-10 lg:mt-12 h-2 w-full bg-gradient-to-r from-[#0B2B4C] via-[#0756B9] to-[#B83A16]" />
    </section>
  );
}

