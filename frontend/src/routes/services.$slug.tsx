import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BatteryCharging,
  CheckCircle2,
  ChevronDown,
  Clock,
  Coins,
  Cpu,
  FileCheck2,
  Headphones,
  HelpCircle,
  Layers,
  Leaf,
  Maximize2,
  Phone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sun,
  TrendingDown,
  TrendingUp,
  Wrench,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { COMPANY, SERVICES } from "@/lib/site-data";
import { setupParallaxAndPopAnimation } from "@/lib/parallax-animation";

// High-Resolution Equipment Showcase Assets
import heroSunriseClassic from "@/assets/hero-sunrise-classic.jpg";
import projectResidentialInverter from "@/assets/project-residential-inverter-10kw.jpg";
import projectIndustrialClamps from "@/assets/project-industrial-metal-roof-clamps.jpg";
import projectCorporateBifacial from "@/assets/project-corporate-bifacial-modules.jpg";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.service.title} — Amaravati Solar Solutions` },
          { name: "description", content: loaderData.service.short },
          { property: "og:title", content: `${loaderData.service.title} — Amaravati Solar Solutions` },
          { property: "og:description", content: loaderData.service.short },
        ]
      : [{ title: "Service not found" }, { name: "robots", content: "noindex" }],
  }),
  component: ServiceDetail,
});

const FOUR_STEP_PROCESS = [
  { step: "01", time: "Day 1", title: "Site Inspection & 3D CAD Shadow Analysis", desc: "Drone survey, structural roof load testing, and accurate solar generation simulation." },
  { step: "02", time: "Day 2–3", title: "Custom Engineering & Electrical Design", desc: "Wind-load certified mounting structures, Tier-1 Mono-PERC / TOPCon modules, and SLD layout." },
  { step: "03", time: "Day 4–7", title: "100% DISCOM Net-Metering Liaisoning", desc: "National subsidy portal registration, CEIG electrical safety sanction, and bi-directional meter synchronization." },
  { step: "04", time: "Day 8–10", title: "Precision Commissioning & PowerCare 5-Yr Support", desc: "Safe commissioning, live mobile IoT generation telemetry, and scheduled preventive maintenance." },
];

const CERTIFIED_COMPONENTS = [
  { icon: Sun, title: "Tier-1 Solar Modules", spec: "550W+ Bifacial / Mono-PERC, 22.4% efficiency", warranty: "25-Year Linear Warranty" },
  { icon: Cpu, title: "Smart Grid Inverter", spec: "High-efficiency MPPT, IP65 rated, dual-string", warranty: "10-Year Inverter Warranty" },
  { icon: Layers, title: "HDG Mounting Structure", spec: "Hot-dip galvanized, rated for 170 km/h wind speeds", warranty: "15-Year Rust-Free Guarantee" },
  { icon: Zap, title: "Dual Protection DB Box", spec: "Type-II SPD, DC/AC MCB & ELCB surge arrestors", warranty: "IS/IEC Compliant" },
  { icon: FileCheck2, title: "Bi-Directional Net-Meter", spec: "Utility-grade smart meter with DISCOM AP/TG sync", warranty: "DISCOM Approved" },
  { icon: Smartphone, title: "WiFi Cloud Telemetry", spec: "Real-time generation & savings tracking on mobile app", warranty: "Lifetime Cloud Access" },
];

const FAQS = [
  {
    q: "How does the PM Surya Ghar government subsidy work?",
    a: "Eligible residential consumers receive up to ₹78,000 direct bank transfer (DBT) subsidy from the central government. Our team registers and handles 100% of the portal documentation, DISCOM inspection, and subsidy credit on your behalf.",
  },
  {
    q: "Will solar panel installation damage my rooftop?",
    a: "No. We utilize non-penetrative anchoring or chemically sealed civil pedestals with multi-layer waterproof membrane treatment. Your roof integrity remains 100% leak-proof and structurally sound.",
  },
  {
    q: "Does the system generate electricity during rainy or cloudy days?",
    a: "Yes. Our Tier-1 TOPCon and Mono-PERC modules are engineered with advanced low-light response technology, generating 30% to 65% of normal capacity even during overcast coastal weather.",
  },
  {
    q: "What maintenance is required for the solar rooftop system?",
    a: "Minimal. Simply rinsing the panels with normal clean water every 2–3 weeks keeps output optimal. All electrical diagnostics, connection health, and annual inspections are covered under our 5-Year PowerCare guarantee.",
  },
];

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    return setupParallaxAndPopAnimation();
  }, [service.slug]);

  // Gallery equipment items
  const galleryItems = [
    { title: "System Architecture", image: service.image, caption: `${service.title} — Turnkey Rooftop Installation` },
    { title: "Smart Inverter & DB", image: projectResidentialInverter, caption: "High-Efficiency Smart Inverter & Surge Protection DB" },
    { title: "Wind-Certified Mounts", image: projectIndustrialClamps, caption: "Hot-Dip Galvanized 170 km/h Wind-Load Mounting Structure" },
    { title: "Tier-1 Modules", image: projectCorporateBifacial, caption: "Certified High-Efficiency Mono-PERC / TOPCon Solar Panels" },
  ];

  // Capacity Matrix Sizing Guide
  const sizingMatrix = [
    { capacity: "3 kW", units: "360 – 400 Units", savings: "₹3,200 – ₹3,600", subsidy: "₹78,000", roof: "280 – 300 sq.ft", ideal: "3BHK Homes & Villas" },
    { capacity: "5 kW", units: "600 – 680 Units", savings: "₹5,500 – ₹6,200", subsidy: "₹78,000", roof: "450 – 500 sq.ft", ideal: "Duplexes & Heavy AC Usage" },
    { capacity: "10 kW", units: "1,200 – 1,350 Units", savings: "₹11,000 – ₹13,000", subsidy: "₹78,000", roof: "900 – 1,000 sq.ft", ideal: "Commercial & Luxury Villas" },
    { capacity: "25 kW+", units: "3,000 – 3,500 Units", savings: "₹30,000 – ₹35,000", subsidy: "Tax Dep. 40%", roof: "2,200+ sq.ft", ideal: "Industries & Offices" },
  ];

  // Other related services for cross-navigation
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <div className="bg-transparent pb-20 relative">
      
      {/* 1. CINEMATIC LUXURY HEADER BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#082B4C] via-[#0D3B66] to-[#082B4C] text-white pt-6 pb-9 border-b border-orange-500/30">
        <div className="absolute -top-24 -right-24 size-96 rounded-full bg-[#E04F16]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 size-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="container-site relative z-10">
          {/* Breadcrumb & Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <Link
              to="/solar-solutions"
              className="group inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="size-3.5 text-[#E04F16] transition-transform duration-200 group-hover:-translate-x-1" />
              <span>Back to All Solar Solutions</span>
            </Link>

            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md px-3 py-1 text-[11px] font-black uppercase tracking-wider text-orange-300">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>PM SURYA GHAR EMPANELLED EPC</span>
            </div>
          </div>

          {/* Title & Quick Hook */}
          <div className="max-w-4xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black tracking-tight text-white leading-tight">
              {service.title}
            </h1>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed font-normal">
              {service.short}
            </p>
          </div>

          {/* Quick Metrics Bar (High-Density Trust Badges) */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-4xl">
            <div className="flex items-center gap-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-2 text-white">
              <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
                <TrendingDown className="size-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">Bill Savings</span>
                <span className="text-xs sm:text-sm font-black text-white">Up to 90%</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-2 text-white">
              <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-orange-500/20 text-orange-400 border border-orange-400/30">
                <Zap className="size-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">Govt. Subsidy</span>
                <span className="text-xs sm:text-sm font-black text-white">₹78,000 DBT</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-2 text-white">
              <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-sky-500/20 text-sky-400 border border-sky-400/30">
                <Clock className="size-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">Payback Time</span>
                <span className="text-xs sm:text-sm font-black text-white">3 – 4 Years</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-2 text-white">
              <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-amber-500/20 text-amber-400 border border-amber-400/30">
                <ShieldCheck className="size-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">Performance</span>
                <span className="text-xs sm:text-sm font-black text-white">25-Yr Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN SYSTEM CONTENT & STICKY SIDEBAR */}
      <div className="container-site pt-7 sm:pt-9 grid gap-8 lg:grid-cols-12 items-start">
        
        {/* LEFT COLUMN (8 Columns): Interactive Showcase, Sizing, Architecture, Inclusions, Process, FAQ */}
        <div className="lg:col-span-8 space-y-7 sm:space-y-9">

          {/* A. COMPACT INTERACTIVE EQUIPMENT SHOWCASE (Proportioned, NOT bloated!) */}
          <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-3 sm:p-4 shadow-sm">
            
            {/* Main Active Image Frame (Proportioned ~340px-380px, NOT viewport height) */}
            <div className="relative h-[240px] sm:h-[320px] md:h-[360px] w-full overflow-hidden rounded-xl bg-slate-900 group">
              <img
                src={galleryItems[activePhotoIndex].image}
                alt={galleryItems[activePhotoIndex].caption}
                width={1200}
                height={700}
                loading="eager"
                className="h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

              {/* Top Floating Technical Badges */}
              <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                <span className="rounded-full bg-[#082B4C]/90 backdrop-blur-md px-3 py-1 text-[11px] font-black text-white border border-white/15 shadow-sm">
                  {service.title}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/95 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white shadow-sm">
                  <ShieldCheck className="size-3.5" /> 25-Year Performance Warranty
                </span>
              </div>

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
                <span className="text-xs sm:text-sm font-bold text-white/95 drop-shadow-md">
                  {galleryItems[activePhotoIndex].caption}
                </span>
                <span className="text-[10px] sm:text-[11px] font-black text-orange-300 bg-black/60 px-2 py-0.5 rounded-md">
                  {activePhotoIndex + 1} / {galleryItems.length}
                </span>
              </div>
            </div>

            {/* Clickable Equipment Thumbnail Bar */}
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {galleryItems.map((item, idx) => (
                <button
                  key={item.title}
                  type="button"
                  data-unstyled="true"
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`unstyled-btn flex items-center gap-2 rounded-lg border p-1.5 text-left transition-all ${
                    activePhotoIndex === idx
                      ? "border-[#E04F16] bg-orange-50/80 shadow-xs ring-1 ring-[#E04F16]"
                      : "border-slate-200 bg-slate-50/60 hover:bg-slate-100 hover:border-slate-300 text-slate-600"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="size-10 rounded-md object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="block truncate text-[11px] font-black text-[#082B4C]">
                      {item.title}
                    </span>
                    <span className="block text-[9px] text-slate-500 font-semibold">
                      Click to View
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* B. DETAILED ENGINEERING OVERVIEW & VALUE PROPOSITION */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1 w-6 rounded-full bg-[#E04F16]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#E04F16]">
                TECHNICAL ARCHITECTURE
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#082B4C] tracking-tight">
              Engineering Overview & System Topology
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {service.description}
            </p>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              At Amaravati Solar Solutions, every installation begins with careful technical assessment. We model seasonal solar irradiance across coastal Andhra Pradesh and Telangana, engineer structural load tolerances for tropical gale-force winds, and select certified Tier-1 Mono-PERC or TOPCon bifacial modules paired with high-efficiency smart inverters.
            </p>
          </div>

          {/* C. CAPACITY SIZING & FINANCIAL ROI MATRIX (Client WOW Feature!) */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#E04F16] bg-orange-50 border border-orange-200/60 px-2.5 py-0.5 rounded-md">
                  SIZING & ROI GUIDE
                </span>
                <h3 className="mt-1 text-lg sm:text-xl font-black text-[#082B4C]">
                  System Capacity & Estimated Financial Return
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                DISCOM Tariff: ₹7.50 – ₹9.50/unit
              </span>
            </div>

            {/* Responsive Table / Cards Grid */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-black text-[#082B4C] uppercase tracking-wider">
                    <th className="py-2.5 px-3">System Size</th>
                    <th className="py-2.5 px-3">Monthly Yield</th>
                    <th className="py-2.5 px-3">Monthly Savings</th>
                    <th className="py-2.5 px-3">Govt. Subsidy</th>
                    <th className="py-2.5 px-3">Roof Area Needed</th>
                    <th className="py-2.5 px-3">Ideal Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sizingMatrix.map((row) => (
                    <tr key={row.capacity} className="hover:bg-orange-50/40 transition-colors">
                      <td className="py-3 px-3 font-black text-[#E04F16] whitespace-nowrap">
                        {row.capacity}
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-700 whitespace-nowrap">
                        {row.units}
                      </td>
                      <td className="py-3 px-3 font-extrabold text-emerald-600 whitespace-nowrap">
                        {row.savings}
                      </td>
                      <td className="py-3 px-3 font-bold text-[#082B4C] whitespace-nowrap">
                        <span className="rounded bg-orange-100/70 text-[#E04F16] px-2 py-0.5 font-black text-[10px]">
                          {row.subsidy}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                        {row.roof}
                      </td>
                      <td className="py-3 px-3 text-slate-700 font-medium">
                        {row.ideal}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>* Actual savings vary based on roof tilt, shade and seasonal sunlight hours.</span>
              <Link to="/book-a-demo" className="font-bold text-[#E04F16] hover:underline">
                Request Exact 3D Cad Simulation →
              </Link>
            </div>
          </div>

          {/* D. CERTIFIED BILL OF MATERIALS (BOM) — 6 Components Included */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs">
            <div className="mb-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-md">
                HARDWARE SPECIFICATIONS
              </span>
              <h3 className="mt-1 text-lg sm:text-xl font-black text-[#082B4C]">
                Turnkey Hardware & Certified Components Included
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {CERTIFIED_COMPONENTS.map((comp) => {
                const Icon = comp.icon;
                return (
                  <div
                    key={comp.title}
                    className="flex flex-col justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 hover:border-orange-200 hover:bg-orange-50/20 transition-all"
                  >
                    <div>
                      <div className="grid size-8 place-items-center rounded-lg bg-orange-100/70 text-[#E04F16] mb-2">
                        <Icon className="size-4" />
                      </div>
                      <h4 className="text-xs font-black text-[#082B4C]">{comp.title}</h4>
                      <p className="mt-1 text-[11px] text-slate-600 leading-snug">{comp.spec}</p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                      <ShieldCheck className="size-3" />
                      <span>{comp.warranty}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* E. KEY ADVANTAGES & SUITABLE APPLICATIONS (Side-by-Side Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            
            {/* Advantages */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="grid size-8 place-items-center rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                  <CheckCircle2 className="size-4" />
                </div>
                <h3 className="text-sm sm:text-base font-black text-[#082B4C]">
                  Key Engineering Advantages
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Applications */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="grid size-8 place-items-center rounded-lg bg-blue-50 text-blue-600 border border-blue-200/60">
                  <Wrench className="size-4" />
                </div>
                <h3 className="text-sm sm:text-base font-black text-[#082B4C]">
                  Best Suited For
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                {service.applications.map((a) => (
                  <li key={a} className="flex items-start gap-2.5">
                    <span className="size-2 rounded-full bg-[#E04F16] mt-1.5 shrink-0" />
                    <span className="leading-snug">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* F. 4-STEP TURNKEY EXECUTION PROCESS */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs">
            <div className="mb-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#E04F16] bg-orange-50 border border-orange-200/60 px-2.5 py-0.5 rounded-md">
                OUR METHODOLOGY
              </span>
              <h3 className="mt-1 text-lg sm:text-xl font-black text-[#082B4C]">
                How We Execute Your Solar Installation
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {FOUR_STEP_PROCESS.map((p) => (
                <div key={p.step} className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 text-left">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="grid size-6 place-items-center rounded-full bg-[#E04F16] text-[11px] font-black text-white">
                        {p.step}
                      </span>
                      <h4 className="text-xs font-black text-[#082B4C] leading-snug">{p.title}</h4>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {p.time}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed pl-8">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* G. FREQUENTLY ASKED QUESTIONS (Accordion) */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs">
            <div className="mb-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#082B4C] bg-slate-100 px-2.5 py-0.5 rounded-md">
                QUESTIONS & CLARIFICATIONS
              </span>
              <h3 className="mt-1 text-lg sm:text-xl font-black text-[#082B4C]">
                Frequently Asked Questions About {service.title}
              </h3>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.q}
                    className="overflow-hidden rounded-xl border border-slate-200/85 bg-white shadow-2xs transition-all"
                  >
                    <button
                      type="button"
                      data-unstyled="true"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className={`unstyled-btn w-full flex items-center justify-between gap-3 p-4 text-left text-xs sm:text-sm font-black transition-all select-none ${
                        isOpen
                          ? "bg-gradient-to-r from-[#D9410E] via-[#E04F16] to-[#F97316] text-white shadow-sm"
                          : "bg-white hover:bg-orange-50/40 text-[#082B4C] hover:text-[#E04F16]"
                      }`}
                    >
                      <span className={`leading-snug ${isOpen ? "text-white font-black" : "text-[#082B4C] font-black"}`}>
                        {faq.q}
                      </span>
                      <div
                        className={`grid size-7 place-items-center rounded-full shrink-0 transition-transform duration-200 ${
                          isOpen
                            ? "bg-white/20 text-white rotate-180"
                            : "bg-orange-50 text-[#E04F16] border border-orange-200/60"
                        }`}
                      >
                        <ChevronDown className="size-4" />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="p-4 sm:p-5 bg-white text-xs sm:text-sm text-slate-700 font-medium leading-relaxed border-t border-orange-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (4 Columns): Sticky Proposal Card & Direct Technical Assistance */}
        <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
          
          {/* Main Action Proposal Card */}
          <div className="rounded-2xl border border-orange-200/80 bg-gradient-to-br from-[#082B4C] via-[#093259] to-[#082B4C] text-white p-5 sm:p-6 shadow-md text-left relative overflow-hidden">
            <div className="absolute -top-12 -right-12 size-36 rounded-full bg-[#E04F16]/20 blur-xl pointer-events-none" />

            <span className="inline-block text-[10px] font-black uppercase tracking-wider text-orange-300 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
              FREE TECHNICAL SURVEY
            </span>
            <h3 className="mt-2.5 text-lg sm:text-xl font-black text-white leading-tight">
              Request Customized Proposal for {service.title}
            </h3>
            <p className="mt-2 text-xs text-white/80 leading-relaxed">
              Our certified technical engineers in Vijayawada will inspect your rooftop, compute exact shadow tolerance, and calculate your net financial savings.
            </p>

            <div className="mt-5 space-y-2.5">
              <Button asChild variant="cta" className="w-full h-11 rounded-[30px] bg-gradient-to-r from-[#D9410E] via-[#E04F16] to-[#F97316] text-white font-bold text-xs shadow-md hover:shadow-lg">
                <Link to="/book-a-demo" search={{ service: service.title, type: "Residential", tab: "calendar" }}>
                  Book Free Site Survey
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full h-10 rounded-[30px] border-white/30 bg-white/10 text-white hover:bg-white hover:text-[#082B4C] font-bold text-xs">
                <Link to="/book-a-demo" search={{ service: service.title, type: "Residential", tab: "proposal" }}>
                  Request Detailed Quote
                </Link>
              </Button>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/80">
              <span>Need immediate assistance?</span>
              <a
                href={`tel:${COMPANY.phone.replace(/[^0-9+]/g, "")}`}
                className="font-bold text-amber-300 hover:text-white flex items-center gap-1 transition-colors"
              >
                <Phone className="size-3 text-amber-300" />
                <span>Call Now</span>
              </a>
            </div>
          </div>

          {/* Regulatory & Engineering Accreditations */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 text-xs shadow-2xs space-y-2.5">
            <div className="text-xs font-black text-[#082B4C] uppercase tracking-wider">
              Engineering Certifications:
            </div>
            <div className="space-y-1.5 text-[11px] text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                <span>PM Surya Ghar Portal Empanelled EPC</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                <span>APCPDCL / APEPDCL / TGSPDCL Net-Metering Sync</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                <span>CEIG Electrical Inspectorate Sanctions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                <span>Tier-1 Modules with 25-Year Performance</span>
              </div>
            </div>
          </div>

          {/* Quick Support & Office Card */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 text-xs shadow-2xs space-y-2">
            <div className="font-bold text-[#082B4C]">Corporate Technical Office:</div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              {COMPANY.address}
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
              <span>Working Hours:</span>
              <span className="text-[#082B4C] font-bold">Mon - Sat: 10AM - 7PM</span>
            </div>
          </div>

          {/* Explore Other Services */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs">
            <div className="text-xs font-black text-[#082B4C] uppercase tracking-wider mb-2.5">
              Other Specialized Solutions:
            </div>
            <ul className="space-y-2 text-xs">
              {otherServices.map((os) => (
                <li key={os.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: os.slug }}
                    className="flex items-center justify-between text-slate-700 hover:text-[#E04F16] font-bold transition-colors group py-1"
                  >
                    <span>{os.title}</span>
                    <ArrowRight className="size-3 text-slate-400 group-hover:text-[#E04F16] group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </aside>
      </div>
    </div>
  );
}
