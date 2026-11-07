import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BatteryCharging,
  CheckCircle2,
  Clock,
  HelpCircle,
  Phone,
  PlugZap,
  ShieldCheck,
  Sparkles,
  Sun,
  Zap,
} from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import heroSunriseClassic from "@/assets/hero-sunrise-classic.jpg";
import projectResidentialRooftopPergola from "@/assets/project-residential-rooftop-pergola.jpg";
import projectHybridStorageVilla from "@/assets/project-hybrid-storage-villa-8kw.jpg";
import projectCommercialRooftop from "@/assets/project-commercial-rooftop-75kwp.jpg";
import projectAgriculturalSolarPump from "@/assets/project-agricultural-solar-pump-25hp.jpg";
import solarWatermark from "@/assets/solar-watermark-bg.jpg";
import { COMPANY } from "@/lib/site-data";
import { setupParallaxAndPopAnimation } from "@/lib/parallax-animation";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/solar-solutions")({
  head: () => ({
    meta: [
      { title: "Solar Solutions & Systems — On-Grid, Off-Grid, Hybrid | Amaravati Solar Solutions" },
      {
        name: "description",
        content:
          "Explore On-Grid, Off-Grid, and Hybrid rooftop solar power architectures by Amaravati Solar Solutions. Tailored for homes, commercial complexes, and industries across AP with ₹78,000 PM Surya Ghar subsidy support and 25-year warranty.",
      },
      {
        name: "keywords",
        content:
          "on grid solar system andhra pradesh, off grid solar power, hybrid solar inverter, rooftop solar solutions amaravati, commercial solar systems vijayawada, residential solar panels guntur, solar power plant cost ap",
      },
      { property: "og:title", content: "Turnkey Solar Solutions: On-Grid, Off-Grid & Hybrid — Amaravati Solar Solutions" },
      {
        property: "og:description",
        content:
          "Turnkey rooftop and ground-mounted solar solutions: On-Grid, Off-Grid, and Hybrid systems with government subsidy assistance, net metering, and 25-year panel warranty.",
      },
      { property: "og:url", content: "https://amaravatisolarsolutions.com/solar-solutions" },
      { property: "og:image", content: "https://amaravatisolarsolutions.com/assets/hero-amaravati-exact-panoramic.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Solar Solutions & Systems — Amaravati Solar Solutions" },
      {
        name: "twitter:description",
        content:
          "High-efficiency solar solutions for residential, commercial & industrial clients across Andhra Pradesh.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://amaravatisolarsolutions.com/solar-solutions" },
    ],
  }),
  component: SolarSolutionsPage,
});

const SOLUTIONS_CATALOG = [
  {
    id: "on-grid",
    badge: "MOST POPULAR • MAXIMUM SUBSIDY",
    title: "A) On - Grid Rooftop Solar Systems",
    shortTitle: "On-Grid Solar",
    slug: "on-grid-solar-systems",
    image: heroSunriseClassic,
    tagline: "Grid-connected system delivering up to 90% monthly electricity bill reduction through net-metering.",
    description:
      "An on-grid rooftop solar system works in tandem with your existing DISCOM utility power supply. During sunny hours, solar electricity powers your premises first. Any surplus generation is automatically exported back to the grid via a bi-directional net-meter, earning credits that drastically reduce your monthly power bill.",
    highlights: [
      "Up to 90% monthly utility electricity bill reduction",
      "PM Surya Ghar Muft Bijli Yojana subsidy eligible (up to ₹78,000)",
      "Zero battery maintenance overhead and longest component lifespan",
      "Fastest return on investment (complete capital payback in 3–4 years)",
      "Bi-directional net-metering synchronization with APCPDCL / APEPDCL / TGSPDCL",
      "25-year linear performance warranty on Tier-1 mono-PERC panels",
    ],
    specs: [
      { label: "Storage", value: "Grid-Tied (No Batteries)" },
      { label: "Payback", value: "3 – 4 Years" },
      { label: "Subsidy", value: "Up to ₹78,000 DBT" },
      { label: "Ideal For", value: "Homes, Villas & Commercial" },
    ],
  },
  {
    id: "off-grid",
    badge: "100% SELF-RELIANT • COMPLETE INDEPENDENCE",
    title: "B) Off - Grid Rooftop Solar Systems",
    shortTitle: "Off-Grid Solar",
    slug: "off-grid-solar-systems",
    image: projectResidentialRooftopPergola,
    tagline: "Independent solar power with dedicated battery storage for 100% energy self-reliance.",
    description:
      "Off-grid solar systems operate independently of the electric utility grid. High-capacity battery storage banks store daytime surplus generation, ensuring 24/7 continuous electricity even in areas with frequent power cuts, voltage fluctuations, or zero grid access.",
    highlights: [
      "100% complete grid independence — zero monthly electricity bills",
      "Uninterrupted 24/7 power for farmhouses, resorts, and gated villas",
      "High-density Lithium-ion (LiFePO4) or deep-cycle tubular battery banks",
      "Runs heavy motor machinery, air conditioners, water pumps, and appliances",
      "Integrated smart generator auto-start (AMF) for extended cloudy spells",
      "Built-in multi-stage lightning and electrical surge arrestors",
    ],
    specs: [
      { label: "Storage", value: "Dedicated Battery Bank" },
      { label: "Grid Need", value: "Zero (100% Standalone)" },
      { label: "Power Cut", value: "Zero Interruption" },
      { label: "Ideal For", value: "Farmhouses, Estates & Remote Sites" },
    ],
  },
  {
    id: "hybrid",
    badge: "SMART DUAL-MODE • STORAGE + NET-METERING",
    title: "C) Hybrid Rooftop Solar Systems",
    shortTitle: "Hybrid Solar",
    slug: "hybrid-solar-systems",
    image: projectHybridStorageVilla,
    tagline: "The best of both worlds: Daytime grid export plus seamless nighttime battery backup.",
    description:
      "A hybrid solar architecture combines grid synchronization with intelligent battery storage. When utility power is active, you enjoy all the cost-saving benefits of net-metering. If the grid fails, intelligent inverters switch to battery backup in milliseconds without restarting computers or appliances.",
    highlights: [
      "Sub-20 millisecond automatic switchover — zero computer or TV reboot",
      "Export surplus solar units to grid while keeping batteries 100% charged",
      "Compact wall-mounted modular Lithium Iron Phosphate (LiFePO4) batteries",
      "Smart app telemetry: control grid-import, battery-priority, and export ratios",
      "Protection against frequent load-shedding and severe grid voltage surges",
      "Tier-1 hybrid smart inverter with dual MPPT trackers and 10-year warranty",
    ],
    specs: [
      { label: "Storage", value: "Wall-Mount Lithium" },
      { label: "Switchover", value: "< 20 Milliseconds" },
      { label: "Net-Meter", value: "Fully Supported" },
      { label: "Ideal For", value: "Offices, Hospitals & Luxury Homes" },
    ],
  },
  {
    id: "commercial",
    badge: "HIGH ROI • ACCELERATED DEPRECIATION",
    title: "D) Commercial & Industrial Solar Solutions",
    shortTitle: "Commercial & Industrial",
    slug: "commercial-solar-installations",
    image: projectCommercialRooftop,
    tagline: "High-yield 25 kW to 500 kW+ turnkey solar plants slashing operating expenditure for enterprises.",
    description:
      "Engineered for educational institutions, healthcare facilities, cold storage units, and manufacturing plants. Turn empty rooftops and factory sheds into dependable green power stations, locking in low power tariffs for 25 years with maximum tax savings via 40% accelerated depreciation.",
    highlights: [
      "Cut commercial & industrial electricity tariffs (HT/LT slabs) up to 80%",
      "40% Accelerated Depreciation tax benefit in the very first fiscal year",
      "Custom elevated superstructures maintaining full rooftop utility",
      "Tier-1 TOPCon bifacial modules paired with smart IP65 multi-MPPT inverters",
      "Comprehensive statutory approvals: CEIG safety clearance and DISCOM sync",
      "Flexible CapEx and OPEX / RESCO zero-investment power purchase models",
    ],
    specs: [
      { label: "Plant Scale", value: "25 kW to 1 MW+" },
      { label: "Payback", value: "3 – 4 Years" },
      { label: "Tax Benefit", value: "40% Accelerated Depr." },
      { label: "Ideal For", value: "Factories, Hospitals & Colleges" },
    ],
  },
  {
    id: "agricultural",
    badge: "PM-KUSUM SUBSIDY • ZERO DIESEL EXPENSE",
    title: "E) Agricultural Solar Water Pumping Systems",
    shortTitle: "Agricultural Solar",
    slug: "agricultural-solar-water-pumps",
    image: projectAgriculturalSolarPump,
    tagline: "Heavy-duty 3 HP to 25 HP solar water pumping arrays ensuring reliable daytime crop irrigation.",
    description:
      "Designed specifically for agricultural farms, orchards, and aquaculture across Andhra Pradesh and Telangana. Operates submersible and open-well water pumps directly from solar arrays with smart VFD controllers, freeing farmers from erratic night-time grid power and costly diesel pumps.",
    highlights: [
      "Up to 60% PM-KUSUM Central & State Government subsidies supported",
      "100% elimination of expensive diesel fuel expenditure",
      "Smart VFD pump controller with MPPT for high discharge even in low light",
      "Automated dry-run sensor protection and motor overload safeguards",
      "Heavy-duty galvanized mounting structures with manual seasonal tilt",
      "Supports drip irrigation, canal flooding, and commercial borewells",
    ],
    specs: [
      { label: "Pump Power", value: "3 HP to 25 HP" },
      { label: "Govt Subsidy", value: "Up to 60% (PM-KUSUM)" },
      { label: "Fuel Cost", value: "₹0 (Zero Diesel)" },
      { label: "Ideal For", value: "Farms, Orchards & Aquaculture" },
    ],
  },
];

const COMPARISON_ROWS = [
  { feature: "Primary Function", onGrid: "Cut electricity bills", offGrid: "100% Power self-reliance", hybrid: "Bill savings + Blackout backup" },
  { feature: "Grid Connection", onGrid: "Required (Mandatory)", offGrid: "Not required (Standalone)", hybrid: "Connected + Backup Battery" },
  { feature: "Battery Storage", onGrid: "None", offGrid: "High-capacity battery bank", hybrid: "Lithium storage included" },
  { feature: "Power During Outage", onGrid: "Shuts down for line safety", offGrid: "Continuous 24/7 power", hybrid: "Instant millisecond switchover" },
  { feature: "Government Subsidy", onGrid: "Eligible (up to ₹78,000)", offGrid: "Not eligible for rooftop subsidy", hybrid: "Eligible on solar portion" },
  { feature: "Capital Payback (ROI)", onGrid: "3 to 4 Years", offGrid: "5 to 6 Years", hybrid: "4 to 5 Years" },
  { feature: "Maintenance Overhead", onGrid: "Near zero (only panel cleaning)", offGrid: "Periodic battery monitoring", hybrid: "Zero maintenance (Lithium BMS)" },
  { feature: "Best Suited For", onGrid: "Urban homes & businesses", offGrid: "Farmhouses, agriculture & remote", hybrid: "Hospitals, offices & luxury villas" },
];

function SolarSolutionsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    return setupParallaxAndPopAnimation();
  }, []);

  return (
    <div className="bg-transparent pb-16 relative">
      {/* 1. HERO HEADER WITH WARM SOLAR AMBIENT TINT */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-50/90 via-white/80 to-amber-50/70 backdrop-blur-md border-b border-orange-200/90 pt-3.5 pb-5 sm:pb-6">
        {/* Subtle Solar Watermark Decoration in Header */}
        <div
          className="absolute -right-8 -bottom-8 w-80 sm:w-96 h-48 sm:h-56 opacity-[0.09] pointer-events-none select-none bg-contain bg-no-repeat bg-right-bottom mix-blend-multiply"
          style={{ backgroundImage: `url(${solarWatermark})` }}
        />
        <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-orange-400/10 blur-3xl pointer-events-none" />

        <div className="container-site relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-primary transition-colors"
            >
              <ArrowLeft className="size-3.5 text-primary" /> Back to Home
            </Link>

            <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold text-primary border border-primary/20 shadow-2xs">
              <Sparkles className="size-3" /> TURNKEY SOLAR ARCHITECTURES
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#082B4C] tracking-tight">
            Our Solar Solutions
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-700 max-w-none leading-relaxed font-medium">
            Engineered rooftop and ground-mounted solar power systems: On-Grid, Off-Grid, and Hybrid architectures built with Tier-1 components for Andhra Pradesh & Telangana.
          </p>

          {/* Quick jump anchor buttons */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {SOLUTIONS_CATALOG.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-orange-200/90 bg-[#FFFDF9] px-3.5 py-1 text-xs font-bold text-[#082B4C] hover:border-[#E04F16] hover:text-[#E04F16] transition-colors shadow-2xs cursor-pointer select-none"
              >
                <Zap className="size-3 text-[#E04F16]" />
                <span>{s.shortTitle}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 2. 3 DETAILED SOLUTION BLOCKS */}
      <div className="container-site pt-6 sm:pt-8 space-y-8 sm:space-y-10">
        {SOLUTIONS_CATALOG.map((solution, index) => {
          const isEven = index % 2 === 0;

          return (
            <section
              key={solution.id}
              id={solution.id}
              className="scroll-mt-24 sm:scroll-mt-28 rounded-none border border-orange-200/80 bg-gradient-to-br from-[#FFFDF9] via-white to-[#FFF5EA] p-5 sm:p-7 md:p-8 shadow-[0_4px_16px_rgba(224,79,22,0.06)] transition-all hover:shadow-[0_16px_36px_rgba(224,79,22,0.12)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                {/* Image Viewport */}
                <div className={cn("lg:col-span-5", isEven ? "lg:order-2" : "lg:order-1")}>
                  <div className="relative aspect-[16/11] w-full overflow-hidden rounded-none border border-orange-200/80 shadow-sm bg-slate-100 group">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      width={800}
                      height={550}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-none bg-[#082B4C]/95 backdrop-blur px-3 py-1 text-xs font-bold text-white shadow-xs">
                      {solution.shortTitle} Architecture
                    </span>
                  </div>

                  {/* 4 Mini Spec Metric Boxes Below Image */}
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {solution.specs.map((sp, idx) => (
                      <div
                        key={idx}
                        className="rounded-none border border-orange-200/70 bg-white p-2.5 text-left shadow-2xs"
                      >
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          {sp.label}
                        </div>
                        <div className="mt-0.5 text-xs sm:text-[13px] font-black text-[#082B4C] leading-snug">
                          {sp.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content Column */}
                <div className={cn("lg:col-span-7", isEven ? "lg:order-1" : "lg:order-2")}>
                  <span className="inline-block text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#E04F16] bg-[#E04F16]/10 border border-[#E04F16]/20 px-2.5 py-0.5 rounded-none">
                    {solution.badge}
                  </span>

                  <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-black text-[#082B4C] tracking-tight">
                    {solution.title}
                  </h2>

                  <p className="mt-1.5 text-xs sm:text-sm font-semibold text-primary leading-snug">
                    {solution.tagline}
                  </p>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed text-left md:text-justify">
                    {solution.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="mt-4 pt-3 border-t border-orange-100/80">
                    <div className="text-xs font-bold text-[#082B4C] uppercase tracking-wider mb-2">
                      Key Engineering Advantages:
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                      {solution.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="size-3.5 shrink-0 text-emerald-600 mt-0.5" />
                          <span className="leading-tight">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action CTAs */}
                  <div className="mt-5 pt-4 border-t border-orange-100/80 flex flex-wrap items-center gap-3">
                    <Button asChild variant="cta" size="sm" className="h-8 px-4 text-xs font-bold rounded-[30px] bg-gradient-to-r from-[#D9410E] via-[#E04F16] to-[#F97316] text-white shadow-sm hover:shadow-md">
                      <Link to="/book-a-demo" search={{ service: solution.title, type: "Residential", tab: "calendar" }}>
                        Book Free Site Survey
                      </Link>
                    </Button>

                    <Button asChild variant="outline" size="sm" className="h-8 px-4 text-xs font-bold rounded-[30px] border border-orange-300 bg-white text-[#B83A16] hover:bg-[#E04F16] hover:text-white hover:border-[#E04F16]">
                      <Link to="/services/$slug" params={{ slug: solution.slug }}>
                        <span>Detailed Overview</span>
                        <ArrowRight className="size-3.5 ml-1" />
                      </Link>
                    </Button>

                    <a
                      href={`tel:${COMPANY.phone.replace(/[^0-9+]/g, "")}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-primary transition-colors ml-auto"
                    >
                      <Phone className="size-3.5 text-primary" />
                      <span>Speak with Solar Engineer</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* 3. COMPREHENSIVE COMPARISON MATRIX */}
        <section className="rounded-none border border-orange-200/80 bg-white p-5 sm:p-7 md:p-8 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#E04F16] bg-[#E04F16]/10 border border-[#E04F16]/20 px-3 py-0.5 rounded-none inline-block">
              COMPARISON GUIDE
            </span>
            <h3 className="mt-2 text-xl sm:text-2xl font-black text-[#082B4C] tracking-tight">
              Which Solar Architecture Fits Your Requirements?
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              Direct comparison between On-Grid, Off-Grid, and Hybrid solar power systems.
            </p>
          </div>

          <div className="overflow-x-auto border border-orange-200/70 rounded-none">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-[#082B4C] via-[#093259] to-[#082B4C] text-white">
                  <th className="p-3 sm:p-3.5 font-bold border-r border-white/10 w-1/4">Key Parameter</th>
                  <th className="p-3 sm:p-3.5 font-bold border-r border-white/10 w-1/4 text-amber-300">On-Grid Solar</th>
                  <th className="p-3 sm:p-3.5 font-bold border-r border-white/10 w-1/4 text-emerald-300">Off-Grid Solar</th>
                  <th className="p-3 sm:p-3.5 font-bold w-1/4 text-sky-300">Hybrid Solar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-100">
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-[#FFFDF9]" : "bg-white"}>
                    <td className="p-3 sm:p-3.5 font-bold text-[#082B4C] border-r border-orange-100/80">
                      {row.feature}
                    </td>
                    <td className="p-3 sm:p-3.5 text-slate-700 font-medium border-r border-orange-100/80">
                      {row.onGrid}
                    </td>
                    <td className="p-3 sm:p-3.5 text-slate-700 font-medium border-r border-orange-100/80">
                      {row.offGrid}
                    </td>
                    <td className="p-3 sm:p-3.5 text-slate-700 font-medium">
                      {row.hybrid}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. EXPERT CONSULTATION BANNER */}
        <section className="rounded-none bg-gradient-to-r from-[#082B4C] via-[#0E3B66] to-[#082B4C] text-white p-6 sm:p-8 md:p-10 text-center relative overflow-hidden shadow-lg border border-navy/40">
          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-amber-300 uppercase tracking-wider border border-white/15">
              <HelpCircle className="size-3.5 text-amber-300" /> Free Technical Assessment
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
              Need Help Choosing the Right Solar Setup?
            </h3>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
              Our certified solar engineers will survey your rooftop, analyze your monthly DISCOM electricity bills, and recommend the best system for maximum return on investment.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Button asChild variant="cta" size="default" className="rounded-[30px] bg-gradient-to-r from-[#D9410E] via-[#E04F16] to-[#F97316] text-white font-bold text-xs sm:text-sm px-6 shadow-md hover:shadow-lg">
                <Link to="/book-a-demo">Book Free Site Survey</Link>
              </Button>
              <a
                href={`tel:${COMPANY.phone.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-2 rounded-[30px] border border-white/30 bg-white/10 px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-white/20 transition-colors shadow-2xs"
              >
                <Phone className="size-4 text-amber-400" />
                <span>Call: {COMPANY.phone}</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

