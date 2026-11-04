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
  PlugZap,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Target,
  Users,
  Wrench,
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
import { HeroCarousel } from "@/components/site/HeroCarousel";
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
        <HeroCarousel />
      </div>

      {/* QUICK HIGHLIGHT FEATURES ROW (MATCHING SCREENSHOT) */}
      <section className="bg-slate-50/60 sm:bg-slate-50/70 py-2 sm:py-5">
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
                className="group flex flex-col items-center justify-center rounded-2xl sm:rounded-[22px] bg-white py-2.5 sm:py-6 px-2 text-center shadow-[0_2px_10px_rgba(8,43,76,0.06)] sm:shadow-[0_4px_16px_rgba(8,43,76,0.08)] transition-all duration-300 hover:-translate-y-0.5 sm:hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer"
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

      {/* 2. ABOUT US SECTION - Clean, Borderless Layout with Left-Aligned Headings */}
      <section id="about" className="bg-gradient-to-b from-[#082B4C] via-[#093259] to-[#082B4C] py-5 sm:py-8 text-white scroll-mt-28">
        <div className="container-site max-w-5xl">
          {/* Main About Statement - Left Aligned */}
          <div className="text-left scroll-pop scroll-pop-1 mb-5 sm:mb-7">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold text-gold uppercase tracking-wider mb-2 border border-white/15">
              <Sparkles className="size-3" /> Amaravati Solar Solutions
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              ABOUT
            </h2>
            <p className="mt-1 text-sm sm:text-base md:text-lg font-bold text-white/95 leading-snug max-w-3xl">
              We don't just install solar. We create a smarter way to power life.
            </p>
            <div className="mt-3 flex items-start gap-2.5 max-w-3xl">
              <span className="size-1.5 rounded-full bg-[#B83A16] mt-2 shrink-0" />
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                At Amaravati Solar Solutions, we believe the future of energy should be efficient, dependable, and sustainable. Our approach combines thoughtful solar system design, quality components, precision installation, and end-to-end customer support to deliver solutions built around the needs of every customer.
              </p>
            </div>
          </div>

          {/* Vision & Mission - Clean, Borderless 2-Column Grid */}
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 pt-3 border-t border-white/10">
            {/* Our Vision */}
            <div className="flex flex-col justify-between scroll-pop scroll-pop-2">
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="grid size-7 place-items-center rounded-lg bg-white/10 text-gold">
                    <Eye className="size-3.5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                    Our Vision
                  </h3>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-white/85 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="size-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    <span className="font-bold text-white">
                      To redefine the way people experience energy.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="size-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    <span className="text-white/80">
                      We envision a future where every suitable rooftop becomes a source of clean power, every household has greater control over its energy costs, and sustainability becomes a natural part of everyday living.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="size-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    <span className="text-white/80">
                      Our ambition is to build a trusted solar brand that stands for engineering excellence, lasting reliability, and a cleaner tomorrow.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Our Mission */}
            <div className="flex flex-col justify-between scroll-pop scroll-pop-3">
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="grid size-7 place-items-center rounded-lg bg-[#B83A16]/20 text-[#D9531E]">
                    <Target className="size-3.5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                    Our Mission
                  </h3>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-white/85 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="size-1.5 rounded-full bg-[#D9531E] mt-2 shrink-0" />
                    <div>
                      <p className="font-bold text-white">
                        To make the transition to solar simple, seamless, and worthwhile.
                      </p>
                      <p className="mt-1 text-white/80">
                        To accelerate the transition towards clean energy by making solar power accessible and reliable, reducing environmental impact, and inspiring communities to embrace a greener, more sustainable future.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="size-1.5 rounded-full bg-[#D9531E] mt-2 shrink-0" />
                    <span className="font-bold text-white">
                      Together, building a greener society for generations to come
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action CTA - Left Aligned */}
          <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 scroll-pop scroll-pop-4">
            <Button asChild variant="cta" className="h-9 sm:h-9.5 rounded-[30px] bg-[#B83A16] hover:bg-[#A33112] text-white px-5 sm:px-6 text-xs sm:text-sm font-bold shadow-xs">
              <Link to="/about">
                <span>More About Our Company</span>
                <ArrowRight className="size-3.5 ml-1" />
              </Link>
            </Button>
            <Button asChild variant="heroOutline" className="h-9 sm:h-9.5 rounded-[30px] border-white/40 text-white hover:bg-white/10 px-4 sm:px-5 text-xs sm:text-sm font-bold">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Solutions Header - Side Heading matching Featured projects style */}
      <div className="container-site pt-5 pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3">
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

      {/* 3. A) ON-GRID ROOFTOP SOLAR SYSTEMS */}
      <section id="on-grid" className="container-site py-2 md:py-3 scroll-mt-24 sm:scroll-mt-28 overflow-x-clip">
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
          {/* Section Header with Curved Orange Swoosh Underline */}
          <div className="text-center mb-3 sm:mb-4 md:mb-5 scroll-pop scroll-pop-1">
            <div className="inline-flex items-center gap-1 rounded-full bg-[#B83A16]/10 px-3 py-0.5 text-[10px] sm:text-[11px] font-black text-[#B83A16] uppercase tracking-wider mb-1.5">
              <Sparkles className="size-3" /> Seamless End-to-End Execution
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#082B4C] tracking-tight">
              Our <span className="text-[#B83A16]">4-Step Process</span>
            </h2>
            {/* Orange Swoosh Curve */}
            <div className="relative mx-auto mt-1 h-2.5 w-32 sm:w-44 overflow-hidden">
              <svg viewBox="0 0 200 14" fill="none" className="w-full h-full text-[#B83A16]">
                <path d="M4 11C60 2 140 2 196 11" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
            <p className="mt-1.5 text-xs sm:text-[13px] text-slate-600 max-w-xl mx-auto leading-relaxed">
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

      {/* 6. GALLERY / PROJECTS - Pop & Parallax Transitions */}
      <section id="gallery" className="container-site pt-2 sm:pt-3 pb-6 md:pb-8 scroll-mt-24 sm:scroll-mt-28">
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
        <p className="mt-4 text-sm text-muted-foreground scroll-pop scroll-pop-2">
          These are sample placeholders. Verified project photos and details will be added soon.
        </p>

        <div key={galleryFilter} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((p, i) => {
            const staggerClass = `pop-stagger-${Math.min((i % 6) + 1, 6)}`;
            return (
              <Link
                key={p.id}
                to="/projects/$id"
                params={{ id: p.id }}
                className={cn(
                  "group overflow-hidden rounded-2xl bg-card text-left shadow-card transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 active:scale-[0.98] flex flex-col parallax-card animate-pop-in",
                  staggerClass
                )}
              >
                <div className="relative aspect-[4/3] overflow-hidden parallax-wrap">
                  <img
                    src={p.image}
                    alt={p.title}
                    width={1920}
                    height={1088}
                    loading="lazy"
                    data-parallax
                    data-parallax-rate="0.08"
                    className="parallax-img h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-85" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-extrabold text-navy shadow-sm">
                    {p.category}
                  </span>
                  {p.placeholder && (
                    <span className="absolute right-4 top-4 rounded-full bg-navy/80 px-3 py-1 text-xs font-semibold text-navy-foreground shadow-sm">
                      Sample
                    </span>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                  <h3 className="text-lg font-bold text-navy line-clamp-2 group-hover:text-primary transition-colors">{p.title}</h3>
                  <span className="mt-2 inline-block text-sm font-bold text-primary group-hover:translate-x-1 transition-transform">
                    View Project →
                  </span>
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
