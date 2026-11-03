import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { setupParallaxAndPopAnimation } from "@/lib/parallax-animation";
import { Eye, Sparkles, Target } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Amaravati Solar Solutions" },
      { name: "description", content: "We don't just install solar. We create a smarter way to power life. Learn about Amaravati Solar Solutions, our vision and mission." },
      { property: "og:title", content: "About Amaravati Solar Solutions" },
      { property: "og:description", content: "We don't just install solar. We create a smarter way to power life." },
    ],
  }),
  component: About,
});

function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    return setupParallaxAndPopAnimation();
  }, []);

  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-[calc(100svh-114px)] flex flex-col justify-center py-2 sm:py-3 md:py-4 px-4 sm:px-6">
      <div className="container-site max-w-4xl px-2 sm:px-4">
        
        {/* Main ABOUT Card */}
        <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-3.5 sm:p-4.5 md:p-5 scroll-pop scroll-pop-1">
          <div className="inline-flex items-center gap-1 rounded-full bg-[#B83A16]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#B83A16] uppercase tracking-wider mb-1.5">
            <Sparkles className="size-3" /> Amaravati Solar Solutions
          </div>
          
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#082B4C] tracking-tight">
            ABOUT
          </h1>
          
          <p className="mt-0.5 text-xs sm:text-sm md:text-base font-bold text-[#082B4C] leading-snug">
            We don't just install solar. We create a smarter way to power life.
          </p>
          
          <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-start gap-2">
            <span className="size-1.5 rounded-full bg-[#B83A16] mt-1.5 shrink-0" />
            <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
              At Amaravati Solar Solutions, we believe the future of energy should be efficient, dependable, and sustainable. Our approach combines thoughtful solar system design, quality components, precision installation, and end-to-end customer support to deliver solutions built around the needs of every customer.
            </p>
          </div>
        </div>

        {/* Vision & Mission 2-Column Grid */}
        <div className="grid gap-3 sm:gap-3.5 md:grid-cols-2 mt-3 sm:mt-3.5">
          
          {/* Our Vision Card */}
          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-3.5 sm:p-4.5 flex flex-col justify-between scroll-pop scroll-pop-2 transition-all duration-300 hover:shadow-sm hover:border-[#082B4C]/30">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="grid size-7 sm:size-8 place-items-center rounded-xl bg-[#082B4C]/10 text-[#082B4C]">
                  <Eye className="size-3.5 sm:size-4" />
                </div>
                <h2 className="text-base sm:text-lg font-black text-[#082B4C] tracking-tight">
                  Our Vision
                </h2>
              </div>

              <ul className="space-y-2 text-slate-700 text-xs sm:text-[13px] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-[#082B4C] mt-1.5 shrink-0" />
                  <span className="font-extrabold text-[#082B4C]">
                    To redefine the way people experience energy.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-[#082B4C] mt-1.5 shrink-0" />
                  <span className="text-slate-600">
                    We envision a future where every suitable rooftop becomes a source of clean power, every household has greater control over its energy costs, and sustainability becomes a natural part of everyday living.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-[#082B4C] mt-1.5 shrink-0" />
                  <span className="text-slate-600">
                    Our ambition is to build a trusted solar brand that stands for engineering excellence, lasting reliability, and a cleaner tomorrow.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Our Mission Card */}
          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-3.5 sm:p-4.5 flex flex-col justify-between scroll-pop scroll-pop-3 transition-all duration-300 hover:shadow-sm hover:border-[#B83A16]/30">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="grid size-7 sm:size-8 place-items-center rounded-xl bg-[#B83A16]/10 text-[#B83A16]">
                  <Target className="size-3.5 sm:size-4" />
                </div>
                <h2 className="text-base sm:text-lg font-black text-[#082B4C] tracking-tight">
                  Our Mission
                </h2>
              </div>

              <ul className="space-y-2 text-slate-700 text-xs sm:text-[13px] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-[#B83A16] mt-1.5 shrink-0" />
                  <div>
                    <p className="font-extrabold text-[#082B4C]">
                      To make the transition to solar simple, seamless, and worthwhile.
                    </p>
                    <p className="mt-0.5 text-slate-600">
                      To accelerate the transition towards clean energy by making solar power accessible and reliable, reducing environmental impact, and inspiring communities to embrace a greener, more sustainable future.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-[#B83A16] mt-1.5 shrink-0" />
                  <span className="font-extrabold text-[#082B4C]">
                    Together, building a greener society for generations to come
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
