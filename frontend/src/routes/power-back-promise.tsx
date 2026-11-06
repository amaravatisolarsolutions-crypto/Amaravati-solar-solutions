import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock,
  Coins,
  FileCheck2,
  HardHat,
  HelpCircle,
  IndianRupee,
  Phone,
  PlugZap,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/site-data";
import { setupParallaxAndPopAnimation } from "@/lib/parallax-animation";
import solarWatermark from "@/assets/solar-watermark-bg.jpg";

export const Route = createFileRoute("/power-back-promise")({
  head: () => ({
    meta: [
      { title: "Power Back Promise — Performance Guarantee & ₹6/Unit Compensation | Amaravati Solar Solutions" },
      {
        name: "description",
        content:
          "Guaranteed solar power generation backed by ₹6/Unit financial compensation if actual output falls below committed benchmarks. 25-year linear performance warranty.",
      },
      { property: "og:title", content: "Power Back Promise — Amaravati Solar Solutions" },
      {
        property: "og:description",
        content:
          "Solar Performance. Financial Assurance. Direct financial credit if solar generation falls below committed benchmarks.",
      },
    ],
  }),
  component: PowerBackPromisePage,
});

const PILLARS = [
  {
    title: "₹6 / Unit Direct Compensation",
    badge: "FINANCIAL BACKSTOP",
    icon: IndianRupee,
    desc: "If your solar system produces less energy than our agreed annual performance benchmark due to system design or component faults, we pay you ₹6 per shortfall unit.",
  },
  {
    title: "Transparent Generation Benchmarks",
    badge: "PVsyst SIMULATION",
    icon: Target,
    desc: "Every contract specifies the exact guaranteed annual kWh generation, calculated using location-specific meteorological solar irradiance data for Vijayawada, Guntur, and AP.",
  },
  {
    title: "24/7 Cloud IoT Telemetry",
    badge: "REAL-TIME TRACKING",
    icon: Sparkles,
    desc: "Smart Wi-Fi enabled inverters transmit daily generation data to our monitoring center, allowing automated alerts for sudden generation drops or grid fluctuations.",
  },
];

const AUDIT_STEPS = [
  {
    step: "01",
    title: "Accurate PVsyst Solar Modeling",
    desc: "Before installation, our design engineers simulate your rooftop layout with PVsyst software to establish a realistic, weather-normalized annual generation target (kWh/year).",
  },
  {
    step: "02",
    title: "Tier-1 Hardware & Positive Tolerance",
    desc: "We exclusively deploy ALMM-listed Tier-1 Mono-PERC / TOPCon bifacial modules with positive power tolerance (+0 to +5W), ensuring panels generate at or above rated capacity.",
  },
  {
    step: "03",
    title: "Continuous Cloud IoT Monitoring",
    desc: "Your smart inverter records generation down to 5-minute intervals. Both you and our central engineering support desk can monitor daily kWh yield via smartphone.",
  },
  {
    step: "04",
    title: "Annual Performance Audit & Credit",
    desc: "At the end of every 12-month operational cycle, actual generation is reconciled with the contract benchmark. Any unmitigated shortfall is credited directly at ₹6 per unit.",
  },
];

const FAQS = [
  {
    q: "Why does Amaravati Solar offer ₹6 / Unit compensation?",
    a: "We have complete confidence in our 3D shadow modeling, Tier-1 solar hardware, and engineering precision. The Power Back Promise protects your monthly return on investment and guarantees that your financial calculations remain 100% dependable.",
  },
  {
    q: "How is the guaranteed generation benchmark calculated?",
    a: "The benchmark is determined using PVsyst simulation software, taking into account local solar insolation in Andhra Pradesh/Telangana, roof azimuth tilt, ambient temperatures, and seasonal weather patterns.",
  },
  {
    q: "What conditions apply to the Power Back Promise?",
    a: "The system must be operated in accordance with standard guidelines and maintained under our PowerCare program (regular cleaning and bi-annual inspections). Grid outages, force majeure, or customer-induced shading (like new construction) are normalized.",
  },
  {
    q: "Does this cover both residential and commercial solar installations?",
    a: "Yes! The Power Back Promise is available for eligible residential villas, apartments, commercial office rooftops, and industrial power plants engineered by Amaravati Solar Solutions.",
  },
];

function PowerBackPromisePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    return setupParallaxAndPopAnimation();
  }, []);

  return (
    <div className="bg-transparent pb-16 relative">
      {/* 1. TOP HEADER & BREADCRUMB WITH WARM SOLAR AMBIENT TINT */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-50/90 via-white/80 to-amber-50/70 backdrop-blur-md border-b border-orange-200/90 pt-5 pb-7 sm:pb-9">
        {/* Subtle Solar Watermark Decoration in Header */}
        <div
          className="absolute -right-8 -bottom-8 w-80 sm:w-96 h-48 sm:h-56 opacity-[0.09] pointer-events-none select-none bg-contain bg-no-repeat bg-right-bottom mix-blend-multiply"
          style={{ backgroundImage: `url(${solarWatermark})` }}
        />
        <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-orange-400/10 blur-3xl pointer-events-none" />

        <div className="container-site relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-primary transition-colors"
            >
              <ArrowLeft className="size-3.5 text-primary" /> Back to Home
            </Link>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/10 px-3 py-1 text-[11px] font-black text-emerald-700 uppercase tracking-wider border border-emerald-600/20 shadow-2xs">
              <ShieldCheck className="size-3.5" /> PERFORMANCE GUARANTEE & FINANCIAL ASSURANCE
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#082B4C] tracking-tight">
            Power Back Promise: <span className="text-[#E04F16]">Solar Performance Guaranteed</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-700 max-w-3xl leading-relaxed font-medium">
            At Amaravati Solar Solutions, we stand firmly behind our engineering. If your system's annual solar generation falls below our committed benchmark, we provide direct financial compensation at <strong className="text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">₹6 / Unit</strong>.
          </p>

          {/* 4 Feature Badges */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-emerald-300/80 bg-white/90 backdrop-blur-sm p-3.5 text-left shadow-[0_4px_16px_rgba(16,185,129,0.08)] hover:shadow-md hover:border-emerald-500 transition-all">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Shortfall Backstop</div>
              <div className="mt-0.5 text-base sm:text-xl font-black text-emerald-700">₹6 / Unit</div>
              <div className="text-[10px] text-slate-600 mt-0.5">Direct financial credit</div>
            </div>

            <div className="rounded-xl border border-sky-300/80 bg-white/90 backdrop-blur-sm p-3.5 text-left shadow-[0_4px_16px_rgba(14,165,233,0.08)] hover:shadow-md hover:border-sky-500 transition-all">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Energy Auditing</div>
              <div className="mt-0.5 text-base sm:text-xl font-black text-sky-700">PVsyst Certified</div>
              <div className="text-[10px] text-slate-600 mt-0.5">Transparent kWh targets</div>
            </div>

            <div className="rounded-xl border border-orange-300/80 bg-white/90 backdrop-blur-sm p-3.5 text-left shadow-[0_4px_16px_rgba(249,115,22,0.08)] hover:shadow-md hover:border-orange-500 transition-all">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Panel Warranty</div>
              <div className="mt-0.5 text-base sm:text-xl font-black text-[#082B4C]">25 Years Linear</div>
              <div className="text-[10px] text-slate-600 mt-0.5">≥ 84.8% at Year 25</div>
            </div>

            <div className="rounded-xl border border-amber-300/80 bg-white/90 backdrop-blur-sm p-3.5 text-left shadow-[0_4px_16px_rgba(245,158,11,0.08)] hover:shadow-md hover:border-amber-500 transition-all">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">IoT Telemetry</div>
              <div className="mt-0.5 text-base sm:text-xl font-black text-amber-700">24/7 Cloud Sync</div>
              <div className="text-[10px] text-slate-600 mt-0.5">Mobile app monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 3 CORE PILLARS OF POWER BACK PROMISE */}
      <section className="container-site pt-8 sm:pt-12">
        <div className="text-left mb-6 sm:mb-8">
          <span className="inline-block text-[11px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            CONFIDENCE IN ENGINEERING
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-black text-[#082B4C] tracking-tight">
            The 3 Pillars of Our Performance Guarantee
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            Why leave your monthly energy savings to probability? We back our engineering designs with legally binding contractual performance guarantees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PILLARS.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl border border-orange-200/85 bg-white/90 backdrop-blur-sm p-6 shadow-md hover:shadow-xl hover:border-orange-400 transition-all duration-300 text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {p.badge}
                    </span>
                    <div className="grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700 shadow-2xs font-black">
                      <Icon className="size-5" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-[#082B4C] leading-snug">
                    {p.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. HOW GENERATION IS AUDITED & VERIFIED */}
      <section className="container-site pt-12 sm:pt-16">
        <div className="rounded-3xl border border-orange-200/85 bg-white/90 backdrop-blur-sm p-6 sm:p-10 shadow-md">
          <div className="max-w-2xl mb-8 text-left">
            <span className="inline-block text-[11px] font-black uppercase tracking-wider text-[#E04F16] bg-[#E04F16]/10 px-3 py-1 rounded-full">
              TRANSPARENT VERIFICATION
            </span>
            <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-black text-[#082B4C] tracking-tight">
              How the Power Back Promise is Audited
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Clear, empirical data backed by smart bi-directional net-meters and cloud inverter telemetry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-left">
            {AUDIT_STEPS.map((step) => (
              <div key={step.step} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-black text-[#E04F16] tracking-wider mb-2 block">
                    STAGE {step.step}
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-[#082B4C] leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 25-YEAR LINEAR PERFORMANCE BREAKDOWN */}
      <section className="container-site pt-12">
        <div className="rounded-3xl bg-gradient-to-br from-[#082B4C] via-[#093259] to-[#082B4C] text-white p-6 sm:p-10 shadow-xl">
          <div className="max-w-3xl text-left mb-6">
            <span className="inline-block text-[11px] font-black uppercase tracking-wider text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/15">
              25-YEAR LINEAR POWER WARRANTY
            </span>
            <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
              Guaranteed Linear Degradation Schedule
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-white/80 leading-relaxed">
              Cheap solar modules suffer rapid light-induced degradation (LID). Our Tier-1 TOPCon and Mono-PERC modules are backed by internationally certified linear degradation limits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm text-left">
              <span className="text-amber-300 font-black text-xs uppercase tracking-wider">Year 1 Performance</span>
              <div className="mt-1 text-2xl sm:text-3xl font-black text-white">≥ 98.0%</div>
              <p className="mt-1 text-xs text-white/70">Initial first-year output guarantee with zero sudden drop.</p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm text-left">
              <span className="text-sky-300 font-black text-xs uppercase tracking-wider">Years 2 – 24 Linear Rate</span>
              <div className="mt-1 text-2xl sm:text-3xl font-black text-white">≤ 0.55% / yr</div>
              <p className="mt-1 text-xs text-white/70">Ultra-low annual degradation guaranteed across 24 years.</p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm text-left">
              <span className="text-emerald-300 font-black text-xs uppercase tracking-wider">Year 25 Residual Power</span>
              <div className="mt-1 text-2xl sm:text-3xl font-black text-white">≥ 84.8%</div>
              <p className="mt-1 text-xs text-white/70">Over 84.8% of nameplate generation retained even after 25 years.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      <section className="container-site pt-12 sm:pt-16">
        <div className="rounded-3xl border border-orange-200/80 bg-white/90 backdrop-blur-sm p-6 sm:p-10 shadow-md">
          <div className="max-w-2xl mb-6 text-left">
            <span className="inline-block text-[11px] font-black uppercase tracking-wider text-[#E04F16] bg-[#E04F16]/10 px-3 py-1 rounded-full">
              CLARIFICATIONS
            </span>
            <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-black text-[#082B4C] tracking-tight">
              Frequently Asked Questions About Power Back Promise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left">
            {FAQS.map((faq, fIdx) => (
              <div key={fIdx} className="rounded-2xl border border-orange-100/90 bg-white/80 p-4 sm:p-5 shadow-2xs hover:border-orange-300 transition-colors">
                <div className="flex items-start gap-2.5">
                  <HelpCircle className="size-4 text-[#E04F16] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs sm:text-sm font-black text-[#082B4C] leading-snug">{faq.q}</h3>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM ACTION CTA */}
      <section className="container-site pt-12">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-[#082B4C] to-[#E04F16] p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left max-w-2xl">
            <span className="inline-block text-[11px] font-black uppercase tracking-wider text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/15">
              ZERO-RISK SOLAR INVESTMENT
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Get Your Guaranteed Solar Generation Estimate
            </h2>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
              Discover how much clean electricity your roof can generate under contractual performance backing. Book a free consultation with our senior engineering team today.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Button asChild size="lg" className="rounded-full bg-white text-[#082B4C] hover:bg-slate-100 font-black text-xs sm:text-sm shadow-lg h-12 px-6 active:scale-95 transition-all">
              <Link to="/book-a-demo">
                <span>Book Free Consultation</span>
                <ArrowRight className="size-4 ml-1.5" />
              </Link>
            </Button>

            <a
              href="tel:+917989641899"
              className="inline-flex items-center gap-2 rounded-full bg-black/25 hover:bg-black/35 border border-white/30 px-5 h-12 text-xs sm:text-sm font-bold text-white transition-all active:scale-95"
            >
              <Phone className="size-4" />
              <span>Call +91 79896 41899</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

