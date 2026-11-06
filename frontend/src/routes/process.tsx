import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock,
  FileCheck2,
  FileText,
  HardHat,
  HelpCircle,
  Laptop,
  Phone,
  PlugZap,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import step1Consultation from "@/assets/process-step-1-consultation.jpg";
import step2Inspection from "@/assets/process-step-2-inspection.jpg";
import step3Design from "@/assets/process-step-3-design.jpg";
import step4Installation from "@/assets/process-step-4-installation.jpg";
import solarWatermark from "@/assets/solar-watermark-bg.jpg";
import { COMPANY } from "@/lib/site-data";
import { setupParallaxAndPopAnimation } from "@/lib/parallax-animation";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "End-to-End Solar Installation Process — Amaravati Solar Solutions" },
      {
        name: "description",
        content:
          "Discover our transparent 4-step solar execution process: Consultation, On-Site 3D Shadow Inspection, Custom CAD Design & Subsidy Filing, and Certified Net-Metering Installation.",
      },
      { property: "og:title", content: "End-to-End Solar Execution Process — Amaravati Solar Solutions" },
      {
        property: "og:description",
        content:
          "Turnkey solar execution across Andhra Pradesh & Telangana. 10-15 day handover, 100% DISCOM liaisoning, and 25-year performance warranty.",
      },
    ],
  }),
  component: ProcessPage,
});

const PROCESS_STEPS = [
  {
    step: "01",
    tagline: "DAY 1 • INITIAL DISCOVERY",
    title: "Consultation & Energy Audit",
    icon: Users,
    image: step1Consultation,
    desc: "Our solar engineers analyze your past 12-month electricity bills, average daylight energy demand, peak wattage spikes, and budget to recommend the most cost-effective solar architecture (On-Grid, Off-Grid, or Hybrid).",
    deliverables: [
      "12-Month Electricity Bill Analysis & Load Profile",
      "Optimal Solar Capacity Calculation (kWp)",
      "Projected Monthly & Annual Electricity Bill Savings",
      "PM Surya Ghar Muft Bijli Yojana Subsidy Breakdown (up to ₹78,000)",
      "Financial ROI & Payback Timeline Estimation (3–4 Years)",
    ],
    duration: "1 Business Day",
    highlights: ["Free Technical Guidance", "Transparent ROI Estimation", "Zero Sales Pressure"],
  },
  {
    step: "02",
    tagline: "DAYS 2–3 • PRECISION AUDIT",
    title: "Site Inspection & 3D Shadow Modeling",
    icon: HardHat,
    image: step2Inspection,
    desc: "A certified solar engineer visits your premises in Vijayawada, Guntur, or across Andhra Pradesh. We assess roof orientation, tilt angle, civil strength of RCC slab or metal shed, and run 365-day 3D solar shadow path simulations.",
    deliverables: [
      "Drone / Digital Rooftop Boundary Mapping",
      "3D Seasonal Shadow Analysis (Parapet, Water Tanks, Trees)",
      "Roof Civil Load-Bearing Certification",
      "DISCOM Transformer Feasibility & Sanction Audit",
      "Optimal Panel Placement & Orientation Angle Plan",
    ],
    duration: "1–2 Business Days",
    highlights: ["3D Shadow Simulation", "AP Net-Metering Assessment", "Structural Safety Audit"],
  },
  {
    step: "03",
    tagline: "DAYS 4–7 • ENGINEERING & APPROVALS",
    title: "Customized CAD Design & Subsidy Filing",
    icon: Laptop,
    image: step3Design,
    desc: "Our design team creates customized 3D CAD layouts and Single-Line Diagrams (SLD). We select Tier-1 Mono-PERC / TOPCon bifacial panels, wind-load certified galvanised mounting structures, and manage 100% of DISCOM & subsidy portal paperwork.",
    deliverables: [
      "Custom 3D CAD Rooftop Blueprint & Panel String Layout",
      "Single-Line Diagram (SLD) & Electrical Protection Schematic",
      "Wind-Load Certified Galvanized Structure Design (170 km/h rating)",
      "National Portal PM Surya Ghar Subsidy Registration",
      "Itemized, Transparent BOM Contract with Fixed Price Guarantee",
    ],
    duration: "3–4 Business Days",
    highlights: ["Custom 3D CAD Plan", "Direct DBT Subsidy Filing", "No Hidden Charges"],
  },
  {
    step: "04",
    tagline: "DAYS 8–14 • COMMISSIONING & HANDOVER",
    title: "Installation, Net-Metering & PowerCare Handover",
    icon: Wrench,
    image: step4Installation,
    desc: "Our certified installation crew mounts the system with heavy-duty fasteners, runs UV-resistant DC cabling in conduit pipes, sets up chemical earthing pits (< 2Ω) and lightning protection, followed by DISCOM bi-directional net-meter sync.",
    deliverables: [
      "Precision Rooftop Mounting without Roof Punctures/Leaks",
      "Dual Chemical Earthing Pits & Class-II SPD Surge Arrestors",
      "DISCOM Bi-Directional Net-Meter Synchronization",
      "Mobile IoT App Setup for Real-Time Generation Telemetry",
      "Official 25-Year Panel Warranty & PowerCare 5-Yr Care Pack",
    ],
    duration: "5–7 Business Days",
    highlights: ["DISCOM Testing & Handover", "25-Yr Performance Guarantee", "PowerCare 5-Yr Maintenance"],
  },
];

const COMPARISON = [
  {
    feature: "Rooftop Survey & Engineering",
    amaravati: "3D Digital Shadow Simulation & Structural Load Audit",
    others: "Visual estimate without shadow or load modeling",
  },
  {
    feature: "Component Quality",
    amaravati: "Tier-1 ALMM & BIS Certified Mono-PERC / TOPCon Modules",
    others: "Mixed-tier or non-certified surplus panels",
  },
  {
    feature: "Mounting Structures",
    amaravati: "Hot-Dip Galvanized (80+ microns), 170 km/h wind tested",
    others: "Standard thin iron angles prone to coastal rust",
  },
  {
    feature: "Electrical Safety & Earthing",
    amaravati: "Dedicated chemical earthing pits (< 2Ω) + AC/DC SPD",
    others: "Single pipe earthing or tied to building domestic earth",
  },
  {
    feature: "DISCOM & Subsidy Filing",
    amaravati: "100% turnkey liaisoning until DBT reaches customer bank",
    others: "Customer left to deal with electricity office alone",
  },
  {
    feature: "Post-Sales Service",
    amaravati: "Dedicated PowerCare 5-Year Comprehensive Maintenance",
    others: "No formal maintenance; hard to reach after payment",
  },
];

function ProcessPage() {
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

            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black text-primary uppercase tracking-wider border border-primary/20 shadow-2xs">
              <Sparkles className="size-3" /> TURNKEY SOLAR EPC METHODOLOGY
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#082B4C] tracking-tight">
            Our End-to-End <span className="text-[#E04F16]">Solar Process</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-700 max-w-3xl leading-relaxed font-medium">
            From your very first conversation to 25 years of uninterrupted clean solar energy — we provide a seamless, engineered, and transparent journey with zero guesswork.
          </p>

          {/* 4 Quick Value Highlights */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-orange-200/90 bg-white/90 backdrop-blur-sm p-3.5 text-left shadow-[0_4px_16px_rgba(249,115,22,0.07)] hover:shadow-md hover:border-orange-400 transition-all">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Duration</div>
              <div className="mt-0.5 text-base sm:text-lg font-black text-[#082B4C]">10 – 14 Days</div>
              <div className="text-[10px] text-slate-600 mt-0.5">Quickest turnkey handover</div>
            </div>

            <div className="rounded-xl border border-emerald-200/90 bg-white/90 backdrop-blur-sm p-3.5 text-left shadow-[0_4px_16px_rgba(16,185,129,0.07)] hover:shadow-md hover:border-emerald-400 transition-all">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">DISCOM Approvals</div>
              <div className="mt-0.5 text-base sm:text-lg font-black text-emerald-700">100% Handled</div>
              <div className="text-[10px] text-slate-600 mt-0.5">Net-metering & CEIG testing</div>
            </div>

            <div className="rounded-xl border border-blue-200/90 bg-white/90 backdrop-blur-sm p-3.5 text-left shadow-[0_4px_16px_rgba(14,165,233,0.07)] hover:shadow-md hover:border-blue-400 transition-all">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Govt Subsidy</div>
              <div className="mt-0.5 text-base sm:text-lg font-black text-blue-700">₹78,000 DBT</div>
              <div className="text-[10px] text-slate-600 mt-0.5">Direct to customer bank</div>
            </div>

            <div className="rounded-xl border border-amber-200/90 bg-white/90 backdrop-blur-sm p-3.5 text-left shadow-[0_4px_16px_rgba(245,158,11,0.07)] hover:shadow-md hover:border-amber-400 transition-all">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Aftercare</div>
              <div className="mt-0.5 text-base sm:text-lg font-black text-amber-700">5-Yr PowerCare</div>
              <div className="text-[10px] text-slate-600 mt-0.5">Free scheduled maintenance</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN 4-STEP DETAILED BREAKDOWN */}
      <section className="container-site pt-8 sm:pt-12 space-y-8 sm:space-y-12">
        {PROCESS_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isEven = idx % 2 === 1;

          return (
            <div
              key={step.step}
              className="rounded-3xl border border-slate-200 bg-white shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 items-stretch ${isEven ? "lg:flex-row-reverse" : ""}`}>
                {/* Visual Image Column (5 cols) */}
                <div className={`lg:col-span-5 relative min-h-[260px] sm:min-h-[320px] bg-slate-900 group ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <img
                    src={step.image}
                    alt={step.title}
                    width={800}
                    height={550}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#082B4C]/90 via-[#082B4C]/30 to-transparent" />

                  {/* Step Float Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1 text-xs font-black text-[#082B4C] shadow-md border border-white/60">
                    <span className="text-[#E04F16] font-black text-sm">{step.step}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Phase</span>
                  </div>

                  {/* Duration Pill at bottom */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#082B4C]/90 px-3 py-1 font-bold backdrop-blur">
                      <Clock className="size-3.5 text-amber-400" /> {step.duration}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/90 px-3 py-1 font-bold backdrop-blur">
                      <ShieldCheck className="size-3.5" /> Certified Engineers
                    </span>
                  </div>
                </div>

                {/* Content Column (7 cols) */}
                <div className={`lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <div>
                    <div className="flex items-center gap-2.5 text-[#E04F16] font-black text-xs uppercase tracking-wider">
                      <Icon className="size-4" />
                      <span>{step.tagline}</span>
                    </div>

                    <h2 className="mt-2 text-xl sm:text-2xl font-black text-[#082B4C] tracking-tight">
                      Step {step.step}: {step.title}
                    </h2>

                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed text-left md:text-justify">
                      {step.desc}
                    </p>

                    {/* Key Technical Deliverables List */}
                    <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-100 p-4">
                      <h3 className="text-xs font-black uppercase tracking-wider text-[#082B4C] mb-2.5 flex items-center gap-1.5">
                        <FileCheck2 className="size-3.5 text-[#E04F16]" /> Key Deliverables & Documentation
                      </h3>
                      <ul className="space-y-2 text-xs text-slate-700 font-medium">
                        {step.deliverables.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Highlights Strip */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {step.highlights.map((h, hIdx) => (
                        <span
                          key={hIdx}
                          className="rounded-full bg-orange-100/80 px-2.5 py-0.5 text-[11px] font-bold text-[#E04F16]"
                        >
                          ✓ {h}
                        </span>
                      ))}
                    </div>

                    <Button asChild variant="ghost" size="sm" className="text-xs font-black text-[#082B4C] hover:text-[#E04F16] p-0 h-auto">
                      <Link to="/book-a-demo" className="inline-flex items-center gap-1">
                        Schedule This Step <ArrowRight className="size-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. WHY OUR ENGINEERING METHODOLOGY WINS (COMPARISON TABLE) */}
      <section className="container-site pt-12 sm:pt-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-md">
          <div className="max-w-3xl mb-8">
            <span className="inline-block text-[11px] font-black uppercase tracking-wider text-[#E04F16] bg-[#E04F16]/10 px-3 py-1 rounded-full">
              ENGINEERING INTEGRITY
            </span>
            <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-black text-[#082B4C] tracking-tight">
              Why Amaravati Solar Execution Stands Apart
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Most solar issues arise from cutting corners during survey, structural anchoring, and earthing. Here is how our certified process guarantees 25+ years of trouble-free performance.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-[#082B4C] font-black text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4">Quality Dimension</th>
                  <th className="py-3 px-4 text-[#E04F16]">Amaravati Solar Solutions</th>
                  <th className="py-3 px-4 text-slate-500">Unorganized Local Contractors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {COMPARISON.map((row, idx) => (
                  <tr key={idx} className="hover:bg-orange-50/20 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#082B4C]">{row.feature}</td>
                    <td className="py-3.5 px-4 text-emerald-800 font-bold bg-emerald-50/30 flex items-start gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{row.amaravati}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. BOTTOM ACTION CTA */}
      <section className="container-site pt-12">
        <div className="rounded-3xl bg-gradient-to-r from-[#082B4C] via-[#0b3c6a] to-[#E04F16] p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left max-w-2xl">
            <span className="inline-block text-[11px] font-black uppercase tracking-wider text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/15">
              READY TO COMMENCE?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Book Your Free 3D Rooftop Survey Today
            </h2>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
              No obligations. Our senior solar engineer will visit your premises, run 3D shadow analysis, and deliver a transparent turnkey proposal within 24 hours.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Button asChild size="lg" className="rounded-full bg-white text-[#082B4C] hover:bg-slate-100 font-black text-xs sm:text-sm shadow-lg h-12 px-6 active:scale-95 transition-all">
              <Link to="/book-a-demo">
                <span>Book Free Site Survey</span>
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

