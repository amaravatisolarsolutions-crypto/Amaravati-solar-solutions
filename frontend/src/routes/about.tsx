import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { setupParallaxAndPopAnimation } from "@/lib/parallax-animation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, Sparkles, Target } from "lucide-react";

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
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 py-10 sm:py-16 md:py-20 min-h-[75vh]">
      <div className="container-site max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Main ABOUT Card */}
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-6 sm:p-10 md:p-12 scroll-pop scroll-pop-1">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#B83A16]/10 px-3.5 py-1 text-xs font-black text-[#B83A16] uppercase tracking-wider mb-4">
            <Sparkles className="size-3.5" /> Amaravati Solar Solutions
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#082B4C] tracking-tight">
            ABOUT
          </h1>
          
          <p className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-[#082B4C] leading-snug">
            We don't just install solar. We create a smarter way to power life.
          </p>
          
          <div className="mt-6 pt-6 border-t border-slate-100 flex items-start gap-3">
            <span className="size-2 rounded-full bg-[#B83A16] mt-2.5 shrink-0" />
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              At Amaravati Solar Solutions, we believe the future of energy should be efficient, dependable, and sustainable. Our approach combines thoughtful solar system design, quality components, precision installation, and end-to-end customer support to deliver solutions built around the needs of every customer.
            </p>
          </div>
        </div>

        {/* Vision & Mission 2-Column Grid */}
        <div className="grid gap-6 md:grid-cols-2 mt-8 sm:mt-10">
          
          {/* Our Vision Card */}
          <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-6 sm:p-8 md:p-10 flex flex-col justify-between scroll-pop scroll-pop-2 transition-all duration-300 hover:shadow-md hover:border-[#082B4C]/30">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="grid size-11 place-items-center rounded-2xl bg-[#082B4C]/10 text-[#082B4C]">
                  <Eye className="size-5.5" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#082B4C] tracking-tight">
                  Our Vision
                </h2>
              </div>

              <ul className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="size-2 rounded-full bg-[#082B4C] mt-2 shrink-0" />
                  <span className="font-extrabold text-[#082B4C] text-base sm:text-lg">
                    To redefine the way people experience energy.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="size-2 rounded-full bg-[#082B4C] mt-2 shrink-0" />
                  <span className="text-slate-600">
                    We envision a future where every suitable rooftop becomes a source of clean power, every household has greater control over its energy costs, and sustainability becomes a natural part of everyday living.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="size-2 rounded-full bg-[#082B4C] mt-2 shrink-0" />
                  <span className="text-slate-600">
                    Our ambition is to build a trusted solar brand that stands for engineering excellence, lasting reliability, and a cleaner tomorrow.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Our Mission Card */}
          <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-6 sm:p-8 md:p-10 flex flex-col justify-between scroll-pop scroll-pop-3 transition-all duration-300 hover:shadow-md hover:border-[#B83A16]/30">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="grid size-11 place-items-center rounded-2xl bg-[#B83A16]/10 text-[#B83A16]">
                  <Target className="size-5.5" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#082B4C] tracking-tight">
                  Our Mission
                </h2>
              </div>

              <ul className="space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="size-2 rounded-full bg-[#B83A16] mt-2 shrink-0" />
                  <div>
                    <p className="font-extrabold text-[#082B4C] text-base sm:text-lg">
                      To make the transition to solar simple, seamless, and worthwhile.
                    </p>
                    <p className="mt-1.5 text-slate-600">
                      To accelerate the transition towards clean energy by making solar power accessible and reliable, reducing environmental impact, and inspiring communities to embrace a greener, more sustainable future.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="size-2 rounded-full bg-[#B83A16] mt-2 shrink-0" />
                  <span className="font-extrabold text-[#082B4C] text-base sm:text-lg">
                    Together, building a greener society for generations to come
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 sm:mt-12 text-center scroll-pop scroll-pop-4">
          <Button asChild variant="cta" size="lg" className="rounded-[30px] bg-[#B83A16] hover:bg-[#A33112] text-white px-8 py-3.5 shadow-md">
            <Link to="/contact">
              <span>Start Your Solar Journey</span>
              <ArrowRight className="size-4 ml-1.5" />
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}
