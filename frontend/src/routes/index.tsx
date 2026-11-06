import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Battery,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Eye,
  FileCheck2,
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
  Zap,
} from "lucide-react";
import heroSunriseClassic from "@/assets/hero-sunrise-classic.jpg";
import projectResidentialRooftopPergola from "@/assets/project-residential-rooftop-pergola.jpg";
import projectHybridStorageVilla from "@/assets/project-hybrid-storage-villa-8kw.jpg";
import projectResidentialVilla from "@/assets/project-residential-villa-10kw.jpg";
import projectCommercialRooftop from "@/assets/project-commercial-rooftop-75kwp.jpg";
import step1Consultation from "@/assets/process-step-1-consultation.jpg";
import step2Inspection from "@/assets/process-step-2-inspection.jpg";
import step3Design from "@/assets/process-step-3-design.jpg";
import step4Installation from "@/assets/process-step-4-installation.jpg";
import stepSubsidyLoan from "@/assets/process-step-subsidy-loan.jpg";
import projectResidentialInverter10kw from "@/assets/project-residential-inverter-10kw.jpg";
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
    phaseBadge: "PHASE 01 • CONSULTATION",
    stepperLabel: "Consultation",
    duration: "Day 1 • 1 Business Day",
    title: "Energy Audit & Sizing",
    icon: Users,
    image: step1Consultation,
    desc: "Personalized analysis of your past 12-month power bills, daytime appliances & roof space to recommend the ideal solar architecture.",
    photoPill: "Free 1-on-1 Advisory",
    deliverables: [
      "12-Month DISCOM Bill & Peak Load Profile",
      "Calculated Solar Capacity (3 kW to 100 kW+)",
      "₹78,000 PM Surya Ghar Subsidy Breakdown",
    ],
    ctaText: "Book Free Consultation",
    ctaLink: "/book-a-demo?service=Consultation+%26+Energy+Audit&tab=calendar",
    theme: {
      cardBorder: "border-amber-200/90 hover:border-amber-500",
      cardShadow: "hover:shadow-[0_22px_45px_rgba(245,158,11,0.18)]",
      headerBg: "bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent",
      headerBorder: "border-amber-100",
      badgeText: "text-amber-800 bg-amber-100/80 border-amber-300/80",
      iconWrap: "bg-amber-500 text-white shadow-amber-500/30",
      deliverableBg: "bg-amber-50/50 border-amber-100/80 text-amber-950",
      checkIcon: "text-amber-600",
      ctaBtn: "text-amber-700 bg-amber-50 hover:bg-amber-500 hover:text-white border-amber-200 hover:border-amber-500",
      stepperActive: "bg-amber-50 text-amber-800 border-amber-300",
      stepperNum: "bg-amber-500 text-white",
      tagText: "Zero Obligation",
    },
  },
  {
    step: "02",
    phaseBadge: "PHASE 02 • SITE SURVEY",
    stepperLabel: "3D Roof Survey",
    duration: "Days 2–3 • On-Site",
    title: "Site Inspection & 3D Modeling",
    icon: HardHat,
    image: step2Inspection,
    desc: "Certified engineers visit your rooftop across AP & Telangana to map azimuth tilt, civil load-bearing capacity & 365-day shadow paths.",
    photoPill: "3D LiDAR & Drone Scan",
    deliverables: [
      "365-Day Seasonal Solar Shadow Heatmap",
      "RCC Slab / Shed Structural Load Certificate",
      "DISCOM Transformer Feasibility Sanction",
    ],
    ctaText: "Schedule Site Survey",
    ctaLink: "/book-a-demo?service=Site+Inspection+%26+3D+Shadow+Modeling&tab=calendar",
    theme: {
      cardBorder: "border-sky-200/90 hover:border-sky-500",
      cardShadow: "hover:shadow-[0_22px_45px_rgba(14,165,233,0.18)]",
      headerBg: "bg-gradient-to-r from-sky-500/10 via-sky-500/5 to-transparent",
      headerBorder: "border-sky-100",
      badgeText: "text-sky-800 bg-sky-100/80 border-sky-300/80",
      iconWrap: "bg-sky-500 text-white shadow-sky-500/30",
      deliverableBg: "bg-sky-50/50 border-sky-100/80 text-sky-950",
      checkIcon: "text-sky-600",
      ctaBtn: "text-sky-700 bg-sky-50 hover:bg-sky-500 hover:text-white border-sky-200 hover:border-sky-500",
      stepperActive: "bg-sky-50 text-sky-800 border-sky-300",
      stepperNum: "bg-sky-500 text-white",
      tagText: "Certified Civil Audit",
    },
  },
  {
    step: "03",
    phaseBadge: "PHASE 03 • ENGINEERING",
    stepperLabel: "CAD & Subsidy",
    duration: "Days 4–7 • Digital Sync",
    title: "Custom CAD Design & Subsidy",
    icon: Laptop,
    image: step3Design,
    desc: "Precision engineering team prepares 3D AutoCAD string layouts, electrical Single-Line Diagrams (SLD) & files for DBT portal subsidy token.",
    photoPill: "AutoCAD & SLD Simulation",
    deliverables: [
      "Custom 3D CAD Rooftop String Blueprint",
      "170 km/h Wind-Rated HDG Mounting Design",
      "PM Surya Ghar National Portal DBT Token",
    ],
    ctaText: "Review Engineering Specs",
    ctaLink: "/process",
    theme: {
      cardBorder: "border-indigo-200/90 hover:border-indigo-500",
      cardShadow: "hover:shadow-[0_22px_45px_rgba(99,102,241,0.18)]",
      headerBg: "bg-gradient-to-r from-indigo-500/10 via-indigo-500/5 to-transparent",
      headerBorder: "border-indigo-100",
      badgeText: "text-indigo-800 bg-indigo-100/80 border-indigo-300/80",
      iconWrap: "bg-indigo-600 text-white shadow-indigo-600/30",
      deliverableBg: "bg-indigo-50/50 border-indigo-100/80 text-indigo-950",
      checkIcon: "text-indigo-600",
      ctaBtn: "text-indigo-700 bg-indigo-50 hover:bg-indigo-600 hover:text-white border-indigo-200 hover:border-indigo-600",
      stepperActive: "bg-indigo-50 text-indigo-800 border-indigo-300",
      stepperNum: "bg-indigo-600 text-white",
      tagText: "Tier-1 Module Spec",
    },
  },
  {
    step: "04",
    phaseBadge: "PHASE 04 • TURNKEY EPC",
    stepperLabel: "Installation & SLA",
    duration: "Days 8–14 • Commissioned",
    title: "Turnkey EPC & Grid Sync",
    icon: PlugZap,
    image: step4Installation,
    desc: "Certified technicians install Tier-1 modules, dual chemical earthing (< 2Ω) & coordinate AP/TS DISCOM bi-directional net-meter sync.",
    photoPill: "Net-Meter Synchronized",
    deliverables: [
      "Bi-Directional Utility Net-Meter Testing",
      "Dual Chemical Earthing (< 2Ω) + Lightning SPD",
      "25-Yr Performance Warranty + PowerCare SLA",
    ],
    ctaText: "Explore PowerCare SLA",
    ctaLink: "/powercare",
    theme: {
      cardBorder: "border-emerald-300/90 hover:border-emerald-500",
      cardShadow: "hover:shadow-[0_22px_45px_rgba(16,185,129,0.2)]",
      headerBg: "bg-gradient-to-r from-emerald-500/15 via-teal-500/5 to-transparent",
      headerBorder: "border-emerald-200",
      badgeText: "text-emerald-900 bg-emerald-100/90 border-emerald-300",
      iconWrap: "bg-emerald-600 text-white shadow-emerald-600/30",
      deliverableBg: "bg-emerald-50/60 border-emerald-100/90 text-emerald-950",
      checkIcon: "text-emerald-600",
      ctaBtn: "text-emerald-800 bg-emerald-50 hover:bg-emerald-600 hover:text-white border-emerald-300 hover:border-emerald-600",
      stepperActive: "bg-emerald-50 text-emerald-800 border-emerald-300",
      stepperNum: "bg-emerald-600 text-white",
      tagText: "25-Yr Performance Guarantee",
    },
  },
];

const SOLAR_SYSTEMS_SHOWCASE = [
  {
    id: "on-grid",
    to: "/services/on-grid-solar-systems",
    badge: "Most Popular",
    badgeColor: "text-emerald-700 border-emerald-300",
    pill: "Up to 90% Bill Cut",
    pillColor: "bg-emerald-600 text-white",
    title: "On-Grid Solar Systems",
    subtitle: "Rooftop Net-Metering",
    image: projectResidentialVilla,
    desc: "Works in sync with DISCOM utility power. Surplus power exports via net-metering to drastically cut power bills.",
    perks: [
      "PM Surya Ghar subsidy up to ₹78,000",
      "Payback period of 3 to 4 years",
      "Zero battery maintenance overhead",
    ],
    ctaText: "Explore On-Grid",
  },
  {
    id: "off-grid",
    to: "/services/off-grid-solar-systems",
    badge: "100% Autonomous",
    badgeColor: "text-sky-700 border-sky-300",
    pill: "Zero Grid Dependency",
    pillColor: "bg-sky-600 text-white",
    title: "Off-Grid Solar Systems",
    subtitle: "Battery Bank Storage",
    image: projectResidentialRooftopPergola,
    desc: "Complete energy independence with deep-cycle battery banks. Generates and stores clean electricity 24/7.",
    perks: [
      "100% independence from utility grid",
      "Runs heavy ACs, motors & appliances",
      "Reliable power in remote farmhouses",
    ],
    ctaText: "Explore Off-Grid",
  },
  {
    id: "hybrid",
    to: "/services/hybrid-solar-systems",
    badge: "Smart Dual-Mode",
    badgeColor: "text-purple-700 border-purple-300",
    pill: "24/7 Power Security",
    pillColor: "bg-purple-600 text-white",
    title: "Hybrid Solar Systems",
    subtitle: "Storage + Net-Metering",
    image: projectHybridStorageVilla,
    desc: "The best of both worlds: daytime grid export credits plus instant millisecond battery backup during power cuts.",
    perks: [
      "< 20ms automatic switchover",
      "Export surplus while batteries charge",
      "Modular wall-mounted Lithium batteries",
    ],
    ctaText: "Explore Hybrid",
  },
  {
    id: "commercial",
    to: "/services/commercial-solar-installations",
    badge: "High ROI • Enterprise",
    badgeColor: "text-orange-700 border-orange-300",
    pill: "40% Tax Benefit",
    pillColor: "bg-[#E04F16] text-white",
    title: "Commercial & Industrial",
    subtitle: "25 kW to 500 kW+ Plants",
    image: projectCommercialRooftop,
    desc: "Engineered for factories, hospitals, warehouses & institutions to slash HT/LT tariffs with maximum tax write-offs.",
    perks: [
      "40% Accelerated Depreciation tax benefit",
      "Custom elevated rooftop superstructures",
      "CEIG safety approval & DISCOM sync",
    ],
    ctaText: "Explore Commercial",
  },
];

const FEATURE_HIGHLIGHTS = [
  {
    line1: "On-Grid",
    line2: "Solar Systems",
    to: "/services/on-grid-solar-systems",
    icon: () => (
      <svg className="size-4.5 sm:size-5.5 lg:size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
    to: "/services/off-grid-solar-systems",
    icon: () => (
      <svg className="size-4.5 sm:size-5.5 lg:size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
    to: "/services/hybrid-solar-systems",
    icon: () => (
      <svg className="size-4.5 sm:size-5.5 lg:size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        <path d="M5 5l2.2 2.2M16.8 16.8L19 19M5 19l2.2-2.2M16.8 7.2L19 5" />
      </svg>
    ),
  },
  {
    line1: "End-to-End",
    line2: "Process",
    to: "/process",
    icon: () => (
      <svg className="size-4.5 sm:size-5.5 lg:size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
    to: "/powercare",
    icon: () => (
      <svg className="size-4.5 sm:size-5.5 lg:size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "one-point-contact",
    line1: "One Point",
    line2: "of Contact",
    to: "/one-point-of-contact",
    icon: () => (
      <svg className="size-4.5 sm:size-5.5 lg:size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
    to: "/power-back-promise",
    icon: () => (
      <svg className="size-4.5 sm:size-5.5 lg:size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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

      {/* QUICK HIGHLIGHT FEATURES ROW (7 CARDS - COMPACT VIEWPORT FIT) */}
      <section className="bg-gradient-to-b from-orange-50/20 via-slate-50/80 to-white py-1 sm:py-1.5 border-b border-orange-200/90 shadow-2xs">
        <div className="container-site">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1 sm:gap-2">
            {FEATURE_HIGHLIGHTS.map((item, idx) => (
              <Link
                key={idx}
                to={item.to}
                preload="intent"
                data-tilt="true"
                className="parallax-card group flex flex-col items-center justify-center rounded-xl bg-white py-1.5 sm:py-2 px-1 sm:px-1.5 text-center shadow-[0_2px_8px_rgba(224,79,22,0.05)] hover:shadow-md transition-all duration-200 select-none cursor-pointer border border-orange-200/80 hover:border-[#E04F16]"
              >
                <div className="flex size-5.5 sm:size-6 lg:size-7 items-center justify-center text-[#D9531E] transition-transform duration-200 group-hover:scale-110">
                  <item.icon />
                </div>
                <div className="mt-0.5 sm:mt-1 text-[9.5px] sm:text-[10.5px] lg:text-[11px] font-bold text-[#082B4C] leading-tight group-hover:text-[#D9531E] transition-colors">
                  <div>{item.line1}</div>
                  <div>{item.line2}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. ABOUT US SECTION - Perfectly Aligned with Logo & Navbar (container-site) */}
      <section id="about" className="relative bg-gradient-to-b from-[#082B4C] via-[#093259] to-[#082B4C] py-8 sm:py-12 text-white scroll-mt-28 border-t border-b border-orange-500/40 overflow-hidden">
        {/* Subtle orange accent glow line on top & bottom */}
        <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#E04F16] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#E04F16] to-transparent pointer-events-none" />
        <div className="container-site relative z-10">
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

      {/* 3. ROOFTOP & COMMERCIAL SOLAR SOLUTIONS - 4 COMPACT PREMIUM CARDS */}
      <section id="solar-solutions" className="pt-6 sm:pt-8 pb-6 sm:pb-8 scroll-mt-24 sm:scroll-mt-28 border-b border-orange-200/90 bg-gradient-to-b from-white via-[#FFFDF9] to-orange-50/15">
        <div className="container-site">
          {/* Solutions Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 pb-3 sm:pb-4 border-b border-orange-200/80 mb-5 sm:mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 border border-orange-200/80 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#D9410E] mb-1.5">
              <Sparkles className="size-3 text-[#E04F16]" /> High-Performance Engineering
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#082B4C] tracking-tight">
              Solar <span className="text-[#E04F16]">Power Architectures</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl font-medium">
              Customised On-Grid, Off-Grid, Hybrid, and Commercial architectures engineered for homes, villas &amp; enterprises across AP &amp; Telangana.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button asChild variant="cta" className="rounded-full bg-[#E04F16] hover:bg-[#C03507] text-white font-bold text-xs sm:text-sm px-5 py-2 shadow-sm transition-all hover:shadow-md hover:scale-[1.02] active:scale-95">
              <Link to="/services">
                <span>View All 15 Services</span>
                <ArrowRight className="size-3.5 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* 4 Compact, Ultra-Premium Solar Solution Cards (Grid 4-Cols on Desktop, 2 on Tablet, 1 on Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5 xl:gap-5 items-stretch">
          {SOLAR_SYSTEMS_SHOWCASE.map((item) => (
            <div
              key={item.id}
              data-tilt="true"
              className="parallax-card group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-b from-[#FFFDF9] via-white to-[#FFF8F0] border border-orange-200/90 hover:border-[#E04F16] shadow-[0_4px_16px_rgba(224,79,22,0.06)] hover:shadow-[0_16px_36px_rgba(224,79,22,0.15)] transition-all duration-300"
            >
              {/* Top Accent Line */}
              <div className="h-1 w-full bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200 group-hover:from-[#D9410E] group-hover:via-[#E04F16] group-hover:to-[#F97316] transition-all" />

              {/* Photo Area with Parallax Gliding Motion */}
              <Link to={item.to} preload="intent" className="parallax-wrap block relative aspect-[16/10] w-full overflow-hidden bg-slate-900 shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  width={800}
                  height={500}
                  loading="lazy"
                  data-parallax="image"
                  data-parallax-rate="0.14"
                  data-parallax-max="28"
                  className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#082B4C]/80 via-transparent to-transparent opacity-35 group-hover:opacity-15 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-2.5 left-2.5">
                  <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider border shadow-xs bg-white/95 backdrop-blur-xs", item.badgeColor)}>
                    {item.badge}
                  </span>
                </div>

                {/* Bottom Pill */}
                <div className="absolute bottom-2.5 right-2.5">
                  <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-extrabold shadow-sm", item.pillColor)}>
                    {item.pill}
                  </span>
                </div>
              </Link>

              {/* Card Body */}
              <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-[#E04F16]">
                    {item.subtitle}
                  </div>
                  <h3 className="text-base sm:text-[17px] font-black text-[#082B4C] group-hover:text-[#E04F16] transition-colors leading-snug mt-0.5">
                    <Link to={item.to} preload="intent" className="hover:underline">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                    {item.desc}
                  </p>

                  {/* 3 Key Checkmarks */}
                  <ul className="mt-3 space-y-1.5 border-t border-orange-100/80 pt-2.5 text-[11px] font-semibold text-slate-700">
                    {item.perks.map((perk, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="size-3.5 shrink-0 text-[#E04F16]" />
                        <span className="truncate">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Button */}
                <div className="mt-4 pt-3 border-t border-orange-100">
                  <Link
                    to={item.to}
                    preload="intent"
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-orange-50/70 hover:bg-[#E04F16] border border-orange-200/90 hover:border-[#E04F16] text-[#082B4C] hover:text-white text-xs font-bold py-2 px-3 shadow-2xs hover:shadow transition-all select-none group/btn"
                  >
                    <span>{item.ctaText}</span>
                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* OUR 4-STEP PROCESS - Non-Identical, Photorealistic Engineering Stepper Layout */}
      <section id="how-it-works" className="bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-4 sm:pt-6 pb-6 sm:pb-8 scroll-mt-20 sm:scroll-mt-24 overflow-hidden border-b border-orange-200/90">
        <div className="container-site">
          {/* Section Header with Curved Orange Swoosh Underline */}
          <div className="text-left mb-5 sm:mb-6 scroll-pop scroll-pop-1">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#B83A16]/10 px-3 py-1 text-[10px] sm:text-[11px] font-black text-[#B83A16] uppercase tracking-wider mb-2">
              <Sparkles className="size-3" /> Seamless End-to-End Execution
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#082B4C] tracking-tight">
              Our <span className="text-[#B83A16]">4-Step Process</span>
            </h2>
            {/* Orange Swoosh Curve */}
            <div className="relative mt-1.5 h-2.5 w-32 sm:w-44 overflow-hidden">
              <svg viewBox="0 0 200 14" fill="none" className="w-full h-full text-[#B83A16]">
                <path d="M4 11C60 2 140 2 196 11" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              From your initial site survey to 25 years of clean power generation — clear, engineered, and transparent solar journey across Andhra Pradesh & Telangana.
            </p>
          </div>

          {/* Connected Progress Pipeline Track (Desktop & Tablet) */}
          <div className="mb-6 hidden md:grid grid-cols-4 gap-3 p-2 rounded-2xl bg-white/90 border border-orange-200/80 shadow-2xs backdrop-blur-xs">
            {FOUR_STEP_PROCESS.map((item) => (
              <div
                key={item.step}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all border",
                  item.theme.stepperActive
                )}
              >
                <span className={cn("grid size-6 place-items-center rounded-full text-xs font-black shrink-0", item.theme.stepperNum)}>
                  {item.step}
                </span>
                <div className="min-w-0">
                  <div className="text-[11.5px] font-black tracking-tight text-slate-900 truncate">{item.stepperLabel}</div>
                  <div className="text-[10px] text-slate-500 font-medium truncate">{item.duration}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 4 Non-Identical Process Cards Grid */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-3 xl:gap-4 items-stretch">
            {FOUR_STEP_PROCESS.map((item, index) => {
              const Icon = item.icon;
              const staggerClass = `scroll-pop-${index + 1}`;
              return (
                <div key={item.step} className="relative flex flex-col group/card">
                  {/* Distinct Process Card */}
                  <div
                    data-tilt="true"
                    className={cn(
                      "parallax-card relative flex-1 flex flex-col isolate overflow-hidden rounded-2xl sm:rounded-3xl bg-white border shadow-sm hover:shadow-xl transition-all duration-500 scroll-pop",
                      item.theme.cardBorder,
                      item.theme.cardShadow,
                      staggerClass
                    )}
                  >
                    {/* Header Strip with Step, Phase & Duration */}
                    <div className={cn("px-3.5 py-2.5 border-b flex items-center justify-between gap-2", item.theme.headerBg, item.theme.headerBorder)}>
                      <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9.5px] sm:text-[10px] font-black uppercase tracking-wider border", item.theme.badgeText)}>
                        {item.phaseBadge}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                        <Clock className="size-2.5 text-slate-400" />
                        {item.duration.split("•")[0]}
                      </span>
                    </div>

                    {/* Realistic Documentary Photograph with Parallax Gliding Motion */}
                    <div className="parallax-wrap relative aspect-[16/10] sm:aspect-[16/10.5] w-full overflow-hidden bg-slate-950">
                      <img
                        src={item.image}
                        alt={item.title}
                        width={800}
                        height={500}
                        loading="lazy"
                        data-parallax="image"
                        data-parallax-rate="0.12"
                        data-parallax-max="26"
                        className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover/card:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/10 opacity-60 group-hover/card:opacity-40 transition-opacity duration-300" />

                      {/* Floating Quality Tag on Photo */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-slate-900/85 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white shadow-md border border-white/20">
                        <span className="size-1.5 rounded-full bg-amber-400 animate-pulse" />
                        <span>{item.photoPill}</span>
                      </div>

                      {/* Floating Step Number Watermark with Parallax Offset */}
                      <div
                        data-parallax="float"
                        data-parallax-rate="-0.15"
                        data-parallax-max="20"
                        className="absolute bottom-2 right-2.5 text-2xl font-black text-white/30 select-none tracking-tighter"
                      >
                        {item.step}
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between bg-white text-xs">
                      <div>
                        {/* Title and Icon */}
                        <div className="flex items-start gap-2.5 mb-2">
                          <div className={cn("grid size-8 shrink-0 place-items-center rounded-xl shadow-xs transition-transform duration-300 group-hover/card:scale-108", item.theme.iconWrap)}>
                            <Icon className="size-4" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-sm font-extrabold text-[#082B4C] leading-snug group-hover/card:text-[#B83A16] transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
                              {item.theme.tagText}
                            </p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-slate-600 leading-relaxed text-[11px] sm:text-[11.5px] line-clamp-3 mb-3">
                          {item.desc}
                        </p>

                        {/* Tangible Engineering Deliverables Box */}
                        <div className={cn("p-2.5 rounded-xl border mb-3 space-y-1.5", item.theme.deliverableBg)}>
                          <div className="text-[10px] font-black uppercase tracking-wider text-slate-700 flex items-center justify-between">
                            <span>Key Deliverables</span>
                            <span className="text-[9px] font-bold text-slate-500">Verified</span>
                          </div>
                          <ul className="space-y-1 text-[10.5px] font-semibold text-slate-700">
                            {item.deliverables.map((d, i) => (
                              <li key={i} className="flex items-start gap-1.5 leading-tight">
                                <CheckCircle2 className={cn("size-3 shrink-0 mt-0.5", item.theme.checkIcon)} />
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Direct Contextual CTA */}
                      <Link
                        to={item.ctaLink}
                        preload="intent"
                        className={cn(
                          "w-full inline-flex items-center justify-center gap-1.5 rounded-xl py-2 px-3 text-xs font-bold border transition-all duration-200 select-none group/btn shadow-2xs hover:shadow",
                          item.theme.ctaBtn
                        )}
                      >
                        <span>{item.ctaText}</span>
                        <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Circular Step Connector on Desktop */}
                  {index < FOUR_STEP_PROCESS.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="hidden lg:grid absolute top-[28%] -right-2.5 xl:-right-3 z-20 size-6 xl:size-6.5 place-items-center rounded-full bg-white text-slate-600 shadow-md border border-slate-200 pointer-events-none transition-transform duration-300 group-hover/card:scale-110"
                    >
                      <ChevronRight className="size-3.5" strokeWidth={2.5} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Action CTA for 4-Step Process */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 scroll-pop">
            <Button asChild variant="cta" size="sm" className="rounded-full bg-gradient-to-r from-[#D9410E] via-[#E04F16] to-[#F97316] hover:from-[#C03507] hover:to-[#D9410E] text-white px-7 py-3 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95">
              <Link to="/book-a-demo" search={{ service: "Our 4-Step Solar Process", tab: "calendar" }}>
                <span>Start Your 4-Step Solar Journey</span>
                <ArrowRight className="size-4 ml-1.5" />
              </Link>
            </Button>
            <Link
              to="/process"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#082B4C] hover:text-[#E04F16] transition-colors px-4 py-2"
            >
              <span>Learn More About Our Process</span>
              <ArrowRight className="size-3.5 text-[#E04F16]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. POWERCARE SECTION - ULTRA-PREMIUM REDESIGN */}
      <section id="powercare" className="scroll-mt-24 sm:scroll-mt-28 py-12 sm:py-16 bg-gradient-to-b from-[#FFFDF9] via-white to-slate-50/70 border-b border-orange-200/90">
        <div className="container-site">
          
          {/* Section Header: Aligned with Site Style */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12 scroll-pop">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-100/80 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#E04F16] border border-orange-200/90 mb-3 shadow-2xs">
                <ShieldCheck className="size-3.5 text-[#E04F16]" />
                <span>5-Year Comprehensive Solar Care</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#082B4C] tracking-tight leading-[1.15]">
                PowerCare: <span className="text-[#E04F16]">More Than Maintenance,</span>
                <span className="block text-[#082B4C] sm:inline sm:ml-2">A Long-Term Commitment.</span>
              </h2>
              <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-medium">
                Every solar installation from Amaravati Solar Solutions includes 5 years of certified comprehensive health audits, infrared thermography, and preventive care at zero extra cost — ensuring uninterrupted peak generation across AP &amp; Telangana.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <Link
                to="/powercare"
                className="group inline-flex items-center gap-2 rounded-full bg-white hover:bg-orange-50/60 border border-orange-200/90 hover:border-[#E04F16] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-[#082B4C] hover:text-[#E04F16] shadow-xs hover:shadow-sm transition-all"
              >
                <span>View Full PowerCare Program</span>
                <ArrowRight className="size-4 text-[#E04F16] transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Main 2-Column Showcase: Left Image Feature Card + Right 3 Protocol Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* Left Column (5 Cols): Rooftop Engineer Inspection Visual Card with Parallax Depth */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="parallax-wrap relative h-[340px] sm:h-[400px] lg:h-full min-h-[340px] rounded-2xl sm:rounded-3xl overflow-hidden border border-orange-200/90 shadow-lg shadow-orange-500/5 group">
                <img
                  src={step2Inspection}
                  alt="Certified solar engineer performing PowerCare rooftop inspection"
                  data-parallax="image"
                  data-parallax-rate="0.14"
                  data-parallax-max="34"
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#082B4C] via-[#082B4C]/35 to-transparent pointer-events-none" />

                {/* Floating Top Glass Badge */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2 rounded-full bg-[#082B4C]/90 border border-white/20 px-3.5 py-1.5 text-xs font-black text-white backdrop-blur-md shadow-md">
                  <ShieldCheck className="size-4 text-amber-400" />
                  <span>Certified Solar Engineers • On-Site</span>
                </div>

                {/* Floating Bottom Card with Counter Parallax */}
                <div
                  data-parallax="float"
                  data-parallax-rate="-0.12"
                  data-parallax-max="20"
                  className="absolute bottom-3.5 left-3.5 right-3.5 p-4 rounded-xl sm:rounded-2xl bg-[#082B4C]/92 border border-white/20 text-white backdrop-blur-md shadow-xl"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-extrabold text-amber-300">Scheduled 5-Year Maintenance</span>
                    <span className="text-[10px] font-black uppercase bg-[#E04F16] text-white px-2 py-0.5 rounded-full shadow-2xs">
                      100% Free
                    </span>
                  </div>
                  <p className="mt-1.5 text-[11px] sm:text-xs text-white/85 leading-snug">
                    Periodic physical audits, string voltage benchmark testing, and dust cleaning verification across Andhra Pradesh.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/15 flex items-center justify-between text-[10px] sm:text-[11px] text-white/80 font-bold">
                    <span className="flex items-center gap-1"><CheckCircle2 className="size-3 text-amber-400" /> FLIR Thermal Scans</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="size-3 text-amber-400" /> 48-Hour SLA</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="size-3 text-amber-400" /> Free with System</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (7 Cols): 3 Modern Protocol Cards with 3D Tilt */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-3.5 sm:space-y-4">
              
              {/* Protocol 1: Structural Protocol */}
              <div
                data-tilt="true"
                className="parallax-card group rounded-2xl bg-gradient-to-br from-[#FFFDF9] via-white to-[#FFF8F0] p-4 sm:p-5 border border-orange-200/90 hover:border-[#E04F16] shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 sm:size-11 place-items-center rounded-xl bg-orange-100/80 text-[#E04F16] border border-orange-200 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                      <Wrench className="size-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-black text-[#082B4C]">Structural Protocol</h3>
                        <span className="rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[9px] sm:text-[10px] font-extrabold uppercase text-amber-700 tracking-wider">
                          CIVIL INTEGRITY
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                        Rooftop stability check &amp; cyclone-grade wind load resistance audits.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-orange-100/80 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-semibold text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#E04F16] shrink-0" />
                    <span>RCC Anchor Torque Check</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#E04F16] shrink-0" />
                    <span>Galvanization Rust Audit</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#E04F16] shrink-0" />
                    <span>Module Clamp Tightening</span>
                  </div>
                </div>
              </div>

              {/* Protocol 2: Electrical Protocol */}
              <div
                data-tilt="true"
                className="parallax-card group rounded-2xl bg-gradient-to-br from-[#FFFDF9] via-white to-[#F0F7FF] p-4 sm:p-5 border border-blue-200/80 hover:border-[#0756B9] shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 sm:size-11 place-items-center rounded-xl bg-blue-100/80 text-[#0756B9] border border-blue-200 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                      <PlugZap className="size-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-black text-[#082B4C]">Electrical Protocol</h3>
                        <span className="rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-[9px] sm:text-[10px] font-extrabold uppercase text-[#0756B9] tracking-wider">
                          FIRE &amp; YIELD SAFETY
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                        Infrared thermography, string generation analysis, and earthing pit resistance checks.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-blue-100/80 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-semibold text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#0756B9] shrink-0" />
                    <span>FLIR Infrared Thermal Scan</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#0756B9] shrink-0" />
                    <span>String Voc / Isc Testing</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#0756B9] shrink-0" />
                    <span>Earthing Resistance &lt; 2Ω</span>
                  </div>
                </div>
              </div>

              {/* Protocol 3: Mechanical & Yield Cleaning */}
              <div
                data-tilt="true"
                className="parallax-card group rounded-2xl bg-gradient-to-br from-[#FFFDF9] via-white to-[#F0FDF4] p-4 sm:p-5 border border-emerald-200/80 hover:border-emerald-600 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 sm:size-11 place-items-center rounded-xl bg-emerald-100/80 text-emerald-700 border border-emerald-200 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                      <HardHat className="size-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-black text-[#082B4C]">Mechanical &amp; Yield Cleaning</h3>
                        <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] sm:text-[10px] font-extrabold uppercase text-emerald-700 tracking-wider">
                          YIELD OPTIMIZATION
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                        Low-TDS demineralized washing, conduit inspection, and inverter heat sink maintenance.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-emerald-100/80 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-semibold text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                    <span>Demineralized Water Wash</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                    <span>UV Conduit Pipe Inspection</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                    <span>Inverter Fan Dust Blow-Out</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* 5 Value Pillars: Clean, Spacious Light Cards Strip */}
          <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            
            <div className="rounded-xl sm:rounded-2xl bg-white p-3.5 sm:p-4 border border-orange-200/80 shadow-2xs hover:shadow-md hover:border-[#E04F16] transition-all">
              <div className="flex items-center gap-2 text-[#E04F16]">
                <BadgeCheck className="size-4 shrink-0" />
                <span className="text-xs sm:text-sm font-black text-[#082B4C]">Preventive Care</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-600 font-medium leading-relaxed">
                Scheduled on-site health audits every 6 months.
              </p>
            </div>

            <div className="rounded-xl sm:rounded-2xl bg-white p-3.5 sm:p-4 border border-orange-200/80 shadow-2xs hover:shadow-md hover:border-[#E04F16] transition-all">
              <div className="flex items-center gap-2 text-[#E04F16]">
                <Phone className="size-4 shrink-0" />
                <span className="text-xs sm:text-sm font-black text-[#082B4C]">Dedicated Support</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-600 font-medium leading-relaxed">
                Direct phone &amp; WhatsApp helpline with Vijayawada team.
              </p>
            </div>

            <div className="rounded-xl sm:rounded-2xl bg-white p-3.5 sm:p-4 border border-orange-200/80 shadow-2xs hover:shadow-md hover:border-[#E04F16] transition-all">
              <div className="flex items-center gap-2 text-[#E04F16]">
                <Zap className="size-4 shrink-0" />
                <span className="text-xs sm:text-sm font-black text-[#082B4C]">Peak Yield</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-600 font-medium leading-relaxed">
                Optimized daily generation so you save maximum on bills.
              </p>
            </div>

            <div className="rounded-xl sm:rounded-2xl bg-white p-3.5 sm:p-4 border border-orange-200/80 shadow-2xs hover:shadow-md hover:border-[#E04F16] transition-all">
              <div className="flex items-center gap-2 text-[#E04F16]">
                <Clock className="size-4 shrink-0" />
                <span className="text-xs sm:text-sm font-black text-[#082B4C]">48-Hour SLA</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-600 font-medium leading-relaxed">
                Prompt dispatch of senior solar technicians across AP.
              </p>
            </div>

            <div className="col-span-2 sm:col-span-1 rounded-xl sm:rounded-2xl bg-white p-3.5 sm:p-4 border border-orange-200/80 shadow-2xs hover:shadow-md hover:border-[#E04F16] transition-all">
              <div className="flex items-center gap-2 text-[#E04F16]">
                <FileCheck2 className="size-4 shrink-0" />
                <span className="text-xs sm:text-sm font-black text-[#082B4C]">Warranty Shield</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-600 font-medium leading-relaxed">
                Service logbooks keep 25-yr panel warranties valid.
              </p>
            </div>

          </div>

          {/* Action CTA Banner */}
          <div className="mt-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#082B4C] via-[#093259] to-[#082B4C] p-5 sm:p-6 text-white shadow-xl border border-[#0d3b66] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-sm sm:text-base font-black tracking-tight text-white">Complete Solar Care. Reliable Power. Greener Tomorrow.</span>
                <span className="hidden sm:inline-block rounded-full bg-amber-400 text-[#082B4C] text-[10px] font-black uppercase px-2 py-0.5">Included Free</span>
              </div>
              <p className="mt-1 text-xs sm:text-[13px] text-white/85">
                Every On-Grid, Off-Grid &amp; Hybrid system from Amaravati Solar Solutions includes full 5-year PowerCare coverage.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
              <Link
                to="/book-a-demo"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D9410E] via-[#E04F16] to-[#F97316] hover:from-[#C03507] hover:to-[#D9410E] px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <span>Schedule Free Inspection</span>
                <ArrowRight className="size-3.5" />
              </Link>
              <a
                href="tel:+917989641899"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 px-4 py-2.5 text-xs sm:text-sm font-bold text-white transition-all active:scale-95"
              >
                <Phone className="size-3.5 text-amber-300" />
                <span>+91 79896 41899</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 5B. ONE POINT OF CONTACT - Your Complete Solar Journey. One Trusted Partner */}
      <section id="one-point-contact" className="scroll-mt-24 sm:scroll-mt-28 py-10 sm:py-14 bg-gradient-to-b from-white via-orange-50/15 to-white border-b border-orange-200/90">
        <div className="container-site">
          {/* Section Header: Aligned with Site Style */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 scroll-pop">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-100/80 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#E04F16] border border-orange-200/90 mb-3 shadow-2xs">
                <Users className="size-3.5 text-[#E04F16]" />
                <span>ONE TRUSTED PARTNER • COMPLETE SOLAR JOURNEY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-[#082B4C] tracking-tight leading-[1.15]">
                One Point of Contact: <span className="text-[#E04F16]">Your 7-Step Solar Journey</span>
              </h2>
              <p className="mt-2.5 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-medium">
                From the first conversation to 25 years of clean energy generation, your dedicated Amaravati Solar engineer oversees all 7 milestones with zero middlemen, zero finger-pointing, and complete peace of mind.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <Link
                to="/one-point-of-contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white hover:bg-orange-50/60 border border-orange-200/90 hover:border-[#E04F16] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-[#082B4C] hover:text-[#E04F16] shadow-xs hover:shadow-sm transition-all"
              >
                <span>View Complete 7-Step Workflow</span>
                <ArrowRight className="size-4 text-[#E04F16] transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* 7-Step Visual Workflow Grid (7 Steps + 1 Dedicated Manager Feature Card = 8 Balanced Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              {
                step: "01",
                title: "Consultation & Energy Audit",
                badge: "ENERGY AUDIT",
                image: step1Consultation,
                icon: Headphones,
                desc: "Personalized solar assessment analyzing monthly power bills & sizing optimal kW capacity.",
                highlight: "Free Technical Assessment",
              },
              {
                step: "02",
                title: "Site Check & Shadow Analysis",
                badge: "DRONE SURVEY",
                image: step2Inspection,
                icon: ClipboardCheck,
                desc: "Physical civil structure survey, azimuth angle, and high-precision drone shadow simulation.",
                highlight: "3D Shadow Modeling",
              },
              {
                step: "03",
                title: "Custom CAD System Design",
                badge: "CAD BLUEPRINT",
                image: step3Design,
                icon: SlidersHorizontal,
                desc: "Tailored 3D CAD rooftop layouts, electrical SLD, and cyclone-rated structure blueprints.",
                highlight: "Tier-1 Component Sizing",
              },
              {
                step: "04",
                title: "Subsidy & Loan Guidance",
                badge: "GOVT SUBSIDY",
                image: stepSubsidyLoan,
                icon: FileText,
                desc: "National portal filing for ₹78,000 PM Surya Ghar DBT subsidy and paperless low-interest loans.",
                highlight: "Direct ₹78,000 DBT Filing",
              },
              {
                step: "05",
                title: "Certified Turnkey Installation",
                badge: "TURNKEY EPC",
                image: step4Installation,
                icon: Wrench,
                desc: "Leak-free RCC mounting, hot-dip galvanized fastening, UV DC cabling, and chemical earthing.",
                highlight: "Hot-Dip Galvanized Mounts",
              },
              {
                step: "06",
                title: "Net-Meter Sync & Commissioning",
                badge: "DISCOM SYNC",
                image: projectResidentialInverter10kw,
                icon: PlugZap,
                desc: "APCPDCL / TGSPDCL liaisoning for bi-directional net-meter, CEIG inspection, and live sync.",
                highlight: "Bi-Directional Net-Meter",
              },
              {
                step: "07",
                title: "PowerCare & 25-Yr Support",
                badge: "LIFETIME CARE",
                image: projectHybridStorageVilla,
                icon: ShieldCheck,
                desc: "5-year scheduled on-site maintenance, FLIR thermal scans, and direct WhatsApp hotline.",
                highlight: "5 Years Free Maintenance",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  data-tilt="true"
                  className="parallax-card group relative rounded-2xl sm:rounded-3xl border border-orange-200/90 bg-white hover:border-[#E04F16] shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Visual 16:9 Image with Parallax Gliding Motion */}
                    <div className="parallax-wrap relative h-40 sm:h-44 w-full overflow-hidden bg-slate-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        data-parallax="image"
                        data-parallax-rate="0.12"
                        data-parallax-max="22"
                        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-108"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

                      {/* Step Pill */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-0.5 shadow-md border border-orange-200/60 backdrop-blur-sm">
                        <span className="size-1.5 rounded-full bg-[#E04F16]" />
                        <span className="text-[10px] font-black text-[#E04F16] tracking-wider">
                          STEP {item.step}
                        </span>
                      </div>

                      {/* Category Tag */}
                      <div className="absolute top-2.5 right-2.5 rounded-full bg-[#082B4C]/90 text-white border border-white/20 px-2 py-0.5 text-[8.5px] font-black uppercase tracking-wider backdrop-blur-sm shadow-xs">
                        {item.badge}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="grid size-7 place-items-center rounded-lg bg-orange-50 text-[#E04F16] border border-orange-200/60 shrink-0 group-hover:scale-110 transition-transform">
                          <Icon className="size-3.5" />
                        </div>
                        <h3 className="text-sm font-black text-[#082B4C] leading-snug line-clamp-1">
                          {item.title}
                        </h3>
                      </div>

                      <p className="mt-1 text-[11px] text-slate-600 leading-relaxed font-medium line-clamp-2">
                        {item.desc}
                      </p>

                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-[10.5px] font-bold text-[#E04F16]">
                        <CheckCircle2 className="size-3 text-[#E04F16] shrink-0" />
                        <span className="truncate">{item.highlight}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Link */}
                  <div className="px-4 pb-3.5 pt-0">
                    <Link
                      to="/one-point-of-contact"
                      className="inline-flex items-center gap-1 text-[10.5px] font-black text-[#082B4C] group-hover:text-[#E04F16] transition-colors"
                    >
                      <span>Explore Milestone</span>
                      <ArrowRight className="size-3 text-[#E04F16] transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              );
            })}

            {/* 8th Card: Dedicated Project Lead Spotlight with 3D Tilt */}
            <div
              data-tilt="true"
              className="parallax-card rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#082B4C] via-[#093259] to-[#E04F16] p-5 sm:p-6 text-white shadow-xl flex flex-col justify-between border border-[#0d3b66] relative overflow-hidden group"
            >
              {/* Radial glow */}
              <div className="absolute top-0 right-0 -mr-10 -mt-10 size-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />

              <div>
                <span className="inline-block rounded-full bg-amber-400 text-[#082B4C] text-[9.5px] font-black uppercase px-2.5 py-0.5 tracking-wider shadow-sm">
                  100% Turnkey Ownership
                </span>
                <h3 className="mt-3 text-lg font-black text-white tracking-tight leading-snug">
                  One Dedicated Project Manager
                </h3>
                <p className="mt-2 text-xs text-white/85 leading-relaxed font-medium">
                  You never have to run between electricians, panel suppliers, DISCOM offices, or banks. 1 Senior Solar Engineer oversees all 7 milestones with zero finger-pointing.
                </p>

                <div className="mt-4 space-y-1.5 pt-3 border-t border-white/15 text-[11px] font-bold text-white/90">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-amber-300 shrink-0" />
                    <span>Single Window Accountability</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-amber-300 shrink-0" />
                    <span>Direct WhatsApp &amp; Phone Line</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-amber-300 shrink-0" />
                    <span>25-Year Long-Term Guarantee</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3">
                <Link
                  to="/one-point-of-contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white text-[#082B4C] hover:bg-slate-100 font-bold text-xs py-2.5 px-4 shadow-md transition-all active:scale-95"
                >
                  <span>View All 7 Steps Details</span>
                  <ArrowRight className="size-3.5 text-[#E04F16]" />
                </Link>
              </div>
            </div>
          </div>

          {/* Tagline & Call-to-action Strip */}
          <div className="mt-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#082B4C] via-[#093259] to-[#082B4C] p-5 sm:p-6 text-white shadow-xl border border-[#0d3b66] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm sm:text-base font-extrabold">
                One partner. Complete solar solutions. A greener tomorrow.
              </p>
              <p className="text-xs text-white/80 mt-0.5">
                Single dedicated project manager assigned for your rooftop project from start to finish.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
              <Link
                to="/book-a-demo"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D9410E] via-[#E04F16] to-[#F97316] hover:from-[#C03507] hover:to-[#D9410E] px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="size-3.5" />
              </Link>
              <a
                href="tel:+917989641899"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 px-4 py-2.5 text-xs sm:text-sm font-bold text-white transition-all active:scale-95"
              >
                <Phone className="size-3.5 text-amber-300" />
                <span>Call +91 79896 41899</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5C. POWER BACK PROMISE - Solar Performance. Financial Assurance. */}
      <section id="power-back-promise" className="scroll-mt-24 sm:scroll-mt-28 py-8 sm:py-12 bg-gradient-to-b from-white via-emerald-50/20 to-white border-b border-orange-200/90">
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

          {/* 3 Pillars of Power Back Promise with 3D Tilt */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div data-tilt="true" className="parallax-card rounded-2xl border border-orange-200/80 bg-white p-5 sm:p-6 shadow-2xs hover:border-[#E04F16] hover:shadow-md transition-all">
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

            <div data-tilt="true" className="parallax-card rounded-2xl border border-orange-200/80 bg-white p-5 sm:p-6 shadow-2xs hover:border-[#E04F16] hover:shadow-md transition-all">
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

            <div data-tilt="true" className="parallax-card rounded-2xl border border-orange-200/80 bg-white p-5 sm:p-6 shadow-2xs hover:border-[#E04F16] hover:shadow-md transition-all">
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
      <section id="projects" className="pt-6 sm:pt-8 pb-8 sm:pb-10 scroll-mt-24 sm:scroll-mt-28 border-b border-orange-200/90 bg-gradient-to-b from-white via-orange-50/10 to-slate-50/40">
        <div className="container-site">
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
                    ? "border-[#E04F16] bg-[#082B4C] text-white shadow-sm scale-[1.02]"
                    : "bg-white text-[#082B4C] border-orange-200/80 hover:border-[#E04F16] hover:text-[#E04F16] active:bg-orange-50/50"
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
                  data-tilt="true"
                  className={cn(
                    "group relative overflow-hidden rounded-none bg-gradient-to-br from-[#FFFDF9] via-white to-[#FFF5EA] text-left p-4 sm:p-5 shadow-[0_4px_16px_rgba(224,79,22,0.06)] border border-orange-200/70 hover:border-[#E04F16] hover:shadow-[0_16px_36px_rgba(224,79,22,0.15)] transition-all duration-300 flex flex-row items-center justify-between gap-3 sm:gap-4 parallax-card animate-pop-in",
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

                  {/* Right: Square Image Viewport with Parallax */}
                  <div className="parallax-wrap w-28 sm:w-32 md:w-36 aspect-square rounded-none overflow-hidden shrink-0 shadow-2xs border border-orange-100/80 relative bg-slate-100">
                    <img
                      src={p.image}
                      alt={p.title}
                      width={1920}
                      height={1088}
                      loading="lazy"
                      data-parallax="image"
                      data-parallax-rate="0.1"
                      data-parallax-max="20"
                      className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                    />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* View All Projects Button */}
          <div className="mt-5 sm:mt-6 flex justify-center">
            <Button asChild variant="cta" size="default">
              <Link to="/projects">
                View All Projects <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </>
  );
}
