import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  CheckCircle2,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { useEffect } from "react";
import { SolarCalculator } from "@/components/site/SolarCalculator";
import solarWatermark from "@/assets/solar-watermark-bg.jpg";

export const Route = createFileRoute("/solar-calculator")({
  head: () => ({
    meta: [
      { title: "Solar Calculation & Subsidy Estimator — Amaravati Solar Solutions" },
      {
        name: "description",
        content:
          "Calculate your rooftop solar capacity, monthly electricity savings, and ₹78,000 PM Surya Ghar DBT subsidy with Amaravati Solar Solutions in Andhra Pradesh.",
      },
      { property: "og:title", content: "Solar Calculation & Subsidy Estimator — Amaravati Solar Solutions" },
      {
        property: "og:description",
        content:
          "Slide your average monthly electricity bill to calculate required kW capacity, rooftop space, and 25-year financial savings.",
      },
    ],
  }),
  component: SolarCalculationPage,
});

const CALC_FAQS = [
  {
    q: "How is solar capacity (kW) calculated from my monthly electricity bill?",
    a: "In Andhra Pradesh and Telangana, 1 kW of rooftop solar generates approximately 120–130 kWh (units) per month. We divide your average monthly unit consumption by 125 to determine the ideal system size that covers up to 90% of your power bill.",
  },
  {
    q: "How does the PM Surya Ghar ₹78,000 central government subsidy work?",
    a: "Under the PM Surya Ghar Muft Bijli Yojana, residential systems qualify for direct benefit transfer (DBT): ₹30,000 for 1 kW, ₹60,000 for 2 kW, and a maximum of ₹78,000 for 3 kW and above. Our team handles portal registration, DISCOM approvals, and inspection liaisoning.",
  },
  {
    q: "How much shadow-free rooftop area do I need?",
    a: "A standard rooftop solar installation requires approximately 100 square feet of shadow-free area per 1 kW capacity. For example, a popular 3 kW residential rooftop system requires about 300 sq. ft. of clear RCC terrace or shed space.",
  },
  {
    q: "What is the typical return on investment (ROI) and payback period?",
    a: "Because rooftop solar eliminates high-slab DISCOM grid bills and benefits from the ₹78,000 central subsidy, residential systems pay for themselves within 3 to 4 years. Commercial installations benefit from 40% Accelerated Depreciation, achieving payback in 3 years.",
  },
];

function SolarCalculationPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const handleApplyPlan = (summary: {
    bill: number;
    location: string;
    load: string;
    propertyType: string;
    systemKw: number;
    monthlySavings: number;
    subsidy: number;
  }) => {
    navigate({
      to: "/book-a-demo",
      search: {
        service: `Solar Rooftop System (${summary.systemKw} kW)`,
        type: summary.propertyType.includes("Residential") ? "Residential" : "Commercial",
        tab: "calendar",
      } as any,
    });
  };

  return (
    <div className="bg-transparent min-h-screen relative">
      
      {/* 1. SLEEK ONE-LINE PAGE HEADER (NAVY BLUE CARD REMOVED) */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-50/90 via-white/80 to-amber-50/70 backdrop-blur-md border-b border-orange-200/90 py-3 sm:py-4">
        {/* Subtle Solar Watermark Decoration in Header */}
        <div
          className="absolute -right-8 -bottom-8 w-80 sm:w-96 h-36 sm:h-44 opacity-[0.09] pointer-events-none select-none bg-contain bg-no-repeat bg-right-bottom mix-blend-multiply"
          style={{ backgroundImage: `url(${solarWatermark})` }}
        />
        <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-orange-400/10 blur-3xl pointer-events-none" />

        <div className="container-site relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-primary transition-colors"
            >
              <ArrowLeft className="size-3.5 text-primary" /> Back to Home
            </Link>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold text-primary border border-primary/20 shadow-2xs">
              <Calculator className="size-3 text-primary" /> PM SURYA GHAR &amp; SIZING ENGINE
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#082B4C] tracking-tight">
              Solar Calculation &amp; Subsidy Estimator
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Slide your monthly electricity bill to calculate required kW, roof area, and ₹78,000 DBT subsidy.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN INTERACTIVE SOLAR CALCULATOR TOOL */}
      <section className="container-site py-6 sm:py-8 relative z-20 pb-12 sm:pb-16">
        <div className="rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-md p-4 sm:p-6 lg:p-8 shadow-xl border border-orange-200/90">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-orange-100">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#E04F16]">
                Interactive Sizing Engine
              </span>
              <h2 className="text-lg sm:text-2xl font-black text-[#082B4C]">
                Configure Your Rooftop Parameters
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
              <Sparkles className="size-3.5 text-[#E04F16]" />
              <span>AP &amp; Telangana Tariff Rate: ~₹7.50 / kWh</span>
            </div>
          </div>

          {/* Render the full interactive Calculator Component */}
          <SolarCalculator onApplyPlan={handleApplyPlan} />

        </div>
      </section>

      {/* 3. CALCULATION FAQS */}
      <section className="container-site pb-12 sm:pb-16">
        <div className="rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-8 border border-orange-200/80 shadow-sm">
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-100/80 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#E04F16] mb-2">
              <HelpCircle className="size-3.5" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#082B4C]">
              Solar Sizing &amp; Financial FAQs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {CALC_FAQS.map((faq, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <h3 className="text-sm font-extrabold text-[#082B4C] mb-2 flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-[#E04F16] shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BOTTOM ACTION BANNER */}
      <section className="container-site pb-16">
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#082B4C] via-[#093259] to-[#082B4C] p-6 sm:p-8 text-white shadow-xl border border-[#0d3b66] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-300">
              NEXT STEP AFTER CALCULATION
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
              Want a 3D Drone Shadow Simulation of Your Rooftop?
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-white/80 max-w-xl">
              Book a complimentary visit by certified Amaravati Solar engineers to survey structural load capacity, DISCOM transformer quota, and 365-day azimuth tilt.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/book-a-demo"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D9410E] via-[#E04F16] to-[#F97316] hover:from-[#C03507] hover:to-[#D9410E] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <span>Schedule Free Site Survey</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

