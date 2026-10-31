import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Phone, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
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

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "All Solar Services & Solutions — Amaravati Solar Solutions" },
      {
        name: "description",
        content:
          "Explore all rooftop, commercial, industrial solar solutions, agricultural solar pumping, electrical works, and maintenance services.",
      },
      { property: "og:title", content: "All Solar Services — Amaravati Solar Solutions" },
      {
        property: "og:description",
        content: "Complete rooftop, commercial, industrial solar energy services across Andhra Pradesh.",
      },
    ],
  }),
  component: AllServices,
});

export type ServiceItem = {
  id: string;
  title: string;
  order: number;
  category: "SOLAR" | "ELECTRICAL" | "AGRICULTURE" | "EV CHARGING" | "MAINTENANCE / AMC" | string;
  description: string;
  image: string;
  highlights?: string[];
};

const DEFAULT_ALL_SERVICES: ServiceItem[] = [
  {
    id: "svc-1",
    title: "Residential Rooftop Solar",
    order: 1,
    category: "SOLAR",
    description:
      "Complete rooftop solar installations for independent houses, villas, and apartments. Cut electricity bills by up to 90% with PM Surya Ghar national DBT subsidy benefits and DISCOM net-metering synchronization.",
    image: residential,
    highlights: ["Up to 90% bill reduction", "PM Surya Ghar DBT subsidy eligible", "25-year panel performance warranty"],
  },
  {
    id: "svc-2",
    title: "Commercial & Industrial Solar",
    order: 2,
    category: "SOLAR",
    description:
      "High-capacity turnkey solar power plants engineered for factories, hospitals, schools, colleges, hotels, and warehouses. Maximum daytime tariff reduction and accelerated tax depreciation.",
    image: commercial,
    highlights: ["Custom MW/kW plant design", "Rapid 3-4 year ROI payback", "Accelerated 40% tax depreciation"],
  },
  {
    id: "svc-3",
    title: "Ground Mounted Solar Power Plants",
    order: 3,
    category: "SOLAR",
    description:
      "Turnkey utility and MW-scale ground mounted solar farms. Complete end-to-end EPC execution including land contour surveying, piling, HT evacuation lines, switchyards, and CEIG approvals.",
    image: solarFarm,
    highlights: ["Utility scale EPC expertise", "HT substation integration", "Complete statutory approvals"],
  },
  {
    id: "svc-4",
    title: "On-Grid Solar Systems",
    order: 4,
    category: "SOLAR",
    description:
      "Grid-tied solar systems that sync seamlessly with utility power, lowering electricity bills through bidirectional net-metering credits without the expense of battery replacements.",
    image: solarHyderabadRooftop,
    highlights: ["Net-metering bi-directional sync", "Zero battery maintenance cost", "Lowest cost per generated unit"],
  },
  {
    id: "svc-5",
    title: "Off-Grid Solar Systems",
    order: 5,
    category: "SOLAR",
    description:
      "Independent solar power systems equipped with advanced lithium and tubular battery energy storage. Delivers 100% self-reliance for farmhouses, remote areas, and outage-prone regions.",
    image: future,
    highlights: ["100% grid independent power", "High-capacity night battery backup", "Built for outage protection"],
  },
  {
    id: "svc-6",
    title: "Hybrid Solar Systems",
    order: 6,
    category: "SOLAR",
    description:
      "Smart multi-mode systems delivering the economic savings of grid export alongside battery storage backup. Seamless automatic changeover during grid power failures.",
    image: installation,
    highlights: ["24/7 uninterrupted power", "Automatic millisecond switchover", "Export surplus power to grid"],
  },
  {
    id: "svc-7",
    title: "HT / LT Substation & Transformer Works",
    order: 7,
    category: "ELECTRICAL",
    description:
      "Comprehensive electrical infrastructure execution: HT yard switchgear commissioning, power transformer erection, breaker panels, cable trenching, and CEIG statutory clearances.",
    image: industrial,
    highlights: ["HT/LT substation installation", "CEIG liaisoning & clearances", "Certified class-A electrical team"],
  },
  {
    id: "svc-8",
    title: "Solar Water Pumping",
    order: 8,
    category: "AGRICULTURE",
    description:
      "Reliable AC and DC submersible and surface solar water pumps for agriculture, borewells, farm irrigation, and PM-KUSUM scheme implementations.",
    image: solarPanelsArray,
    highlights: ["Daytime continuous irrigation", "Zero diesel/electricity recurring cost", "PM-KUSUM subsidy compatible"],
  },
  {
    id: "svc-9",
    title: "EV Charging Infrastructure",
    order: 9,
    category: "EV CHARGING",
    description:
      "Commercial and residential EV charging stations powered by smart solar carport integrations. Fast DC and AC chargers for fleets, offices, apartments, and shopping centers.",
    image: solarCarport,
    highlights: ["Solar carport solar canopy", "Dual-gun AC & DC fast chargers", "Smart RFID & mobile app billing"],
  },
  {
    id: "svc-10",
    title: "Operations & Maintenance (O&M)",
    order: 10,
    category: "MAINTENANCE / AMC",
    description:
      "Comprehensive annual maintenance contracts (AMC), high-pressure robotic panel cleaning, thermal drone thermography, string inverter inspection, and 24/7 remote monitoring.",
    image: installation,
    highlights: ["Thermal hotspot drone scans", "Preventive monthly maintenance", "Uptime & performance guarantee"],
  },
];

const CATEGORIES = ["All", "SOLAR", "ELECTRICAL", "AGRICULTURE", "EV CHARGING", "MAINTENANCE / AMC"] as const;

function AllServices() {
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_ALL_SERVICES);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    fetch("/api/services?all=1")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.success && Array.isArray(d.data) && d.data.length > 0) {
          const mapped: ServiceItem[] = d.data.map((s: any, idx: number) => {
            let img = s.image || residential;
            const imgStr = String(s.image || "");
            if (imgStr.includes("residential")) img = residential;
            else if (imgStr.includes("commercial")) img = commercial;
            else if (imgStr.includes("industrial")) img = industrial;
            else if (imgStr.includes("future")) img = future;
            else if (imgStr.includes("installation")) img = installation;
            else if (imgStr.includes("farm")) img = solarFarm;
            else if (imgStr.includes("rooftop") || imgStr.includes("hyderabad")) img = solarHyderabadRooftop;
            else if (imgStr.includes("array") || imgStr.includes("panels")) img = solarPanelsArray;
            else if (imgStr.includes("carport")) img = solarCarport;

            // Pick highlights from default if matching title
            const matchedDefault = DEFAULT_ALL_SERVICES.find(
              (item) => item.title.toLowerCase() === (s.title || "").toLowerCase()
            );

            return {
              id: String(s.id),
              title: s.title || "Solar Service",
              order: parseInt(s.service_order) || idx + 1,
              category: s.category || "SOLAR",
              description: s.description || "",
              image: img,
              highlights: matchedDefault?.highlights || [
                "Custom engineering & turnkey installation",
                "High efficiency Tier-1 solar technology",
                "Full liaisoning & subsidy support",
              ],
            };
          });
          setServices(mapped);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch live services, using default list:", err);
      });
  }, []);

  const filtered =
    selectedCategory === "All"
      ? services
      : services.filter((s) => s.category.toUpperCase().includes(selectedCategory.toUpperCase()));

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
                <Sparkles className="size-3.5" /> ALL SERVICES & SOLUTIONS
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#082B4C] tracking-tight">
                Complete Solar & Clean Energy Services
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-2xl">
                From residential rooftop solar and multi-megawatt industrial turnkey plants to solar agricultural
                pumping and 24/7 operations & maintenance across Amaravati and Andhra Pradesh.
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

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter Services">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs sm:text-sm font-semibold transition-all active:scale-95 cursor-pointer select-none",
                  selectedCategory === cat
                    ? "border-[#082B4C] bg-[#082B4C] text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 hover:border-primary hover:text-primary"
                )}
              >
                {cat === "All" ? "All Services" : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="container-site py-8 md:py-12">
        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          {filtered.map((service, index) => (
            <div
              key={service.id || index}
              className="group overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col"
            >
              {/* Service Card Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                <img
                  src={service.image}
                  alt={service.title}
                  width={1200}
                  height={675}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-60" />

                <span className="absolute top-4 left-4 rounded-full bg-navy/90 backdrop-blur px-3 py-1 text-xs font-bold text-white shadow-sm">
                  {service.category}
                </span>

                <span className="absolute bottom-3 left-4 text-xs font-semibold text-white/90">
                  Step 0{service.order || index + 1}
                </span>
              </div>

              {/* Service Details */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#082B4C] group-hover:text-primary transition-colors">
                    {service.title}
                  </h2>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 text-left">
                    {service.description}
                  </p>

                  {/* Highlights Bullet List */}
                  {service.highlights && service.highlights.length > 0 && (
                    <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-700 font-medium">
                      {service.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="size-3.5 shrink-0 text-emerald-600" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <Button asChild variant="cta" size="sm" className="text-xs font-bold">
                    <Link to="/book-a-demo">
                      Book Site Visit <ArrowRight className="size-3.5 ml-1" />
                    </Link>
                  </Button>

                  <Button asChild variant="outline" size="sm" className="text-xs font-bold border-slate-200 text-slate-700 hover:border-navy hover:text-navy">
                    <Link to="/contact">Get Custom Quote</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
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
              <ShieldCheck className="size-3.5" /> FREE CONSULTATION & DISCOM APPROVAL
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              Ready to power your property with clean solar energy?
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our certified solar engineers are ready to inspect your roof, calculate potential savings, and design a
              turnkey solar plant tailored to your needs.
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
