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
    sectorLabel: "Residential Solar",
    description:
      "Engineered for independent houses, villas, and apartments. Synchronizes with APCPDCL/APEPDCL utility grid with bi-directional net-metering. Slash domestic electricity bills by up to 90% without expensive battery replacements.",
    image: residential,
    capacity: "3 kW – 15 kW Systems",
    highlights: [
      "Up to 90% reduction in monthly electricity bills",
      "PM Surya Ghar DBT central subsidy up to ₹78,000",
      "Bi-directional net metering installation & approval",
      "25-year linear solar panel performance warranty",
    ],
  },
  {
    id: "svc-res-2",
    title: "Residential Hybrid Solar (Solar + Battery)",
    order: 2,
    sector: "residential",
    sectorLabel: "Residential Solar",
    description:
      "Advanced multi-mode power system combining grid-tied bill savings with high-capacity lithium battery energy storage. Delivers silent, automatic millisecond switchover during unpredictable load sheddings and power blackouts.",
    image: solarHyderabadRooftop,
    capacity: "5 kW – 20 kW + Battery",
    highlights: [
      "24/7 uninterrupted power backup for entire home",
      "Automatic millisecond grid-to-battery switchover",
      "Net-metering surplus export during sunny peak hours",
      "Compact, wall-mounted high-cycle lithium batteries",
    ],
  },
  {
    id: "svc-res-3",
    title: "Off-Grid Solar for Farmhouses & Villas",
    order: 3,
    sector: "residential",
    sectorLabel: "Residential Solar",
    description:
      "100% autonomous solar electrification for luxury farmhouses, gated communities, and remote properties without reliable utility connections. Generates and stores 100% of your power on-site.",
    image: future,
    capacity: "3 kW – 25 kW Standalone",
    highlights: [
      "Complete independence from utility grid tariffs & outages",
      "Heavy-duty deep cycle tubular or LiFePO4 battery banks",
      "Smart generator auto-start integration for cloudy days",
      "Engineered for heavy loads: ACs, pumps & home automation",
    ],
  },
  {
    id: "svc-res-4",
    title: "PM Surya Ghar Muft Bijli Yojana Facilitation",
    order: 4,
    sector: "residential",
    sectorLabel: "Residential Solar",
    description:
      "Complete white-glove assistance under the national PM Surya Ghar scheme. Our liaisoning team manages the National Portal registration, feasibility sanction, DISCOM inspection, and direct bank account subsidy credit.",
    image: installation,
    capacity: "Up to ₹78,000 Direct Subsidy",
    highlights: [
      "End-to-end documentation & online portal handling",
      "DISCOM technical feasibility & meter testing support",
      "Empanelled vendor certified installation standards",
      "Direct DBT transfer into homeowner's bank account",
    ],
  },

  // --- COMMERCIAL SERVICES ---
  {
    id: "svc-comm-1",
    title: "Commercial Rooftop Solar for Offices & IT Parks",
    order: 5,
    sector: "commercial",
    sectorLabel: "Commercial Solar",
    description:
      "High-efficiency turnkey solar rooftop installations tailored for corporate buildings, business complexes, shopping malls, and tech parks. Drastically reduce peak daytime commercial tariffs and meet enterprise sustainability targets.",
    image: commercial,
    capacity: "25 kW – 500 kW Plants",
    highlights: [
      "Drastic reduction in high daytime commercial tariffs",
      "Rapid 3 to 4 year complete capital ROI payback",
      "40% accelerated tax depreciation under IT Act Sec 32",
      "Custom elevated canopies preserving rooftop recreation",
    ],
  },
  {
    id: "svc-comm-2",
    title: "Institutional Solar for Schools, Colleges & Hospitals",
    order: 6,
    sector: "commercial",
    sectorLabel: "Commercial Solar",
    description:
      "Clean, silent, and highly reliable solar installations for educational campuses, healthcare centers, and nursing homes. Provides stable daytime green power for ICU backups, laboratories, and lecture halls.",
    image: solarFarm,
    capacity: "50 kW – 300 kW Plants",
    highlights: [
      "Zero noise and zero local carbon emissions",
      "Critical daytime emergency loads stabilization",
      "Demonstrates green environmental leadership to students",
      "Eligible for green building accreditation (IGBC / GRIHA)",
    ],
  },
  {
    id: "svc-comm-3",
    title: "Commercial Solar Carports & EV Charging Hubs",
    order: 7,
    sector: "commercial",
    sectorLabel: "Commercial Solar",
    description:
      "Transform corporate parking lots into clean energy power generators. High-tensile steel waterproof canopies shade employee and visitor vehicles while supplying power directly into your facility and EV charging stations.",
    image: solarCarport,
    capacity: "Custom Parking Bays",
    highlights: [
      "Dual benefit: weather-protected parking + clean electricity",
      "Integrated Level-2 AC & DC fast EV charging points",
      "Aesthetic modern architectural steel superstructure",
      "Branding visibility and customer EV charging monetization",
    ],
  },
  {
    id: "svc-comm-4",
    title: "Commercial CAPEX & OPEX / PPA Financing",
    order: 8,
    sector: "commercial",
    sectorLabel: "Commercial Solar",
    description:
      "Flexible financing architectures designed for businesses. Choose direct outright purchase (CAPEX) for maximum lifetime returns, or zero-upfront investment OPEX / PPA models where you only pay for the clean power consumed at discounted rates.",
    image: installation,
    capacity: "Zero-Capex Models Available",
    highlights: [
      "Zero upfront capital investment options (OPEX model)",
      "Guaranteed cheaper per-unit power cost than DISCOM tariff",
      "Bank loan facilitation through IREDA, SIDBI & green funds",
      "Full performance and uptime guarantees by Amaravati Solar",
    ],
  },

  // --- INDUSTRIAL SERVICES ---
  {
    id: "svc-ind-1",
    title: "Megawatt (MW) Scale Ground-Mounted Solar Parks",
    order: 9,
    sector: "industrial",
    sectorLabel: "Industrial Solar",
    description:
      "Utility and captive megawatt-scale solar power farms engineered from ground up. Complete turnkey EPC execution including land contour surveying, piling, HT evacuation lines, dedicated switchyards, and statutory CEIG clearances.",
    image: solarFarm,
    capacity: "1 MW to 25 MW+ Parks",
    highlights: [
      "Complete turnkey EPC: Civil, Structural, Electrical & HT",
      "Centralized string / central inverter architecture",
      "Dedicated 11kV/33kV evacuation line & switchyard",
      "100% CEIG, DISCOM, and TRANSCO approvals managed",
    ],
  },
  {
    id: "svc-ind-2",
    title: "Industrial PEB Shed & Warehouse Metal Roof Solar",
    order: 10,
    sector: "industrial",
    sectorLabel: "Industrial Solar",
    description:
      "Custom non-penetrative solar mounting systems designed specifically for Pre-Engineered Buildings (PEB), trapezoidal sheet roofs, standing seam roofs, and cold storage sheds. 100% leak-proof guaranteed.",
    image: industrial,
    capacity: "100 kW to 2 MW Systems",
    highlights: [
      "100% non-penetrative seam clamps — zero roof puncture risk",
      "Certified structural engineering ensuring wind load safety",
      "Lightweight, high-yield bifacial and mono-PERC modules",
      "Supplies heavy daytime motor and manufacturing power",
    ],
  },
  {
    id: "svc-ind-3",
    title: "HT / LT Substation, Transformer & Switchgear Works",
    order: 11,
    sector: "industrial",
    sectorLabel: "Industrial & Electrical",
    description:
      "Specialized high-tension (HT) electrical infrastructure division. Erection, testing, and commissioning of 11kV/33kV power transformers, VCB switchgear panels, HT cable laying, earth mats, and lightning arrestor towers.",
    image: solarPanelsArray,
    capacity: "Up to 33 kV Substation EPC",
    highlights: [
      "A-Grade licensed electrical contractor engineering team",
      "Vacuum Circuit Breaker (VCB) & SF6 breaker panels",
      "Substation earthing grids & lightning protection systems",
      "Chief Electrical Inspectorate to Government (CEIG) liaisoning",
    ],
  },
  {
    id: "svc-ind-4",
    title: "Industrial SCADA Telemetry & Drone Thermography",
    order: 12,
    sector: "industrial",
    sectorLabel: "Industrial Solar",
    description:
      "Enterprise plant supervision and predictive maintenance. Cloud-connected IoT SCADA dashboards stream real-time string voltages, inverter efficiency, and generation logs, supplemented by aerial drone thermal hotspot inspections.",
    image: installation,
    capacity: "Enterprise Plant Analytics",
    highlights: [
      "24/7 cloud SCADA monitoring with instant fault alerts",
      "Aerial drone radiometric thermal scans identifying cell defects",
      "String-level generation tracking and degradation analytics",
      "Maximum plant uptime and generation yield assurance",
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
      "Custom fabrication and on-site commissioning of Power Control Centers (PCC), Motor Control Centers (MCC), and Automatic Power Factor Correction (APFC) panels maintaining near-unity power factor to eliminate DISCOM penalties.",
    image: industrial,
    capacity: "Custom Industrial Ratings",
    highlights: [
      "Eliminates DISCOM low power factor penalties",
      "Type-tested sheet steel enclosures with IP54/IP55 protection",
      "Schneider / ABB / L&T switchgear and protection relays",
      "Complete electrical drawing, testing and CEIG approval",
    ],
  },

  // --- AGRICULTURE ---
  {
    id: "svc-agri-1",
    title: "Solar Water Pumping Systems (PM-KUSUM Scheme)",
    order: 14,
    sector: "agriculture",
    sectorLabel: "Agriculture Solar",
    description:
      "Reliable AC and DC submersible and surface solar water pumps designed for remote agricultural fields, borewells, farm irrigation, and PM-KUSUM government subsidy implementations. Zero diesel or grid bills.",
    image: solarPanelsArray,
    capacity: "3 HP, 5 HP, 7.5 HP & 10 HP Pumps",
    highlights: [
      "Continuous daytime irrigation regardless of power cuts",
      "Zero diesel recurring expenses and zero grid dependency",
      "Automatic MPPT solar pump controllers with dry-run sensor",
      "PM-KUSUM subsidy scheme assistance across Andhra Pradesh",
    ],
  },

  // --- EV & MAINTENANCE ---
  {
    id: "svc-maint-1",
    title: "Comprehensive Solar O&M & Annual Maintenance (AMC)",
    order: 15,
    sector: "maintenance",
    sectorLabel: "Maintenance & AMC",
    description:
      "Protect your multi-decade investment with scheduled preventive maintenance. Includes de-mineralized water high-pressure panel washing, string health audits, inverter servicing, and immediate breakdown repairs.",
    image: installation,
    capacity: "All kW / MW Systems",
    highlights: [
      "Scheduled demineralized robotic/pressure module washing",
      "Electrical torque tightening, inverter & cabling inspections",
      "Hotspot & degradation diagnostics with thermal imaging",
      "Guaranteed quick breakdown response within 24 hours",
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
      "Say goodbye to surging domestic electricity bills. Harness clean, abundant sunshine from your own rooftop with custom-engineered On-Grid and Hybrid systems. Avail direct central government DBT subsidies up to ₹78,000 under the PM Surya Ghar Muft Bijli Yojana with seamless APCPDCL / APEPDCL net-metering approvals.",
    metrics: [
      { label: "Central DBT Subsidy", value: "Up to ₹78,000" },
      { label: "Power Bill Reduction", value: "Up to 90%" },
      { label: "Performance Warranty", value: "25 Years" },
      { label: "AP Net-Metering", value: "100% Handled" },
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
      "Transform high daytime commercial power bills into a competitive advantage. Commercial properties across Andhra Pradesh pay premium commercial tariffs; our turnkey solar rooftop systems cut operating overheads drastically and qualify for 40% accelerated tax depreciation in the very first year.",
    metrics: [
      { label: "Tax Depreciation", value: "40% in Year 1" },
      { label: "Payback Period", value: "3 – 4 Years" },
      { label: "Financing Options", value: "CAPEX & OPEX" },
      { label: "Daytime Power Offset", value: "Up to 75%" },
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
      "Heavy-duty clean power engineering built for manufacturing plants, PEB warehouses, cold storages, spinning mills, and textile hubs. We execute end-to-end multi-MW solar parks, non-penetrative leak-proof sheet installations, HT substations, and complete CEIG statutory clearance.",
    metrics: [
      { label: "Plant Capacities", value: "100 kW to 25 MW+" },
      { label: "Structural Safety", value: "Zero Roof Leakage" },
      { label: "Statutory Clearances", value: "100% CEIG & DISCOM" },
      { label: "O&M Supervision", value: "24/7 Cloud SCADA" },
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
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Top Breadcrumb & Page Header */}
      <section className="bg-white border-b border-slate-200/80 pt-6 pb-8 md:pt-8 md:pb-10">
        <div className="container-site">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-navy hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="size-4 text-primary" /> Back to Home
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-0.5 text-xs font-bold text-primary mb-2">
                <Sparkles className="size-3.5" /> RESIDENTIAL • COMMERCIAL • INDUSTRIAL
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#082B4C] tracking-tight">
                Solar & Electrical Engineering Services
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
                Explore custom solar power plants, central government PM Surya Ghar subsidies, commercial
                accelerated ROI systems, and industrial MW utility turnkeys across Vijayawada, Guntur & Andhra Pradesh.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <Button asChild variant="cta" size="sm" className="shadow-sm">
                <Link to="/book-a-demo">Book Free Site Visit</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="border-navy text-navy hover:bg-navy hover:text-white">
                <Link to="/contact">Get A Quote</Link>
              </Button>
            </div>
          </div>

          {/* Interactive Sector Filter Pills */}
          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter Services by Sector">
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
                    "flex items-center gap-2 rounded-full border px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-200 active:scale-95 cursor-pointer select-none",
                    isSelected
                      ? "border-[#082B4C] bg-[#082B4C] text-white shadow-md shadow-navy/15 scale-[1.02]"
                      : "border-slate-200 bg-white text-slate-700 hover:border-primary hover:text-primary hover:bg-slate-50"
                  )}
                >
                  <Icon className={cn("size-3.5 sm:size-4", isSelected ? "text-amber-400" : "text-slate-400")} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dynamic Sector Spotlight Hero Banner (Shows when Residential, Commercial, or Industrial is selected) */}
      {spotlight && (
        <section className="container-site pt-6 pb-2">
          <div
            key={spotlight.key}
            className={cn(
              "relative overflow-hidden rounded-3xl border bg-gradient-to-br p-6 sm:p-8 md:p-10 shadow-lg animate-pop-in",
              spotlight.accentBorder,
              spotlight.accentBg,
              "bg-white"
            )}
          >
            <div className="relative z-10 max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1 text-xs font-extrabold text-[#082B4C] shadow-sm border border-slate-200/60 mb-3">
                <spotlight.icon className="size-4 text-primary" />
                <span>{spotlight.badge}</span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#082B4C] tracking-tight">
                {spotlight.title}
              </h2>

              <p className="mt-2.5 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-3xl">
                {spotlight.description}
              </p>

              {/* Key Metrics / Highlights Grid */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {spotlight.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200/70 bg-white/90 backdrop-blur p-3 sm:p-4 shadow-sm"
                  >
                    <div className="text-base sm:text-lg md:text-xl font-extrabold text-[#082B4C]">
                      {m.value}
                    </div>
                    <div className="text-[11px] sm:text-xs font-semibold text-slate-500 mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct Consultation Actions */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild variant="cta" size="sm" className="shadow-md">
                  <Link to="/book-a-demo">Book Free Site Survey</Link>
                </Button>
                <a
                  href="tel:+917989641899"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs sm:text-sm font-bold text-[#082B4C] hover:bg-slate-50 transition-colors shadow-xs"
                >
                  <Phone className="size-4 text-primary" /> Call: +91 79896 41899
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Grid Section with Premium Pop Animation */}
      <section className="container-site py-8 md:py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#082B4C]">
              {selectedCategory === "all" ? "All Solar & Energy Solutions" : `${spotlight?.name || selectedCategory} Services`}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
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

        {/* The Grid re-renders and pops in every time selectedCategory changes */}
        <div key={selectedCategory} className="grid gap-6 md:gap-8 md:grid-cols-2">
          {filteredServices.map((service, index) => {
            const staggerClass = `pop-stagger-${Math.min((index % 6) + 1, 6)}`;
            return (
              <div
                key={service.id}
                className={cn(
                  "group overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col animate-pop-in",
                  staggerClass
                )}
              >
                {/* Service Card Image Banner */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    width={1200}
                    height={675}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />

                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#082B4C]/90 backdrop-blur px-3 py-1 text-xs font-extrabold text-white shadow-sm border border-white/10">
                      {service.sectorLabel}
                    </span>
                    {service.capacity && (
                      <span className="rounded-full bg-amber-500/95 backdrop-blur px-2.5 py-1 text-[11px] font-extrabold text-white shadow-sm">
                        {service.capacity}
                      </span>
                    )}
                  </div>

                  <span className="absolute bottom-3 left-4 text-xs font-semibold text-white/90">
                    Solution 0{service.order}
                  </span>
                </div>

                {/* Service Details & Features */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#082B4C] group-hover:text-primary transition-colors">
                      {service.title}
                    </h2>
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 text-left">
                      {service.description}
                    </p>

                    {/* Highlights Checklist */}
                    {service.highlights && service.highlights.length > 0 && (
                      <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-700 font-medium">
                        {service.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                            <span className="leading-tight">{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Card Action Buttons */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <Button asChild variant="cta" size="sm" className="text-xs font-bold shadow-xs">
                      <Link to="/book-a-demo">
                        Book Site Visit <ArrowRight className="size-3.5 ml-1" />
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="text-xs font-bold border-slate-200 text-slate-700 hover:border-navy hover:text-navy"
                    >
                      <Link to="/contact">Get Custom Quote</Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
            No services found in this category.
          </div>
        )}
      </section>

      {/* Bottom Consultation CTA Banner */}
      <section className="container-site pt-4 pb-8">
        <div className="rounded-3xl bg-[#082B4C] p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-3 py-0.5 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <ShieldCheck className="size-3.5" /> FREE CONSULTATION & DISCOM LIAISONING
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              Ready to power your property with clean solar energy?
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our certified solar engineers are ready to inspect your site, calculate potential savings, and design a
              tailored turnkey solar plant.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild variant="cta" size="default" className="shadow-md">
                <Link to="/book-a-demo">Book Free Site Visit</Link>
              </Button>
              <a
                href="tel:+917989641899"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-white/20 transition-colors"
              >
                <Phone className="size-4" /> Call: +91 79896 41899
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
