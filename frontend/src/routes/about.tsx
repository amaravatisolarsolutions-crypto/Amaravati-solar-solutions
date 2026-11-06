import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { setupParallaxAndPopAnimation } from "@/lib/parallax-animation";
import { cn } from "@/lib/utils";
import solarDrone from "@/assets/hero-elevated-drone.jpg";
import solarInstallation from "@/assets/installation.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Amaravati Solar Solutions" },
      {
        name: "description",
        content:
          "Learn about Amaravati Solar Solutions. We engineer, install, and service high-yield rooftop solar plants across Andhra Pradesh and Telangana with 25-year warranty and subsidy liaisoning.",
      },
      { property: "og:title", content: "About Amaravati Solar Solutions" },
      {
        property: "og:description",
        content:
          "We don't just install solar. We create a smarter way to power everyday life across Andhra Pradesh and Telangana.",
      },
    ],
  }),
  component: AboutPage,
});

const STATS = [
  { value: "500+", label: "Rooftop Systems", desc: "Installed across AP & Telangana" },
  { value: "25 Yrs", label: "Panel Warranty", desc: "Tier-1 linear performance" },
  { value: "₹78,000", label: "Govt Subsidy", desc: "Direct DBT via PM Surya Ghar" },
  { value: "100%", label: "Net-Metering", desc: "DISCOM liaisoning & approvals" },
];

function AboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    return setupParallaxAndPopAnimation();
  }, []);

  return (
    <div className="bg-slate-50/60 pb-16">
      {/* 1. TOP HEADER & BREADCRUMB (Pixel-perfect alignment with Header Logo) */}
      <section className="bg-white border-b border-orange-100/80 pt-3 pb-5">
        <div className="container-site">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#082B4C] hover:text-[#B83A16] transition-colors"
            >
              <ArrowLeft className="size-3.5 text-[#B83A16]" /> Back to Home
            </Link>

            <div className="inline-flex items-center gap-1 rounded-full bg-[#B83A16]/10 px-3 py-0.5 text-[11px] font-bold text-[#B83A16]">
              <Sparkles className="size-3 text-[#B83A16]" /> ABOUT AMARAVATI SOLAR SOLUTIONS
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#082B4C] tracking-tight">
            About Our Company
          </h1>
          <p className="mt-1.5 text-sm sm:text-base font-bold text-[#B83A16] leading-snug">
            We don't just install solar. We create a smarter way to power everyday life.
          </p>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Headquartered in Vijayawada, Amaravati Solar Solutions is a premier engineering, procurement, and construction (EPC) company delivering turnkey rooftop and ground-mounted solar power plants across Andhra Pradesh and Telangana.
          </p>
        </div>
      </section>

      {/* 2. MAIN STORY SECTION WITH PROPER SOLAR IMAGE */}
      <section className="pt-6 sm:pt-8">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Left Column: Detailed Story & Value Proposition (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-none border border-orange-200/90 bg-gradient-to-br from-[#FFFDF9] via-white to-[#FFF5EA] p-5 sm:p-7 md:p-8 shadow-[0_4px_16px_rgba(224,79,22,0.06)] scroll-pop scroll-pop-1">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#082B4C]/10 px-3 py-1 text-[11px] font-bold text-[#082B4C] uppercase tracking-wider mb-3">
                  <Zap className="size-3.5 text-[#B83A16]" /> Engineering Excellence &amp; Reliability
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#082B4C] tracking-tight leading-tight">
                  Empowering Homes &amp; Businesses With Sustainable Clean Energy
                </h2>

                <p className="mt-3 text-xs sm:text-sm md:text-[14.5px] text-slate-700 leading-relaxed text-justify [text-align-last:left]">
                  At <strong className="text-[#082B4C]">Amaravati Solar Solutions</strong>, we believe the transition to clean energy should be effortless, dependable, and financially rewarding. Escalating electricity tariffs are one of the heaviest ongoing expenses for property owners. By harvesting the abundant sunshine of the Deccan plateau, we transform underutilized rooftops into high-yield power stations.
                </p>

                <p className="mt-2.5 text-xs sm:text-sm md:text-[14.5px] text-slate-700 leading-relaxed text-justify [text-align-last:left]">
                  Our end-to-end EPC approach integrates thoughtful system modeling, certified Tier-1 components, galvanized mounting structures engineered for high-wind resistance, and comprehensive DISCOM net-metering approvals. We stand behind every installation with a 25-year performance warranty and dedicated regional maintenance.
                </p>

                {/* Key Bullet Highlights */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-orange-100">
                  <div className="flex items-start gap-2 text-xs sm:text-[13px] font-bold text-[#082B4C]">
                    <CheckCircle2 className="size-4 text-[#B83A16] shrink-0 mt-0.5" />
                    <span>Up to 90% Monthly Power Bill Savings</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs sm:text-[13px] font-bold text-[#082B4C]">
                    <CheckCircle2 className="size-4 text-[#B83A16] shrink-0 mt-0.5" />
                    <span>PM Surya Ghar Govt Subsidy (₹78,000 DBT)</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs sm:text-[13px] font-bold text-[#082B4C]">
                    <CheckCircle2 className="size-4 text-[#B83A16] shrink-0 mt-0.5" />
                    <span>APCPDCL / APEPDCL / TGSPDCL Approvals</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs sm:text-[13px] font-bold text-[#082B4C]">
                    <CheckCircle2 className="size-4 text-[#B83A16] shrink-0 mt-0.5" />
                    <span>3 to 4 Years Complete Capital Payback</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-5 border-t border-orange-100 flex flex-wrap items-center gap-3">
                <Button asChild variant="cta" size="default" className="shadow-md">
                  <Link to="/book-a-demo">
                    Get A Free Site Survey &amp; Quote <ArrowRight className="size-4 ml-1.5" />
                  </Link>
                </Button>
                <Button asChild variant="heroOutline" size="default">
                  <Link to="/solar-solutions">
                    Explore All Solar Solutions
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Column: High Quality Solar Image Visual (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4 scroll-pop scroll-pop-2">
              {/* Primary Solar Installation Photo */}
              <div className="relative flex-1 min-h-[300px] sm:min-h-[360px] rounded-none overflow-hidden border-2 border-orange-200/90 shadow-md group bg-slate-900">
                <img
                  src={solarDrone}
                  alt="Amaravati Solar Solutions elevated rooftop installation"
                  width={1600}
                  height={1067}
                  loading="eager"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#082B4C]/85 via-transparent to-black/20" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-none bg-[#082B4C]/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white border border-white/20 shadow-xs">
                  <Sparkles className="size-3 text-amber-400" />
                  <span>Turnkey Solar EPC Vijayawada</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 z-10 p-3 bg-white/95 backdrop-blur-md rounded-none border border-orange-200/80 shadow-md">
                  <div className="flex items-center justify-between text-xs font-black text-[#082B4C]">
                    <span>High-Efficiency Rooftop Solar</span>
                    <span className="text-[#B83A16] font-bold">25-Yr Performance</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-600 line-clamp-2">
                    Engineered structures built to withstand coastal winds and deliver optimal seasonal generation.
                  </p>
                </div>
              </div>

              {/* Secondary Mini Proof Bar with Photo Inset */}
              <div className="rounded-none border border-orange-200/80 bg-white p-3 shadow-2xs flex items-center gap-3">
                <div className="size-16 rounded-none overflow-hidden shrink-0 border border-orange-100 bg-slate-100">
                  <img
                    src={solarInstallation}
                    alt="Solar technician installation"
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-black text-[#082B4C]">Certified Solar Engineers</div>
                  <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                    Trained technicians ensuring leak-proof rooftop mounting and CEIG electrical safety standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KEY METRICS STATS BAR */}
      <section className="pt-6 sm:pt-8">
        <div className="container-site">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className={cn(
                  "rounded-none border border-orange-200/90 bg-white p-4 text-center shadow-2xs transition-all hover:-translate-y-0.5 hover:shadow-md",
                  idx === 0 && "bg-gradient-to-br from-white to-[#FFF5EA]"
                )}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#B83A16] tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs sm:text-sm font-black text-[#082B4C]">
                  {stat.label}
                </div>
                <div className="mt-0.5 text-[11px] text-slate-500">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VISION & MISSION - FULL-WIDTH 2-COLUMN SYMMETRICAL GRID */}
      <section className="pt-6 sm:pt-8">
        <div className="container-site">
          <div className="mb-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#B83A16]/10 px-3 py-0.5 text-[11px] font-bold text-[#B83A16] uppercase tracking-wider mb-1">
              <Sparkles className="size-3" /> Core Purpose &amp; Guiding Principles
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#082B4C] tracking-tight">
              Our Vision &amp; Mission
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
            {/* Our Vision Card */}
            <div className="rounded-none border border-orange-200/90 bg-gradient-to-br from-white via-white to-[#FFFDF9] p-5 sm:p-7 shadow-[0_4px_16px_rgba(8,43,76,0.06)] flex flex-col justify-between scroll-pop scroll-pop-1 hover:border-[#082B4C]/40 transition-colors">
              <div>
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-100">
                  <div className="grid size-10 place-items-center rounded-none bg-[#082B4C] text-white shadow-xs">
                    <Eye className="size-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Long-Term Ambition</span>
                    <h3 className="text-lg sm:text-xl font-black text-[#082B4C] tracking-tight">
                      Our Vision
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base font-extrabold text-[#082B4C] leading-snug">
                  To redefine the way families and enterprises experience energy independence.
                </p>

                <ul className="mt-4 space-y-2.5 text-xs sm:text-[13.5px] text-slate-700 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="size-2 rounded-none bg-[#082B4C] mt-1.5 shrink-0" />
                    <span>
                      We envision a future where every suitable rooftop across Andhra Pradesh and Telangana becomes a clean, decentralized power plant.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="size-2 rounded-none bg-[#082B4C] mt-1.5 shrink-0" />
                    <span>
                      Empowering consumers to hedge against relentless utility tariff hikes through predictable, free solar energy generation for 25+ years.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="size-2 rounded-none bg-[#082B4C] mt-1.5 shrink-0" />
                    <span>
                      Building the region's most trusted solar EPC brand rooted in transparent technical consulting, robust safety, and uncompromised build quality.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Our Mission Card */}
            <div className="rounded-none border border-orange-200/90 bg-gradient-to-br from-[#FFFDF9] via-white to-[#FFF5EA] p-5 sm:p-7 shadow-[0_4px_16px_rgba(224,79,22,0.06)] flex flex-col justify-between scroll-pop scroll-pop-2 hover:border-[#B83A16]/50 transition-colors">
              <div>
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-orange-100">
                  <div className="grid size-10 place-items-center rounded-none bg-[#B83A16] text-white shadow-xs">
                    <Target className="size-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Day-to-Day Execution</span>
                    <h3 className="text-lg sm:text-xl font-black text-[#082B4C] tracking-tight">
                      Our Mission
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base font-extrabold text-[#B83A16] leading-snug">
                  To make the transition to solar simple, transparent, and undeniably worthwhile.
                </p>

                <ul className="mt-4 space-y-2.5 text-xs sm:text-[13.5px] text-slate-700 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="size-2 rounded-none bg-[#B83A16] mt-1.5 shrink-0" />
                    <span>
                      Accelerating clean energy adoption by delivering turnkey solutions with zero friction — handling design, DISCOM feasibility, subsidy liaisoning, and commissioning.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="size-2 rounded-none bg-[#B83A16] mt-1.5 shrink-0" />
                    <span>
                      Guaranteeing maximum monetary returns by utilizing strictly certified Tier-1 mono-PERC panels, high-grade copper cabling, and surge-protected inverters.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="size-2 rounded-none bg-[#B83A16] mt-1.5 shrink-0" />
                    <span>
                      Together, building a greener, decarbonized society for generations to come with thousands of metric tons of lifetime carbon offset.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
