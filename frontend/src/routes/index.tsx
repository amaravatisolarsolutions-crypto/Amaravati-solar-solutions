import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Battery,
  CheckCircle2,
  ClipboardList,
  FileText,
  HardHat,
  Headphones,
  PlugZap,
  Settings2,
  SlidersHorizontal,
  Sun,
  Wrench,
} from "lucide-react";
import residential from "@/assets/hero-residential.jpg";
import future from "@/assets/hero-future.jpg";
import installation from "@/assets/installation.jpg";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { HeroCarousel } from "@/components/site/HeroCarousel";
import { SectionHeading } from "@/components/site/Sections";
import { setupRooftopScrollAnimation } from "@/lib/scroll-animation";
import { PROJECTS, type ProjectCategory } from "@/lib/site-data";
import { scrollToTarget } from "@/lib/scroll-utils";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amaravati Solar Solutions — Rooftop Solar for Homes & Business" },
      {
        name: "description",
        content:
          "On-grid, off-grid and hybrid solar systems for homes, businesses and industries. Book a free solar consultation.",
      },
      { property: "og:title", content: "Amaravati Solar Solutions — Clean Energy. Brighter Tomorrow." },
      {
        property: "og:description",
        content:
          "Smart, reliable and sustainable solar energy solutions for homes, businesses and industries.",
      },
    ],
  }),
  component: Index,
});

const WHY = [
  { icon: BadgeCheck, title: "Quality Solar Components", text: "Carefully selected panels, inverters and mounting structures." },
  { icon: HardHat, title: "Professional Installation", text: "Neat, safe installation by a trained technical team." },
  { icon: Settings2, title: "Customized Solar Solutions", text: "Systems designed around your roof, usage and budget." },
  { icon: FileText, title: "Transparent Quotations", text: "Clear, itemised proposals with no hidden surprises." },
  { icon: Headphones, title: "Reliable After-Sales Support", text: "We stay reachable long after your system goes live." },
  { icon: Wrench, title: "Maintenance & Service", text: "Cleaning, checks and technical help when you need it." },
];

const STEPS = [
  { icon: ClipboardList, title: "Book a Consultation", text: "Tell us about your property and energy needs." },
  { icon: Sun, title: "Site Inspection & Energy Assessment", text: "We visit, survey your roof and study your consumption." },
  { icon: FileText, title: "Customized Proposal & Quotation", text: "Receive a tailored system design with transparent pricing." },
  { icon: HardHat, title: "Installation & Ongoing Support", text: "Professional installation followed by continued support." },
];

const FEATURE_HIGHLIGHTS = [
  {
    line1: "On-Grid",
    line2: "Solar Systems",
    href: "#on-grid",
    icon: () => (
      <svg className="size-5 sm:size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="11" rx="1.5" />
        <line x1="2" y1="8.5" x2="22" y2="8.5" />
        <line x1="8.5" y1="3" x2="8.5" y2="14" />
        <line x1="15.5" y1="3" x2="15.5" y2="14" />
        <path d="M12 14v7" />
        <path d="M8 21h8" />
      </svg>
    ),
  },
  {
    line1: "Off-Grid",
    line2: "Solar Systems",
    href: "#off-grid",
    icon: () => (
      <svg className="size-5 sm:size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="6" width="14" height="15" rx="2" />
        <line x1="9" y1="2" x2="15" y2="2" />
        <line x1="9" y1="2" x2="9" y2="6" />
        <line x1="15" y1="2" x2="15" y2="6" />
        <path d="M12 10v7" />
        <path d="M8.5 13.5h7" />
      </svg>
    ),
  },
  {
    line1: "Hybrid",
    line2: "Solar Systems",
    href: "#hybrid",
    icon: () => (
      <svg className="size-5 sm:size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        <path d="M5 5l2.2 2.2M16.8 16.8L19 19M5 19l2.2-2.2M16.8 7.2L19 5" />
      </svg>
    ),
  },
  {
    line1: "End-to-End",
    line2: "Process",
    href: "#how-it-works",
    icon: () => (
      <svg className="size-5 sm:size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
        <path d="M16 16h5v5" />
        <circle cx="12" cy="12" r="1.5" />
      </svg>
    ),
  },
  {
    line1: "5 Years",
    line2: "AMC Support",
    href: "#about",
    icon: () => (
      <svg className="size-5 sm:size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <circle cx="12" cy="11" r="3" />
        <path d="M12 9.5v1.5l1 1" />
      </svg>
    ),
  },
  {
    line1: "30+ Years",
    line2: "Lifetime",
    href: "#about",
    icon: () => (
      <svg className="size-5 sm:size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 7.5l1.3 2.6 2.9.4-2.1 2 .5 2.9-2.6-1.4-2.6 1.4.5-2.9-2.1-2 2.9-.4z" />
      </svg>
    ),
  },
];

const FILTERS: ("All" | ProjectCategory)[] = ["All", "Residential", "Commercial", "Industrial"];

function Index() {
  const [galleryFilter, setGalleryFilter] = useState<"All" | ProjectCategory>("All");

  useEffect(() => {
    // When opening Home page, ensure it starts at the very top
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    // Initialize continuous scroll animations for rooftop solar sections
    return setupRooftopScrollAnimation();
  }, []);

  // Commercial solar carport canopy (p6) is removed from home page and placed inside "View All Projects" (/projects)
  const homeProjects = PROJECTS.filter((p) => p.id !== "p6");
  const filteredProjects = galleryFilter === "All" ? homeProjects : homeProjects.filter((p) => p.category === galleryFilter);

  return (
    <>
      {/* 1. HOME SECTION */}
      <div id="home">
        <HeroCarousel />
      </div>

      {/* QUICK HIGHLIGHT FEATURES ROW (MATCHING SCREENSHOT) */}
      <section className="bg-slate-50/60 sm:bg-slate-50/70 border-b border-slate-200/80 py-2 sm:py-5">
        <div className="container-site px-2.5 sm:px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
            {FEATURE_HIGHLIGHTS.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={(e) => {
                  const targetId = item.href.replace("#", "");
                  if (targetId && document.getElementById(targetId)) {
                    e.preventDefault();
                    scrollToTarget(targetId);
                  }
                }}
                className="group flex flex-col items-center justify-center rounded-2xl sm:rounded-[22px] border border-slate-200/90 bg-white py-2.5 sm:py-6 px-2 text-center shadow-[0_1px_6px_rgba(8,43,76,0.04)] sm:shadow-[0_2px_12px_rgba(8,43,76,0.05)] transition-all duration-300 hover:-translate-y-0.5 sm:hover:-translate-y-1 hover:shadow-md hover:border-[#D9531E]/40 select-none cursor-pointer"
              >
                <div className="flex size-6 sm:size-10 items-center justify-center text-[#D9531E] transition-transform duration-300 group-hover:scale-110">
                  <item.icon />
                </div>
                <div className="mt-1 sm:mt-2.5 text-[11px] sm:text-sm font-bold text-[#082B4C] leading-tight group-hover:text-[#D9531E] transition-colors">
                  <div>{item.line1}</div>
                  <div>{item.line2}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 2. ABOUT US SECTION - Compact vertical padding */}
      <section id="about" className="bg-navy py-5 md:py-7 scroll-mt-28">
        <div className="container-site grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
          <div>
            <p className="eyebrow text-gold">Why us</p>
            <h2 className="mt-1.5 text-2xl font-extrabold text-navy-foreground sm:text-3xl md:text-4xl">
              Why Choose Amaravati Solar Solutions?
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {WHY.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-3">
                  <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/15 text-gold">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-navy-foreground">{title}</h3>
                    <p className="mt-0.5 text-xs text-navy-foreground/70 text-left md:text-justify">{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild variant="cta" size="sm">
                <Link to="/about">
                  More About Our Company <ArrowRight className="size-3.5" />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="sm">
                <Link to="/book-a-demo">Book Free Site Visit</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src={installation}
              alt="Technicians installing rooftop solar panels"
              width={1600}
              height={1072}
              loading="lazy"
              className="aspect-[16/10] w-full rounded-2xl object-cover shadow-lift"
            />
            <div className="absolute -bottom-4 -left-3 hidden rounded-xl bg-background p-3.5 shadow-lift sm:block">
              <p className="eyebrow text-[10px]">Our promise</p>
              <p className="mt-0.5 text-sm font-bold text-navy">Honest advice, quality work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Header - Side Heading matching Featured projects style */}
      <div className="container-site pt-5 pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200/90 pb-3">
          <div>
            <SectionHeading
              eyebrow="PRODUCTS & SOLUTIONS"
              title="Rooftop Solar Solutions"
              className="max-w-none"
            />
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
              Customised rooftop solar installations: On-Grid, Off-Grid, and Hybrid architectures for homes & businesses.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button asChild className="bg-[#082B4C] hover:bg-[#0c3963] text-white font-bold text-xs md:text-sm px-4 py-2 rounded-lg shadow-sm transition-all hover:shadow hover:scale-[1.02] active:scale-98">
              <Link to="/services">
                <span>View All Services</span>
                <ArrowRight className="size-3.5 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* 3. A) ON-GRID ROOFTOP SOLAR SYSTEMS */}
      <section id="on-grid" className="container-site py-2 md:py-3 scroll-mt-24 sm:scroll-mt-28 overflow-x-clip">
        <div data-rooftop-card="on-grid" className="grid items-stretch gap-6 rounded-2xl border border-slate-200/90 bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md md:p-6 lg:grid-cols-2 overflow-hidden">
          <div className="slide-rtl flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-0.5 text-xs font-bold text-primary">
              <PlugZap className="size-3.5" /> A) On - Grid Rooftop Solar
            </span>
            <h2 className="mt-2 text-xl font-extrabold text-navy sm:text-2xl md:text-3xl">
              A) On - Grid Rooftop Solar Systems
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm text-left md:text-justify">
              An on-grid rooftop system works alongside your existing utility connection. Solar power is used first during daylight, and surplus energy is exported back to the grid through net-metering to drastically cut monthly electricity bills.
            </p>
            <ul className="mt-3.5 grid grid-cols-1 gap-2 text-xs font-semibold text-slate-700 sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 shrink-0 text-primary" /> Drastic electricity bill reduction
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 shrink-0 text-primary" /> Government subsidy & net-metering
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 shrink-0 text-primary" /> No costly battery maintenance
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 shrink-0 text-primary" /> Fastest return on investment (ROI)
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <Button asChild variant="cta" size="sm">
                <Link to="/book-a-demo">
                  Book Free Site Visit <ArrowRight className="size-3.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/contact">Get A Quote</Link>
              </Button>
            </div>
          </div>
          <div className="slide-rtl slide-stagger relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full min-h-[220px] overflow-hidden rounded-xl shadow-md">
            <img
              src={residential}
              alt="On-grid solar installation"
              width={1600}
              height={1072}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <span className="absolute bottom-3 left-3 rounded-full bg-navy/90 backdrop-blur px-2.5 py-0.5 text-[11px] font-bold text-white z-10">
              Ideal for Homes & Offices
            </span>
          </div>
        </div>
      </section>

      {/* 4. B) OFF-GRID ROOFTOP SOLAR SYSTEMS */}
      <section id="off-grid" className="bg-surface py-2 md:py-3 scroll-mt-24 sm:scroll-mt-28 overflow-x-clip">
        <div className="container-site">
          <div data-rooftop-card="off-grid" className="grid items-stretch gap-6 rounded-2xl border border-slate-200/90 bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md md:p-6 lg:grid-cols-2 overflow-hidden">
            <div className="slide-ltr order-2 lg:order-1 relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full min-h-[220px] overflow-hidden rounded-xl shadow-md">
              <img
                src={future}
                alt="Off-grid solar installation"
                width={1600}
                height={1072}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-navy/90 backdrop-blur px-2.5 py-0.5 text-[11px] font-bold text-white z-10">
                100% Energy Independence
              </span>
            </div>
            <div className="slide-ltr slide-stagger order-1 lg:order-2 flex flex-col justify-center">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-sun/15 px-3 py-0.5 text-xs font-bold text-navy">
                <Battery className="size-3.5 text-sun" /> B) Off - Grid Rooftop Solar
              </span>
              <h2 className="mt-2 text-xl font-extrabold text-navy sm:text-2xl md:text-3xl">
                B) Off - Grid Rooftop Solar Systems
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm text-left md:text-justify">
                Off-grid rooftop systems combine high-grade solar panels with battery storage, generating and storing your own electricity independent of the utility company. Ideal for farmhouses, resorts, and remote areas with frequent power cuts.
              </p>
              <ul className="mt-3.5 grid grid-cols-1 gap-2 text-xs font-semibold text-slate-700 sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 shrink-0 text-sun" /> Complete energy self-reliance
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 shrink-0 text-sun" /> High-capacity battery night backup
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 shrink-0 text-sun" /> Zero dependence on the grid
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 shrink-0 text-sun" /> Reliable in remote locations
                </li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <Button asChild variant="cta" size="sm">
                  <Link to="/book-a-demo">
                    Book Free Site Visit <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link to="/contact">Get A Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. C) HYBRID ROOFTOP SOLAR SYSTEMS */}
      <section id="hybrid" className="container-site py-2 md:py-3 scroll-mt-24 sm:scroll-mt-28 overflow-x-clip">
        <div data-rooftop-card="hybrid" className="grid items-stretch gap-6 rounded-2xl border border-slate-200/90 bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md md:p-6 lg:grid-cols-2 overflow-hidden">
          <div className="slide-rtl flex flex-col justify-center">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-solar-blue/15 px-3 py-0.5 text-xs font-bold text-solar-blue">
                <SlidersHorizontal className="size-3.5" /> C) Hybrid Rooftop Solar
              </span>
              <h2 className="mt-2 text-xl font-extrabold text-navy sm:text-2xl md:text-3xl">
                C) Hybrid Rooftop Solar Systems
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm text-left md:text-justify">
                Hybrid systems deliver uninterrupted energy around the clock. Export surplus electricity to the grid for savings during regular times, and enjoy instant, automatic switchover to battery storage during unexpected blackouts.
              </p>
              <ul className="mt-3.5 grid grid-cols-1 gap-2 text-xs font-semibold text-slate-700 sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 shrink-0 text-solar-blue" /> Uninterrupted power 24/7
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 shrink-0 text-solar-blue" /> Smart automatic power switching
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 shrink-0 text-solar-blue" /> Net-metering export enabled
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 shrink-0 text-solar-blue" /> Scalable modern lithium batteries
                </li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <Button asChild variant="cta" size="sm">
                  <Link to="/book-a-demo">
                    Book Free Site Visit <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link to="/contact">Get A Quote</Link>
                </Button>
              </div>
            </div>
            <div className="slide-rtl slide-stagger relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full min-h-[220px] overflow-hidden rounded-xl shadow-md">
              <img
                src={installation}
                alt="Hybrid solar installation"
                width={1600}
                height={1072}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-navy/90 backdrop-blur px-2.5 py-0.5 text-[11px] font-bold text-white z-10">
                Smart 24/7 Power Security
              </span>
            </div>
          </div>

        {/* View All Services Button */}
        <div className="mt-6 flex justify-center">
          <Button asChild variant="cta" size="default" className="shadow-md">
            <Link to="/services">
              View All Services & Solutions <ArrowRight className="size-4 ml-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* HOW IT WORKS PROCESS - Side Heading matching Featured projects style */}
      <section id="how-it-works" className="bg-surface py-4 md:py-6 scroll-mt-24 sm:scroll-mt-28">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="How it works"
              title="Our simple four-step process"
              className="max-w-none flex-1"
              titleClassName="whitespace-normal md:whitespace-nowrap"
            />
            <p className="text-xs text-muted-foreground whitespace-normal md:whitespace-nowrap pb-1">
              Seamless end-to-end solar execution from consultation to commissioning.
            </p>
          </div>
          <ol className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="relative rounded-xl bg-card p-5 shadow-card transition-all duration-300 hover:shadow-lift hover:-translate-y-1 active:scale-[0.98]">
                <span className="absolute right-4 top-4 text-3xl font-extrabold text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="grid size-10 place-items-center rounded-lg bg-sun text-primary-foreground">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-navy">{title}</h3>
                <p className="mt-1 text-xs text-muted-foreground text-left md:text-justify">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. GALLERY / PROJECTS - Exactly matching user screenshot */}
      <section id="gallery" className="container-site py-6 md:py-8 scroll-mt-24 sm:scroll-mt-28">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={galleryFilter === f}
              onClick={() => setGalleryFilter(f)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm font-semibold transition-all active:scale-95 cursor-pointer select-none",
                galleryFilter === f
                  ? "border-navy bg-navy text-navy-foreground shadow-sm"
                  : "bg-background text-navy hover:border-primary hover:text-primary active:bg-slate-100"
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          These are sample placeholders. Verified project photos and details will be added soon.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((p) => (
            <Link
              key={p.id}
              to="/projects/$id"
              params={{ id: p.id }}
              className="group overflow-hidden rounded-2xl bg-card text-left shadow-card transition-all duration-300 hover:shadow-lift hover:-translate-y-1 active:scale-[0.98] flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  width={1920}
                  height={1088}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-navy/0 transition-colors group-hover:bg-navy/30" />
                <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-bold text-navy shadow-sm">
                  {p.category}
                </span>
                {p.placeholder && (
                  <span className="absolute right-4 top-4 rounded-full bg-navy/80 px-3 py-1 text-xs font-semibold text-navy-foreground shadow-sm">
                    Sample
                  </span>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <h3 className="text-lg font-bold text-navy line-clamp-2">{p.title}</h3>
                <span className="mt-2 inline-block text-sm font-bold text-primary">
                  View Project →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="mt-8 flex justify-center">
          <Button asChild variant="cta" size="default">
            <Link to="/projects">
              View All Projects <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
