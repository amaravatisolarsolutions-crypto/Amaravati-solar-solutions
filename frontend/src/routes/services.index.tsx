import { createFileRoute, Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Factory,
  Home,
  Phone,
  ShieldCheck,
  Sparkles,
  Sprout,
  Wrench,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import industrial from "@/assets/hero-industrial.jpg";
import residential from "@/assets/hero-residential.jpg";
import commercial from "@/assets/hero-commercial.jpg";
import future from "@/assets/hero-future.jpg";
import installation from "@/assets/installation.jpg";
import solarFarm from "@/assets/solar-farm.jpg";
import solarHyderabadRooftop from "@/assets/solar-hyderabad-rooftop.jpg";
import solarPanelsArray from "@/assets/solar-panels-array.jpg";
import solarCarport from "@/assets/solar-carport.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ServicesSearchParams = {
  category?: string;
};

export const Route = createFileRoute("/services/")({
  validateSearch: (search: Record<string, unknown>): ServicesSearchParams => {
    return {
      category: typeof search.category === "string" ? search.category : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Residential, Commercial & Industrial Solar Services — Amaravati Solar Solutions" },
      {
        name: "description",
        content:
          "Explore specialized rooftop, commercial, industrial solar systems, PM Surya Ghar subsidies, agricultural solar pumping, and electrical infrastructure across Andhra Pradesh.",
      },
      { property: "og:title", content: "Solar Services & Solutions — Amaravati Solar Solutions" },
      {
        property: "og:description",
        content:
          "Custom solar power systems for homes, businesses, and industrial facilities in Vijayawada, Guntur, and Andhra Pradesh.",
      },
    ],
  }),
  component: AllServices,
});

export type ServiceItem = {
  id: string;
  title: string;
  order: number;
  sector: "residential" | "commercial" | "industrial" | "electrical" | "agriculture" | "maintenance";
  sectorLabel: string;
  description: string;
  image: string;
  capacity?: string;
  highlights: string[];
};

const ALL_SERVICES_CATALOG: ServiceItem[] = [
  // --- RESIDENTIAL SERVICES ---
  {
    id: "svc-res-1",
    title: "Residential Rooftop Solar (On-Grid)",
    order: 1,
    sector: "residential",
    sectorLabel: "Residential",
    description:
      "Rooftop systems with DISCOM bi-directional net-metering. Cut domestic electricity bills by up to 90% without battery replacements.",
    image: residential,
    capacity: "3 kW – 15 kW",
    highlights: [
      "Up to 90% bill reduction",
      "PM Surya Ghar subsidy up to ₹78,000",
      "Net metering setup & DISCOM approvals",
      "25-year panel performance warranty",
    ],
  },
  {
    id: "svc-res-2",
    title: "Residential Hybrid Solar (Solar + Battery)",
    order: 2,
    sector: "residential",
    sectorLabel: "Residential",
    description:
      "Multi-mode solar system with lithium battery storage. Delivers automatic millisecond backup during grid load shedding & outages.",
    image: solarHyderabadRooftop,
    capacity: "5 kW – 20 kW + Battery",
    highlights: [
      "24/7 uninterrupted power for entire home",
      "Automatic millisecond power switchover",
      "Net-metering surplus export during daytime",
      "Compact wall-mounted lithium batteries",
    ],
  },
  {
    id: "svc-res-3",
    title: "Off-Grid Solar for Farmhouses & Villas",
    order: 3,
    sector: "residential",
    sectorLabel: "Residential",
    description:
      "Autonomous solar electrification for luxury farmhouses and gated villas without reliable utility connection. 100% self-reliance.",
    image: future,
    capacity: "3 kW – 25 kW Standalone",
    highlights: [
      "100% grid independence & zero bills",
      "High-capacity night battery backup",
      "Runs heavy loads: ACs, pumps & appliances",
      "Smart generator auto-start integration",
    ],
  },
  {
    id: "svc-res-4",
    title: "PM Surya Ghar Muft Bijli Yojana Facilitation",
    order: 4,
    sector: "residential",
    sectorLabel: "Residential",
    description:
      "End-to-end liaisoning for Central Government subsidies. We manage national portal registration, DISCOM inspection, and direct DBT transfer.",
    image: installation,
    capacity: "Up to ₹78,000 Subsidy",
    highlights: [
      "100% portal documentation & sanction",
      "DISCOM feasibility & bi-directional meter",
      "Empanelled vendor certified installation",
      "Direct DBT credit to customer bank account",
    ],
  },

  // --- COMMERCIAL SERVICES ---
  {
    id: "svc-comm-1",
    title: "Commercial Rooftop Solar for Offices & IT Parks",
    order: 5,
    sector: "commercial",
    sectorLabel: "Commercial",
    description:
      "Turnkey solar rooftop plants engineered for business complexes, IT parks, and retail centers to slash expensive commercial tariffs.",
    image: commercial,
    capacity: "25 kW – 500 kW",
    highlights: [
      "Substantial daytime tariff reduction",
      "Fast 3 to 4 year complete capital ROI",
      "40% accelerated tax depreciation benefit",
      "Elevated canopies preserving roof space",
    ],
  },
  {
    id: "svc-comm-2",
    title: "Institutional Solar for Schools & Hospitals",
    order: 6,
    sector: "commercial",
    sectorLabel: "Commercial",
    description:
      "Clean, silent, and highly reliable daytime power for educational campuses, healthcare centers, and nursing homes across AP.",
    image: solarFarm,
    capacity: "50 kW – 300 kW",
    highlights: [
      "Zero noise & green campus leadership",
      "Stabilizes critical medical & lab equipment",
      "Qualifies for IGBC/GRIHA green ratings",
      "Long-term operational budget protection",
    ],
  },
  {
    id: "svc-comm-3",
    title: "Commercial Solar Carports & EV Hubs",
    order: 7,
    sector: "commercial",
    sectorLabel: "Commercial",
    description:
      "Turn commercial parking bays into power generators with waterproof steel canopies and integrated Level-2 AC/DC EV charging points.",
    image: solarCarport,
    capacity: "Custom Parking Bays",
    highlights: [
      "Dual benefit: car shade + clean electricity",
      "Integrated fast EV vehicle charging",
      "Modern architectural steel structure",
      "Customer charging monetization options",
    ],
  },
  {
    id: "svc-comm-4",
    title: "Commercial CAPEX & OPEX / PPA Financing",
    order: 8,
    sector: "commercial",
    sectorLabel: "Commercial",
    description:
      "Flexible financing architectures. Choose direct purchase (CAPEX) or zero-investment OPEX / PPA models paying only for units consumed.",
    image: installation,
    capacity: "Zero-Capex Models",
    highlights: [
      "Zero upfront capital investment options",
      "Guaranteed cheaper per-unit power rate",
      "SIDBI, IREDA & green bank loan tie-ups",
      "Full performance & generation guarantee",
    ],
  },

  // --- INDUSTRIAL SERVICES ---
  {
    id: "svc-ind-1",
    title: "MW Scale Ground-Mounted Solar Parks",
    order: 9,
    sector: "industrial",
    sectorLabel: "Industrial",
    description:
      "Utility and captive megawatt-scale solar farms with land surveying, piling, HT evacuation lines, switchyards, and CEIG approvals.",
    image: solarFarm,
    capacity: "1 MW to 25 MW+",
    highlights: [
      "Complete turnkey EPC: Civil & Electrical",
      "Dedicated 11kV/33kV evacuation switchyard",
      "100% CEIG, DISCOM & TRANSCO approvals",
      "High-yield bifacial tracker architectures",
    ],
  },
  {
    id: "svc-ind-2",
    title: "Industrial PEB Shed & Warehouse Solar",
    order: 10,
    sector: "industrial",
    sectorLabel: "Industrial",
    description:
      "Custom non-penetrative mounting for Pre-Engineered Buildings (PEB) and metal sheet roofs. 100% leak-proof guaranteed.",
    image: industrial,
    capacity: "100 kW to 2 MW",
    highlights: [
      "100% seam clamps — zero roof puncture risk",
      "Wind-load certified structural engineering",
      "High-yield Tier-1 mono-PERC modules",
      "Supplies heavy daytime motor machinery",
    ],
  },
  {
    id: "svc-ind-3",
    title: "HT / LT Substation & Transformer Works",
    order: 11,
    sector: "industrial",
    sectorLabel: "Industrial",
    description:
      "Specialized high-tension electrical division: 11kV/33kV power transformers, VCB switchgear, earth mats, and CEIG liaisoning.",
    image: solarPanelsArray,
    capacity: "Up to 33 kV Substation",
    highlights: [
      "A-Grade licensed electrical contractor team",
      "VCB & SF6 breaker panel installations",
      "Substation earthing grids & lightning poles",
      "Chief Electrical Inspector (CEIG) approvals",
    ],
  },
  {
    id: "svc-ind-4",
    title: "Industrial SCADA Telemetry & Drone Audits",
    order: 12,
    sector: "industrial",
    sectorLabel: "Industrial",
    description:
      "Enterprise plant supervision. Cloud-connected IoT SCADA dashboards stream real-time string voltages and drone thermal inspections.",
    image: installation,
    capacity: "Enterprise Analytics",
    highlights: [
      "24/7 cloud SCADA monitoring with instant alerts",
      "Drone thermal scans spotting hot cells",
      "String-level generation tracking",
      "Maximizes plant uptime and energy yield",
    ],
  },

  // --- ELECTRICAL & SPECIALIZED ---
  {
    id: "svc-elec-1",
    title: "Industrial Electrical Panels (PCC, MCC, APFC)",
    order: 13,
    sector: "electrical",
    sectorLabel: "Electrical Works",
    description:
      "Custom fabrication and on-site commissioning of PCC, MCC, and APFC panels maintaining power factor near unity to eliminate DISCOM penalties.",
    image: industrial,
    capacity: "Custom Ratings",
    highlights: [
      "Eliminates DISCOM low power factor penalties",
      "IP54/IP55 type-tested sheet steel enclosures",
      "Schneider / ABB / L&T switchgear components",
      "Full schematic drafting & statutory testing",
    ],
  },

  // --- AGRICULTURE ---
  {
    id: "svc-agri-1",
    title: "Solar Water Pumping (PM-KUSUM Scheme)",
    order: 14,
    sector: "agriculture",
    sectorLabel: "Agriculture",
    description:
      "Reliable AC and DC solar water pumps for borewells and farm irrigation under PM-KUSUM subsidy schemes. Zero diesel or power costs.",
    image: solarPanelsArray,
    capacity: "3 HP – 10 HP Pumps",
    highlights: [
      "Continuous daytime irrigation for crops",
      "Zero recurring diesel or grid costs",
      "Automatic MPPT controller with dry-run sensor",
      "PM-KUSUM subsidy guidance across Andhra Pradesh",
    ],
  },

  // --- EV & MAINTENANCE ---
  {
    id: "svc-maint-1",
    title: "Solar O&M & Annual Maintenance (AMC)",
    order: 15,
    sector: "maintenance",
    sectorLabel: "Maintenance",
    description:
      "Protect your investment with preventive care: demineralized water module washing, string audits, and quick breakdown repairs.",
    image: installation,
    capacity: "All kW / MW Systems",
    highlights: [
      "Scheduled demineralized module washing",
      "Torque tightening & inverter servicing",
      "Hotspot detection with thermal diagnostics",
      "Guaranteed fast 24-hr breakdown response",
    ],
  },
];

type SectorMeta = {
  key: string;
  name: string;
  badge: string;
  icon: typeof Home;
  title: string;
  description: string;
  metrics: { label: string; value: string }[];
  accentBorder: string;
  accentBg: string;
  accentText: string;
};

const SECTOR_SPOTLIGHTS: Record<string, SectorMeta> = {
  residential: {
    key: "residential",
    name: "Residential Solar",
    badge: "PM SURYA GHAR SUBSIDY ELIGIBLE",
    icon: Home,
    title: "Residential Solar Solutions for Homes & Villas",
    description:
      "Cut domestic electricity bills by up to 90% with custom On-Grid and Hybrid rooftop solar. Avail direct DBT central subsidies up to ₹78,000 under PM Surya Ghar with 100% net-metering liaisoning.",
    metrics: [
      { label: "Central DBT Subsidy", value: "Up to ₹78,000" },
      { label: "Power Bill Reduction", value: "Up to 90%" },
      { label: "Performance Warranty", value: "25 Years" },
      { label: "Net-Metering", value: "100% Handled" },
    ],
    accentBorder: "border-amber-500/30",
    accentBg: "from-amber-500/10 via-orange-500/5 to-transparent",
    accentText: "text-amber-600",
  },
  commercial: {
    key: "commercial",
    name: "Commercial Solar",
    badge: "ACCELERATED 3-4 YR ROI & 40% TAX BENEFIT",
    icon: Building2,
    title: "Commercial Solar Power for Offices, Schools & Hospitals",
    description:
      "Slash peak commercial daytime power bills with turnkey solar plants. Benefit from 40% accelerated tax depreciation under IT Act Sec 32 and achieve full capital payback in just 3 to 4 years.",
    metrics: [
      { label: "Tax Depreciation", value: "40% in Year 1" },
      { label: "Payback Period", value: "3 – 4 Years" },
      { label: "Financing Models", value: "CAPEX & OPEX" },
      { label: "Daytime Offset", value: "Up to 75%" },
    ],
    accentBorder: "border-sky-500/30",
    accentBg: "from-sky-500/10 via-blue-500/5 to-transparent",
    accentText: "text-sky-600",
  },
  industrial: {
    key: "industrial",
    name: "Industrial Solar",
    badge: "MULTI-MW TURNKEY EPC & CEIG APPROVED",
    icon: Factory,
    title: "Industrial Megawatt Solar & PEB Metal Shed Plants",
    description:
      "Heavy-duty clean power for manufacturing factories, PEB sheds, cold storages, and textile units. Turnkey MW solar farms, leak-proof metal roof mounting, HT switchyards, and 100% CEIG liaisoning.",
    metrics: [
      { label: "Plant Capacities", value: "100 kW to 25 MW+" },
      { label: "Structural Safety", value: "Zero Roof Leakage" },
      { label: "Statutory Approvals", value: "100% CEIG Handled" },
      { label: "Telemetry", value: "24/7 Cloud SCADA" },
    ],
    accentBorder: "border-navy/30",
    accentBg: "from-[#082B4C]/10 via-[#087FC1]/5 to-transparent",
    accentText: "text-[#082B4C]",
  },
};

const TAB_CATEGORIES = [
  { id: "all", label: "All Services", icon: Sparkles },
  { id: "residential", label: "Residential", icon: Home },
  { id: "commercial", label: "Commercial", icon: Building2 },
  { id: "industrial", label: "Industrial", icon: Factory },
  { id: "electrical", label: "Electrical Works", icon: Zap },
  { id: "agriculture", label: "Agriculture Solar", icon: Sprout },
  { id: "maintenance", label: "EV & Maintenance", icon: Wrench },
] as const;

function AllServices() {
  const routerSearch = useRouterState({
    select: (s) => (s.location.search as Record<string, string>) || {},
  });

  // Read URL query parameter: /services?category=residential
  const queryCat = routerSearch.category?.toLowerCase() || "";
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      const c = sp.get("category")?.toLowerCase();
      if (c && ["residential", "commercial", "industrial", "electrical", "agriculture", "maintenance"].includes(c)) {
        return c;
      }
    }
    return queryCat || "all";
  });

  // Sync state when router location search changes
  useEffect(() => {
    if (queryCat && queryCat !== selectedCategory) {
      setSelectedCategory(queryCat);
    }
  }, [queryCat]);

  // Handle category switch smoothly with URL update
  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (catId === "all") {
        url.searchParams.delete("category");
      } else {
        url.searchParams.set("category", catId);
      }
      window.history.replaceState({}, "", url.toString());
    }
  };

  // Filter items based on active category
  const filteredServices = useMemo(() => {
    if (selectedCategory === "all") return ALL_SERVICES_CATALOG;
    return ALL_SERVICES_CATALOG.filter((item) => item.sector === selectedCategory);
  }, [selectedCategory]);

  const spotlight = SECTOR_SPOTLIGHTS[selectedCategory];

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Top Breadcrumb & Page Header - Compact & Screen-Fit */}
      <section className="bg-white border-b border-slate-200/80 pt-3.5 pb-3.5 md:pt-4 md:pb-4 shadow-2xs">
        <div className="container-site">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-primary transition-colors mb-2"
          >
            <ArrowLeft className="size-3.5 text-primary" /> Back to Home
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary mb-1">
                <Sparkles className="size-3" /> RESIDENTIAL • COMMERCIAL • INDUSTRIAL
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#082B4C] tracking-tight">
                Solar & Electrical Engineering Services
              </h1>
              <p className="mt-0.5 text-xs sm:text-sm text-slate-500 max-w-2xl leading-normal">
                Explore custom rooftop systems, PM Surya Ghar subsidies, commercial ROI power plants, and industrial MW utility turnkeys.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button asChild variant="cta" size="sm" className="h-8 px-3 text-xs shadow-2xs font-bold">
                <Link to="/book-a-demo">Book Free Site Visit</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs font-bold border-navy text-navy hover:bg-navy hover:text-white"
              >
                <Link to="/contact">Get A Quote</Link>
              </Button>
            </div>
          </div>

          {/* Interactive Sector Filter Pills - Compact */}
          <div className="mt-3.5 flex flex-wrap gap-1.5 sm:gap-2" role="tablist" aria-label="Filter Services by Sector">
            {TAB_CATEGORIES.map((tab) => {
              const Icon = tab.icon;
              const isSelected = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelectCategory(tab.id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer select-none",
                    isSelected
                      ? "border-[#082B4C] bg-[#082B4C] text-white shadow-xs scale-[1.02]"
                      : "border-slate-200 bg-white text-slate-700 hover:border-primary hover:text-primary hover:bg-slate-50"
                  )}
                >
                  <Icon className={cn("size-3.5", isSelected ? "text-amber-400" : "text-slate-400")} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dynamic Sector Spotlight Hero Banner - Horizontal, Compact & Screen-Fitting */}
      {spotlight && (
        <section className="container-site pt-3 pb-1">
          <div
            key={spotlight.key}
            className={cn(
              "relative overflow-hidden rounded-2xl border bg-gradient-to-br p-4 sm:p-5 md:p-6 shadow-sm animate-pop-in",
              spotlight.accentBorder,
              spotlight.accentBg,
              "bg-white"
            )}
          >
            <div className="relative z-10 grid gap-4 lg:grid-cols-12 lg:items-center">
              {/* Left Column: Sector Info & Direct Actions */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-0.5 text-[11px] font-extrabold text-[#082B4C] shadow-2xs border border-slate-200/80 mb-2">
                  <spotlight.icon className="size-3.5 text-primary" />
                  <span>{spotlight.badge}</span>
                </div>

                <h2 className="text-base sm:text-lg md:text-xl font-black text-[#082B4C] tracking-tight">
                  {spotlight.title}
                </h2>

                <p className="mt-1 text-xs text-slate-600 leading-relaxed max-w-2xl">
                  {spotlight.description}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Button asChild variant="cta" size="sm" className="h-7 sm:h-8 px-3 text-xs shadow-2xs font-bold">
                    <Link to="/book-a-demo">Book Free Survey</Link>
                  </Button>
                  <a
                    href="tel:+917989641899"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-bold text-[#082B4C] hover:bg-slate-50 transition-colors shadow-2xs h-7 sm:h-8"
                  >
                    <Phone className="size-3 text-primary" /> Call: +91 79896 41899
                  </a>
                </div>
              </div>

              {/* Right Column: 4 Compact Metric Stat Boxes */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-2 sm:gap-2.5">
                {spotlight.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200/80 bg-white/95 backdrop-blur p-2.5 shadow-2xs text-left"
                  >
                    <div className="text-xs sm:text-sm md:text-base font-extrabold text-[#082B4C] leading-tight">
                      {m.value}
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-semibold text-slate-500 mt-0.5 leading-tight">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Grid Section with Compact Cards & Screen-Fitting Layout */}
      <section className="container-site py-4 sm:py-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-[#082B4C]">
              {selectedCategory === "all" ? "All Solar & Energy Solutions" : `${spotlight?.name || selectedCategory} Services`}
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Showing {filteredServices.length} specialized service{filteredServices.length === 1 ? "" : "s"}
            </p>
          </div>

          {selectedCategory !== "all" && (
            <button
              onClick={() => handleSelectCategory("all")}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Services</span>
              <ArrowRight className="size-3.5" />
            </button>
          )}
        </div>

        {/* Dynamic Compact Grid - 4 Columns on Large Screens to Fit Screen */}
        <div key={selectedCategory} className="grid gap-3.5 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {filteredServices.map((service, index) => {
            const staggerClass = `pop-stagger-${Math.min((index % 6) + 1, 6)}`;
            return (
              <div
                key={service.id}
                className={cn(
                  "group overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-2xs transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col animate-pop-in",
                  staggerClass
                )}
              >
                {/* Card Image Banner - Compact Height */}
                <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    width={600}
                    height={340}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />

                  <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-[#082B4C]/90 backdrop-blur px-2 py-0.5 text-[10px] font-bold text-white shadow-xs border border-white/10">
                      {service.sectorLabel}
                    </span>
                    {service.capacity && (
                      <span className="rounded-full bg-amber-500/95 backdrop-blur px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                        {service.capacity}
                      </span>
                    )}
                  </div>

                  <span className="absolute bottom-2 left-2.5 text-[10px] font-semibold text-white/90">
                    Solution 0{service.order}
                  </span>
                </div>

                {/* Card Details & Concise Bullets */}
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#082B4C] group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Highlights Bullet List */}
                    {service.highlights && service.highlights.length > 0 && (
                      <ul className="mt-2.5 pt-2 border-t border-slate-100 space-y-1 text-[11px] text-slate-700 font-medium">
                        {service.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="size-3.5 shrink-0 text-emerald-600 mt-0.5" />
                            <span className="leading-tight line-clamp-1">{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Card Action Buttons - Compact 2-column Grid */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 grid grid-cols-2 gap-1.5">
                    <Button asChild variant="cta" size="sm" className="h-7 text-[11px] font-bold px-1.5 shadow-2xs w-full">
                      <Link to="/book-a-demo">
                        Book Visit <ArrowRight className="size-3 ml-0.5" />
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="h-7 text-[11px] font-bold px-1.5 border-slate-200 text-slate-700 hover:border-navy hover:text-navy w-full"
                    >
                      <Link to="/contact">Get Quote</Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 text-xs">
            No services found in this category.
          </div>
        )}
      </section>

      {/* Bottom Consultation CTA Banner - Compact & Visible Heading */}
      <section className="container-site pt-2 pb-6">
        <div className="rounded-2xl bg-[#082B4C] p-5 sm:p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[11px] font-bold text-amber-300 uppercase tracking-wider">
              <ShieldCheck className="size-3" /> FREE CONSULTATION & DISCOM LIAISONING
            </span>
            <h2 className="mt-2 text-lg sm:text-xl md:text-2xl font-black !text-white tracking-tight">
              Ready to power your property with clean solar energy?
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl">
              Our certified solar engineers are ready to inspect your site, calculate potential savings, and design a
              tailored turnkey solar plant.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <Button asChild variant="cta" size="sm" className="h-8 px-4 text-xs font-bold shadow-xs">
                <Link to="/book-a-demo">Book Free Site Visit</Link>
              </Button>
              <a
                href="tel:+917989641899"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-white/20 transition-colors h-8"
              >
                <Phone className="size-3.5" /> Call: +91 79896 41899
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
