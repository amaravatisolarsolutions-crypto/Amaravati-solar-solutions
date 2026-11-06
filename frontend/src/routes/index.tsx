import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Battery,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  Eye,
  FileText,
  HardHat,
  Headphones,
  Laptop,
  Phone,
  PlugZap,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Target,
  Users,
  Wrench,
  X,
} from "lucide-react";
import residential from "@/assets/hero-residential.jpg";
import future from "@/assets/hero-future.jpg";
import installation from "@/assets/installation.jpg";
import step1Consultation from "@/assets/process-step-1-consultation.jpg";
import step2Inspection from "@/assets/process-step-2-inspection.jpg";
import step3Design from "@/assets/process-step-3-design.jpg";
import step4Installation from "@/assets/process-step-4-installation.jpg";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/site/HeroSection";
import { SectionHeading } from "@/components/site/Sections";
import { setupRooftopScrollAnimation } from "@/lib/scroll-animation";
import { setupParallaxAndPopAnimation } from "@/lib/parallax-animation";
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

const FOUR_STEP_PROCESS = [
  {
    step: "01",
    title: "Consultation",
    icon: Users,
    image: step1Consultation,
    desc: "Understand your energy needs, power bills & tailor On-Grid, Off-Grid or Hybrid solar options.",
    highlights: ["Free Technical Guidance", "Transparent ROI Estimation"],
  },
  {
    step: "02",
    title: "Site Inspection & System Assessment",
    icon: ClipboardCheck,
    image: step2Inspection,
    desc: "Certified solar engineers survey roof tilt, 3D shadow analysis, structure integrity & DISCOM feasibility.",
    highlights: ["3D Shadow Simulation", "AP Net-Metering Assessment"],
  },
  {
    step: "03",
    title: "Customized Design & Quotation",
    icon: Laptop,
    image: step3Design,
    desc: "Precision 3D CAD design, Tier-1 solar panel selection, PM Surya Ghar subsidy application & clear contract.",
    highlights: ["Custom 3D CAD Plan", "Direct DBT Subsidy Filing"],
  },
  {
    step: "04",
    title: "Installation & Ongoing Support",
    icon: Wrench,
    image: step4Installation,
    desc: "Certified vendor rooftop installation, bidirectional net-meter testing, 25-year warranty & lifetime maintenance.",
    highlights: ["DISCOM Testing & Handover", "25-Yr Performance Guarantee"],
  },
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
    id: "powercare",
    line1: "Power Care",
    line2: "5-Yr Solar Care",
    href: "#powercare",
    icon: () => (
      <svg className="size-5 sm:size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "one-point-contact",
    line1: "One Point",
    line2: "of Contact",
    href: "#one-point-contact",
    icon: () => (
      <svg className="size-5 sm:size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "power-back-promise",
    line1: "Power Back",
    line2: "Promise",
    href: "#power-back-promise",
    icon: () => (
      <svg className="size-5 sm:size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3a4.5 4.5 0 0 0 4.5-4.5V8" />
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
    // Initialize continuous scroll animations for rooftop solar and pop/parallax transitions
    const cleanupRooftop = setupRooftopScrollAnimation();
    const cleanupParallax = setupParallaxAndPopAnimation();
    return () => {
      cleanupRooftop();
      cleanupParallax();
    };
  }, [galleryFilter]);

  // Commercial solar carport canopy (p6) is removed from home page and placed inside "View All Projects" (/projects)
  const homeProjects = PROJECTS.filter((p) => p.id !== "p6");
  const filteredProjects = galleryFilter === "All" ? homeProjects : homeProjects.filter((p) => p.category === galleryFilter);

  return (
    <>
      {/* 1. HOME SECTION */}
      <div id="home">
        <HeroSection />
      </div>

      {/* QUICK HIGHLIGHT FEATURES ROW (MATCHING SCREENSHOT) */}
      <section className="bg-slate-50/60 sm:bg-slate-50/70 py-2 sm:py-5">
        <div className="container-site">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
            {FEATURE_HIGHLIGHTS.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  const targetId = item.href.replace("#", "");
                  if (targetId && document.getElementById(targetId)) {
                    scrollToTarget(targetId);
                  }
                }}
                className="group flex flex-col items-center justify-center rounded-2xl sm:rounded-[22px] bg-white py-2.5 sm:py-6 px-2 text-center shadow-[0_2px_10px_rgba(8,43,76,0.06)] sm:shadow-[0_4px_16px_rgba(8,43,76,0.08)] transition-all duration-300 hover:-translate-y-0.5 sm:hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer border border-transparent hover:border-slate-100"
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

      {/* 2. ABOUT US SECTION - Perfectly Aligned with Logo & Navbar (container-site) */}
      <section id="about" className="bg-gradient-to-b from-[#082B4C] via-[#093259] to-[#082B4C] py-8 sm:py-12 text-white scroll-mt-28">
        <div className="container-site">
          {/* Main About Statement - Perfectly Aligned with Logo */}
          <div className="scroll-pop scroll-pop-1 mb-6 sm:mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-2.5 border border-white/15">
              <Sparkles className="size-3 text-amber-300" /> Amaravati Solar Solutions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              ABOUT
            </h2>
            <p className="mt-1.5 text-base sm:text-lg md:text-xl font-bold text-white/95 leading-snug">
              We don't just install solar. We create a smarter way to power life.
            </p>
            <div className="mt-3.5 flex items-start gap-3 w-full">
              <span className="size-2 rounded-full bg-[#E04F16] mt-2 shrink-0 shadow-[0_0_8px_rgba(224,79,22,0.7)]" />
              <p className="text-xs sm:text-sm md:text-[15px] text-white/90 leading-relaxed text-justify [text-align-last:left] w-full">
                At Amaravati Solar Solutions, we believe the future of energy should be efficient, dependable, and sustainable. Our approach combines thoughtful solar system design, quality components, precision installation, and end-to-end customer support to deliver solutions built around the needs of every customer.
              </p>
            </div>
          </div>

          {/* Vision & Mission - Full-Width 2-Column Symmetrical Grid (Aligned with Navbar edges) */}
          <div className="grid gap-8 md:grid-cols-2 pt-6 border-t border-white/15 w-full">
            {/* Our Vision */}
            <div className="flex flex-col justify-between scroll-pop scroll-pop-2">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="grid size-8 place-items-center rounded-xl bg-amber-400/15 text-amber-300 border border-amber-400/30">
                    <Eye className="size-4" />
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                    Our Vision
                  </h3>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-white/85 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="size-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <p className="flex-1 font-bold text-white text-justify [text-align-last:left]">
                      To redefine the way people experience energy.
                    </p>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="size-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <p className="flex-1 text-white/80 text-justify [text-align-last:left]">
                      We envision a future where every suitable rooftop becomes a source of clean power, every household has greater control over its energy costs, and sustainability becomes a natural part of everyday living.
                    </p>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="size-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <p className="flex-1 text-white/80 text-justify [text-align-last:left]">
                      Our ambition is to build a trusted solar brand that stands for engineering excellence, lasting reliability, and a cleaner tomorrow.
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Our Mission */}
            <div className="flex flex-col justify-between scroll-pop scroll-pop-3">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="grid size-8 place-items-center rounded-xl bg-orange-500/20 text-[#FF7A1A] border border-orange-400/30">
                    <Target className="size-4" />
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                    Our Mission
                  </h3>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-white/85 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="size-1.5 rounded-full bg-[#E04F16] mt-2 shrink-0" />
                    <div className="flex-1">
                      <p className="font-bold text-white text-justify [text-align-last:left]">
                        To make the transition to solar simple, seamless, and worthwhile.
                      </p>
                      <p className="mt-1 text-white/80 text-justify [text-align-last:left]">
                        To accelerate the transition towards clean energy by making solar power accessible and reliable, reducing environmental impact, and inspiring communities to embrace a greener, more sustainable future.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="size-1.5 rounded-full bg-[#E04F16] mt-2 shrink-0" />
                    <p className="flex-1 font-bold text-white text-justify [text-align-last:left]">
                      Together, building a greener society for generations to come.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action CTAs - Aligned with Left Edge */}
          <div className="mt-8 sm:mt-10 flex flex-wrap gap-3.5 scroll-pop scroll-pop-4">
            <Button asChild variant="cta" className="h-10 sm:h-10.5 rounded-full bg-gradient-to-r from-[#D9410E] via-[#E04F16] to-[#F97316] hover:from-[#C03507] hover:to-[#D9410E] text-white px-6 sm:px-7 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg active:scale-95 transition-all">
              <Link to="/about">
                <span>More About Our Company</span>
                <ArrowRight className="size-4 ml-1.5" />
              </Link>
            </Button>
            <Button asChild variant="heroOutline" className="h-10 sm:h-10.5 rounded-full border-white/35 text-white hover:bg-white/10 px-5 sm:px-6 text-xs sm:text-sm font-bold active:scale-95 transition-all">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 3. SOLUTIONS HEADER + A) ON-GRID ROOFTOP SOLAR SYSTEMS */}
      <section id="on-grid" className="container-site pt-6 pb-2 md:pb-3 scroll-mt-24 sm:scroll-mt-28 overflow-x-clip">
        <div id="solar-solutions" className="scroll-mt-24 sm:scroll-mt-28">
          {/* Solutions Header - Side Heading matching Featured projects style */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
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
              <Button asChild variant="cta" className="rounded-[30px] bg-[#B83A16] hover:bg-[#A33112] text-white font-bold text-xs md:text-sm px-5 py-2 shadow-sm transition-all hover:shadow hover:scale-[1.02] active:scale-98">
                <Link to="/services">
                  <span>View All Services</span>
                  <ArrowRight className="size-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div data-rooftop-card="on-grid" className="grid items-stretch gap-6 md:gap-8 lg:grid-cols-2 py-3 sm:py-4 overflow-hidden">
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
      <section id="off-grid" className="container-site py-2 md:py-3 scroll-mt-24 sm:scroll-mt-28 overflow-x-clip">
        <div data-rooftop-card="off-grid" className="grid items-stretch gap-6 md:gap-8 lg:grid-cols-2 py-3 sm:py-4 overflow-hidden">
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
      </section>

      {/* 5. C) HYBRID ROOFTOP SOLAR SYSTEMS */}
      <section id="hybrid" className="container-site py-2 md:py-3 scroll-mt-24 sm:scroll-mt-28 overflow-x-clip">
        <div data-rooftop-card="hybrid" className="grid items-stretch gap-6 md:gap-8 lg:grid-cols-2 py-3 sm:py-4 overflow-hidden">
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
        <div className="mt-3 sm:mt-4 flex justify-center">
          <Button asChild variant="cta" size="default" className="shadow-md">
            <Link to="/services">
              View All Services & Solutions <ArrowRight className="size-4 ml-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* OUR 4-STEP PROCESS - Premium Visual Layout matching exact user specifications */}
      <section id="how-it-works" className="bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-2 sm:pt-3 md:pt-4 pb-3 sm:pb-4 scroll-mt-20 sm:scroll-mt-24 overflow-hidden">
        <div className="container-site">
          {/* Section Header with Curved Orange Swoosh Underline - Left-aligned per user specification */}
          <div className="text-left mb-4 sm:mb-5 scroll-pop scroll-pop-1">
            <div className="inline-flex items-center gap-1 rounded-full bg-[#B83A16]/10 px-3 py-0.5 text-[10px] sm:text-[11px] font-black text-[#B83A16] uppercase tracking-wider mb-1.5">
              <Sparkles className="size-3" /> Seamless End-to-End Execution
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#082B4C] tracking-tight">
              Our <span className="text-[#B83A16]">4-Step Process</span>
            </h2>
            {/* Orange Swoosh Curve */}
            <div className="relative mt-1 h-2.5 w-32 sm:w-44 overflow-hidden">
              <svg viewBox="0 0 200 14" fill="none" className="w-full h-full text-[#B83A16]">
                <path d="M4 11C60 2 140 2 196 11" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-none">
              From your initial site survey to 25 years of clean power generation — clear, engineered, and transparent solar journey.
            </p>
          </div>

          {/* 4 Process Cards Grid with Orange Connector Arrows */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-3 xl:gap-4 items-stretch">
            {FOUR_STEP_PROCESS.map((item, index) => {
              const Icon = item.icon;
              const staggerClass = `scroll-pop-${index + 1}`;
              return (
                <div key={item.step} className="relative flex flex-col">
                  {/* Process Card with Premium Hover Motion */}
                  <div
                    className={cn(
                      "group relative flex-1 flex flex-col isolate overflow-hidden rounded-tl-[36px] rounded-br-[36px] rounded-tr-none rounded-bl-none bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(8,43,76,0.18)] scroll-pop",
                      staggerClass
                    )}
                  >
                    {/* Card Photo Container with Step Pill */}
                    <div className="relative aspect-[16/10] sm:aspect-[16/10.5] w-full overflow-hidden bg-slate-900">
                      <img
                        src={item.image}
                        alt={item.title}
                        width={800}
                        height={500}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#082B4C]/80 via-transparent to-black/20 opacity-40 group-hover:opacity-20 transition-opacity duration-300" />

                      {/* Step Indicator Badge */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1 rounded-full bg-white/95 backdrop-blur-md px-2 py-0.5 text-[11px] font-black text-[#082B4C] shadow-md border border-white/60">
                        <span className="text-[#B83A16] font-black">0{index + 1}</span>
                        <span className="text-[9.5px] text-slate-400 font-bold uppercase tracking-wider ml-0.5">Step</span>
                      </div>
                    </div>

                    {/* Dark Navy Pill Footer Badge matching exact user screenshot */}
                    <div className="bg-[#082B4C] px-3 py-2 sm:py-2.5 text-white flex items-center gap-2.5 transition-colors duration-300 group-hover:bg-[#061e35] shrink-0">
                      <div className="grid size-7 shrink-0 place-items-center rounded-lg bg-white/10 text-white group-hover:bg-[#B83A16] group-hover:scale-105 transition-all duration-300 shadow-2xs">
                        <Icon className="size-3.5" />
                      </div>
                      <div className="h-5 w-[2px] bg-[#B83A16] shrink-0" />
                      <h3 className="text-[11.5px] sm:text-xs font-extrabold text-white leading-tight line-clamp-2">
                        {item.title}
                      </h3>
                    </div>

                    {/* Detailed Card Body */}
                    <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between bg-white text-xs">
                      <p className="text-slate-600 leading-relaxed text-left text-[11px] sm:text-[11.5px] line-clamp-3">
                        {item.desc}
                      </p>
                      <ul className="mt-2.5 pt-2 border-t border-slate-100 space-y-1 text-[10.5px] sm:text-[11px] font-semibold text-slate-700">
                        {item.highlights.map((h, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <CheckCircle2 className="size-3 text-emerald-600 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Circular Orange Chevron Connector Arrow between steps on large screens */}
                  {index < FOUR_STEP_PROCESS.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="hidden lg:grid absolute top-[24%] -right-2.5 xl:-right-3 z-20 size-6.5 xl:size-7 place-items-center rounded-full bg-[#B83A16] text-white shadow-md border-2 border-white pointer-events-none transition-transform duration-300 group-hover:scale-110"
                    >
                      <ChevronRight className="size-3.5" strokeWidth={3} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Action CTA */}
          <div className="mt-4 sm:mt-5 flex justify-center scroll-pop">
            <Button asChild variant="cta" size="sm" className="rounded-[30px] bg-[#B83A16] hover:bg-[#A33112] text-white px-6 py-2 shadow-md text-xs">
              <Link to="/book-a-demo">
                <span>Start Your 4-Step Solar Journey</span>
                <ArrowRight className="size-3.5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 5. POWERCARE SECTION - COMPACT VIEWPORT-FIT DESIGN */}
      <section id="powercare" className="scroll-mt-24 sm:scroll-mt-28 py-3 sm:py-5 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/80 border-t border-b border-slate-200/80">
        <div className="container-site">
          {/* Main PowerCare Container - Engineered to fit 100% in a single screen view without scrolling */}
          <div className="relative overflow-hidden rounded-2xl bg-[#082B4C] text-white shadow-xl border border-[#0d3b66]">
            {/* Ambient Radial Lighting */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 size-72 rounded-full bg-gradient-to-br from-[#E04F16]/20 via-[#0756B9]/15 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 size-64 rounded-full bg-gradient-to-tr from-[#0756B9]/20 to-transparent blur-3xl pointer-events-none" />

            {/* Compact Header Bar */}
            <div className="relative border-b border-white/10 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 bg-white/[0.03]">
              <div className="flex items-center gap-2.5">
                <div className="grid size-8 sm:size-9 place-items-center rounded-lg bg-gradient-to-br from-[#E04F16] to-[#B83A16] text-white shadow-sm shrink-0">
                  <ShieldCheck className="size-4 sm:size-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg sm:text-xl font-black tracking-tight text-white">PowerCare</span>
                    <span className="rounded-full bg-[#E04F16]/25 border border-[#E04F16]/50 px-2 py-0.5 text-[9px] sm:text-[10px] font-black uppercase text-amber-300 tracking-wider">
                      5-Year Guarantee
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-white/75 font-semibold tracking-wide uppercase">
                    5 Years of Comprehensive Solar Care • Amaravati Solar Solutions
                  </p>
                </div>
              </div>

              {/* 5Y Badge */}
              <div className="hidden sm:flex items-center gap-2 rounded-lg bg-white/10 border border-white/15 px-3 py-1 backdrop-blur-md">
                <div className="grid size-6 place-items-center rounded bg-gradient-to-br from-amber-400 to-[#E04F16] text-[#082B4C] font-black text-xs">
                  5Y
                </div>
                <div className="text-left leading-none">
                  <div className="text-[10px] font-black text-white">COMPREHENSIVE</div>
                  <div className="text-[8.5px] font-bold text-amber-300">SOLAR CARE</div>
                </div>
              </div>
            </div>

            {/* Core Overview & 3 Protocols + Compact Visual Grid */}
            <div className="relative px-4 sm:px-6 py-3 sm:py-4 grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 lg:gap-5 items-stretch">
              {/* Left Column (7 cols): Statement + 3 Compact Protocols */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-2.5 sm:space-y-3">
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-black text-white leading-snug">
                    More than routine maintenance. <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-[#E04F16]">A long-term commitment.</span>
                  </h3>
                  <p className="mt-1 text-[11px] sm:text-xs text-white/80 leading-relaxed line-clamp-2">
                    More than routine maintenance, <strong className="text-white font-bold">PowerCare</strong> is our commitment to keeping your solar system in top condition. Through dedicated structural, electrical, and mechanical inspections, preventive maintenance, and reliable service support, we help maintain system safety and peak generation.
                  </p>
                </div>

                {/* 3 Inspection Protocols (Structural, Electrical, Mechanical) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                  {/* Structural */}
                  <div className="rounded-lg bg-white/[0.06] border border-white/10 p-2.5 backdrop-blur-sm">
                    <div className="flex items-center gap-1.5 pb-1.5 border-b border-white/10 text-amber-300">
                      <Wrench className="size-3.5 shrink-0" />
                      <h4 className="text-[11px] font-black uppercase tracking-wider text-white">Structural</h4>
                    </div>
                    <ul className="mt-1.5 space-y-1 text-[10px] sm:text-[10.5px] text-white/80">
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="size-2.5 text-[#E04F16] shrink-0" />
                        <span className="truncate">Stability check</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="size-2.5 text-[#E04F16] shrink-0" />
                        <span className="truncate">Tightness & align</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="size-2.5 text-[#E04F16] shrink-0" />
                        <span className="truncate">Rust condition</span>
                      </li>
                    </ul>
                  </div>

                  {/* Electrical */}
                  <div className="rounded-lg bg-white/[0.06] border border-white/10 p-2.5 backdrop-blur-sm">
                    <div className="flex items-center gap-1.5 pb-1.5 border-b border-white/10 text-sky-300">
                      <PlugZap className="size-3.5 shrink-0" />
                      <h4 className="text-[11px] font-black uppercase tracking-wider text-white">Electrical</h4>
                    </div>
                    <ul className="mt-1.5 space-y-1 text-[10px] sm:text-[10.5px] text-white/80">
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="size-2.5 text-sky-400 shrink-0" />
                        <span className="truncate">Cable & connectors</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="size-2.5 text-sky-400 shrink-0" />
                        <span className="truncate">Protection devices</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="size-2.5 text-sky-400 shrink-0" />
                        <span className="truncate">Inverter check</span>
                      </li>
                    </ul>
                  </div>

                  {/* Mechanical */}
                  <div className="rounded-lg bg-white/[0.06] border border-white/10 p-2.5 backdrop-blur-sm">
                    <div className="flex items-center gap-1.5 pb-1.5 border-b border-white/10 text-emerald-300">
                      <HardHat className="size-3.5 shrink-0" />
                      <h4 className="text-[11px] font-black uppercase tracking-wider text-white">Mechanical</h4>
                    </div>
                    <ul className="mt-1.5 space-y-1 text-[10px] sm:text-[10.5px] text-white/80">
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="size-2.5 text-emerald-400 shrink-0" />
                        <span className="truncate">Module & mounting</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="size-2.5 text-emerald-400 shrink-0" />
                        <span className="truncate">Fasteners check</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="size-2.5 text-emerald-400 shrink-0" />
                        <span className="truncate">Overall condition</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column (5 cols): Engineer On-Site Inspection Visual with Glass Badges */}
              <div className="lg:col-span-5 relative w-full h-[180px] sm:h-[195px] lg:h-full min-h-[180px] rounded-xl overflow-hidden border border-white/15 shadow-md group">
                <img
                  src={step2Inspection}
                  alt="Certified solar engineer performing PowerCare rooftop inspection"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#082B4C] via-[#082B4C]/25 to-transparent" />

                {/* Floating Glass Badges */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-navy/90 border border-white/20 px-2.5 py-0.5 text-[10px] font-black text-white backdrop-blur shadow-sm">
                  <ShieldCheck className="size-3 text-amber-400" />
                  <span>Certified Solar Engineers</span>
                </div>

                <div className="absolute bottom-2 left-2 right-2 p-2 rounded-lg bg-navy/90 border border-white/20 backdrop-blur-md">
                  <div className="flex items-center justify-between text-[11px] text-white">
                    <span className="font-extrabold text-amber-300">Scheduled 5-Year Maintenance</span>
                    <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded font-bold">Free with All Systems</span>
                  </div>
                  <p className="text-[9.5px] text-white/80 mt-0.5 leading-snug truncate">
                    Periodic physical audit, string voltage testing, and dust cleaning verification across AP.
                  </p>
                </div>
              </div>
            </div>

            {/* 5 Value Pillars Streamlined Strip */}
            <div className="relative border-t border-white/10 bg-black/25 px-4 sm:px-6 py-2">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2">
                <div className="rounded bg-white/[0.04] border border-white/10 px-2 py-1 text-center">
                  <span className="text-[10px] sm:text-[11px] font-black uppercase text-amber-300 block truncate">Preventive Maintenance</span>
                  <span className="text-[8.5px] sm:text-[9px] text-white/70 block truncate">Regular cleaning & care</span>
                </div>
                <div className="rounded bg-white/[0.04] border border-white/10 px-2 py-1 text-center">
                  <span className="text-[10px] sm:text-[11px] font-black uppercase text-amber-300 block truncate">Dedicated Support</span>
                  <span className="text-[8.5px] sm:text-[9px] text-white/70 block truncate">Prompt on-site assistance</span>
                </div>
                <div className="rounded bg-white/[0.04] border border-white/10 px-2 py-1 text-center">
                  <span className="text-[10px] sm:text-[11px] font-black uppercase text-amber-300 block truncate">Better Performance</span>
                  <span className="text-[8.5px] sm:text-[9px] text-white/70 block truncate">Peak generation guarantee</span>
                </div>
                <div className="rounded bg-white/[0.04] border border-white/10 px-2 py-1 text-center">
                  <span className="text-[10px] sm:text-[11px] font-black uppercase text-amber-300 block truncate">Greater Reliability</span>
                  <span className="text-[8.5px] sm:text-[9px] text-white/70 block truncate">Safe & dependable life</span>
                </div>
                <div className="col-span-2 sm:col-span-1 rounded bg-white/[0.04] border border-white/10 px-2 py-1 text-center">
                  <span className="text-[10px] sm:text-[11px] font-black uppercase text-amber-300 block truncate">Planned Service Visits</span>
                  <span className="text-[8.5px] sm:text-[9px] text-white/70 block truncate">Regular 5-year audits</span>
                </div>
              </div>
            </div>

            {/* Compact Bottom Tagline & CTA Bar */}
            <div className="relative border-t border-white/10 bg-gradient-to-r from-[#B83A16] via-[#D9410E] to-[#E04F16] px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-white">
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm font-black tracking-tight">Complete Care. Reliable Power. Greener Tomorrow.</p>
                <p className="text-[10px] sm:text-[11px] text-white/90">Talk to certified Amaravati Solar engineers for free inspection scheduling.</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to="/book-a-demo"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-[#082B4C] shadow hover:bg-slate-100 transition-all active:scale-95"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight className="size-3" />
                </Link>
                <a
                  href="tel:+917989641899"
                  className="inline-flex items-center gap-1.5 rounded-full bg-black/25 hover:bg-black/35 border border-white/30 px-3 py-1.5 text-xs font-bold text-white transition-all active:scale-95"
                >
                  <Phone className="size-3" />
                  <span>Call Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5B. ONE POINT OF CONTACT - Your Complete Solar Journey. One Trusted Partner */}
      <section id="one-point-contact" className="scroll-mt-24 sm:scroll-mt-28 py-8 sm:py-12 bg-white border-b border-slate-200/80">
        <div className="container-site">
          <div className="max-w-none scroll-pop scroll-pop-1">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E04F16]/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#E04F16] border border-[#E04F16]/20">
              <Users className="size-3.5" />
              <span>ONE TRUSTED PARTNER • COMPLETE SOLAR JOURNEY</span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-black text-[#082B4C] tracking-tight">
              One Point of Contact
            </h2>
            <p className="mt-1.5 text-base sm:text-lg md:text-xl font-bold text-[#E04F16]">
              Your Complete Solar Journey. One Trusted Partner.
            </p>
            <p className="mt-1 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-none">
              From the first conversation to long-term support, we take care of your solar journey at every step.
            </p>
          </div>

          {/* 9-Step End-to-End Workflow Grid */}
          <div className="mt-6 sm:mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2.5 sm:gap-3">
              {[
                { step: "01", title: "Consultation", icon: Headphones },
                { step: "02", title: "Site Check", icon: ClipboardCheck },
                { step: "03", title: "System Design", icon: SlidersHorizontal },
                { step: "04", title: "Installation", icon: Wrench },
                { step: "05", title: "Subsidy Assistance", icon: FileText },
                { step: "06", title: "Loan Assistance", icon: BadgeCheck },
                { step: "07", title: "Commissioning", icon: PlugZap },
                { step: "08", title: "Servicing", icon: ShieldCheck },
                { step: "09", title: "Post-Sales Support", icon: Phone },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="group relative flex flex-col items-center text-center p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#E04F16]/40 hover:bg-white hover:shadow-md transition-all duration-300"
                  >
                    <span className="text-[10px] font-black text-[#E04F16] tracking-wider mb-1.5">
                      STEP {item.step}
                    </span>
                    <div className="grid size-9 place-items-center rounded-lg bg-white border border-slate-200 text-[#082B4C] group-hover:bg-[#E04F16] group-hover:text-white transition-colors duration-300 mb-2 shadow-2xs">
                      <Icon className="size-4" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-extrabold text-[#082B4C] leading-tight">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tagline & Call-to-action Strip */}
          <div className="mt-6 sm:mt-8 rounded-2xl bg-gradient-to-r from-[#082B4C] via-[#0b3c6a] to-[#E04F16] p-5 sm:p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm sm:text-base font-extrabold">
                One partner. Complete solar solutions. A greener tomorrow.
              </p>
              <p className="text-xs text-white/80">
                Single dedicated project manager assigned for your rooftop project from start to finish.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/book-a-demo"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-[#082B4C] shadow-md hover:bg-slate-100 transition-all active:scale-95"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 px-4 py-2.5 text-xs sm:text-sm font-bold text-white transition-all active:scale-95"
              >
                <span>Contact Dedicated Manager</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5C. POWER BACK PROMISE - Solar Performance. Financial Assurance. */}
      <section id="power-back-promise" className="scroll-mt-24 sm:scroll-mt-28 py-8 sm:py-12 bg-gradient-to-b from-white via-emerald-50/20 to-white border-b border-slate-200/80">
        <div className="container-site">
          <div className="max-w-none scroll-pop scroll-pop-1">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-emerald-700 border border-emerald-600/20">
              <ShieldCheck className="size-3.5" />
              <span>PERFORMANCE GUARANTEE • FINANCIAL ASSURANCE</span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-black text-[#082B4C] tracking-tight">
              Power Back Promise
            </h2>
            <p className="mt-1.5 text-base sm:text-lg md:text-xl font-bold text-[#E04F16]">
              Solar Performance. Financial Assurance.
            </p>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed max-w-none">
              At Amaravati Solar Solutions, we stand behind our commitment to reliable solar performance. With our Power-Back Promise, eligible customers can receive <strong className="text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">₹6 /Unit compensation</strong> when actual solar generation falls below the agreed performance benchmark, subject to applicable terms and conditions.
            </p>
          </div>

          {/* 3 Pillars of Power Back Promise */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="grid size-11 place-items-center rounded-xl bg-emerald-100 text-emerald-700 font-black text-xl shadow-2xs">
                  ₹6
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#082B4C]">₹6 /Unit Compensation</h3>
                  <span className="text-[11px] text-slate-500 font-medium">Generation shortfall backup</span>
                </div>
              </div>
              <p className="mt-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Direct financial assurance if generation falls below committed benchmarks, protecting your monthly return on investment.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="grid size-11 place-items-center rounded-xl bg-[#082B4C]/10 text-[#082B4C] shadow-2xs">
                  <Target className="size-5 text-[#082B4C]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#082B4C]">Transparent Benchmarks</h3>
                  <span className="text-[11px] text-slate-500 font-medium">Clear energy auditing</span>
                </div>
              </div>
              <p className="mt-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our goal is to give you greater confidence in your solar investment with transparent commitments and dependable support.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="grid size-11 place-items-center rounded-xl bg-[#E04F16]/10 text-[#E04F16] shadow-2xs">
                  <Sparkles className="size-5 text-[#E04F16]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#082B4C]">Smarter Solar Value</h3>
                  <span className="text-[11px] text-slate-500 font-medium">More confidence, more value</span>
                </div>
              </div>
              <p className="mt-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                More Confidence. More Value. Smarter Solar. Engineered with Tier-1 components and continuous remote monitoring.
              </p>
            </div>
          </div>

          {/* Action Strip */}
          <div className="mt-6 sm:mt-8 rounded-2xl bg-gradient-to-r from-emerald-800 via-[#082B4C] to-[#E04F16] p-5 sm:p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm sm:text-base font-extrabold">
                More Confidence. More Value. Smarter Solar.
              </p>
              <p className="text-xs text-white/80">
                Talk to our technical team about eligible rooftop solar systems with Power-Back Promise.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/book-a-demo"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-[#082B4C] shadow-md hover:bg-slate-100 transition-all active:scale-95"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 px-4 py-2.5 text-xs sm:text-sm font-bold text-white transition-all active:scale-95"
              >
                <span>Inquire About Terms</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROJECTS - Pop & Parallax Transitions */}
      <section id="projects" className="container-site pt-2 sm:pt-3 pb-6 md:pb-8 scroll-mt-24 sm:scroll-mt-28">
        <span id="gallery" className="sr-only" />
        <div className="flex flex-wrap gap-2 scroll-pop scroll-pop-1" role="tablist" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={galleryFilter === f}
              onClick={() => setGalleryFilter(f)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm font-semibold transition-all active:scale-95 cursor-pointer select-none",
                galleryFilter === f
                  ? "border-navy bg-navy text-navy-foreground shadow-sm scale-[1.02]"
                  : "bg-background text-navy hover:border-primary hover:text-primary active:bg-slate-100"
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs sm:text-sm text-muted-foreground scroll-pop scroll-pop-2 max-w-none">
          These are sample placeholders. Verified project photos and details will be added soon.
        </p>

        <div key={galleryFilter} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((p, i) => {
            const staggerClass = `pop-stagger-${Math.min((i % 6) + 1, 6)}`;
            const eyebrow =
              p.category?.toLowerCase() === "residential"
                ? "FOR HOMES"
                : p.category?.toLowerCase() === "commercial"
                ? "FOR BUSINESSES"
                : p.category?.toLowerCase() === "industrial"
                ? "FOR INDUSTRY"
                : "SOLAR PROJECT";

            return (
              <Link
                key={p.id}
                to="/projects/$id"
                params={{ id: p.id }}
                className={cn(
                  "group relative overflow-hidden rounded-none bg-gradient-to-br from-[#FFFDF9] via-white to-[#FFF5EA] text-left p-4 sm:p-5 shadow-[0_4px_16px_rgba(224,79,22,0.06)] border border-orange-200/70 hover:border-[#E04F16] hover:shadow-[0_16px_36px_rgba(224,79,22,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-row items-center justify-between gap-3 sm:gap-4 parallax-card animate-pop-in",
                  staggerClass
                )}
              >
                {/* Left: Content & Circular Arrow */}
                <div className="flex-1 flex flex-col justify-between h-full min-w-0 pr-1">
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#E04F16] bg-[#E04F16]/10 border border-[#E04F16]/20 px-2.5 py-0.5 rounded-full inline-block">
                      {eyebrow}
                    </span>
                    <h3 className="mt-1.5 text-sm sm:text-base font-extrabold text-[#082B4C] leading-snug line-clamp-2 group-hover:text-[#E04F16] transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-[11px] sm:text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {p.summary || "High-yield precision-engineered solar installation."}
                    </p>
                  </div>

                  <div className="mt-3.5 sm:mt-4 flex items-center justify-between">
                    <div className="size-8 sm:size-8.5 rounded-full bg-gradient-to-r from-[#D9410E] via-[#E04F16] to-[#F97316] text-white shadow-md shadow-[#E04F16]/25 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 grid place-items-center">
                      <ArrowRight className="size-3.5 sm:size-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    {p.capacity ? (
                      <span className="text-[10px] sm:text-[11px] font-bold text-[#B83A16] bg-white border border-orange-200/80 px-2 py-0.5 rounded-md shadow-2xs">
                        {p.capacity}
                      </span>
                    ) : (
                      <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 bg-white border border-orange-100 px-2 py-0.5 rounded-md">
                        {p.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: Square Image Viewport */}
                <div className="w-28 sm:w-32 md:w-36 aspect-square rounded-none overflow-hidden shrink-0 shadow-2xs border border-orange-100/80 relative bg-slate-100">
                  <img
                    src={p.image}
                    alt={p.title}
                    width={1920}
                    height={1088}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                  />
                </div>
              </Link>
            );
          })}
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
