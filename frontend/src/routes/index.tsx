// Amaravati Solar Solutions - Home Route
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Battery,
  Calculator,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Coins,
  Eye,
  FileCheck2,
  FileText,
  HandCoins,
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
  TrendingUp,
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
import powercarePanelCleaning from "@/assets/powercare-panel-cleaning.jpg";
import powerSureAssuranceShield from "@/assets/power-sure-assurance-shield.jpg";
import solarPanelsArray from "@/assets/solar-panels-array.jpg";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/site/HeroSection";
import { SectionHeading } from "@/components/site/Sections";
import { SolarCalculator } from "@/components/site/SolarCalculator";
import { setupRooftopScrollAnimation } from "@/lib/scroll-animation";
import { setupParallaxAndPopAnimation } from "@/lib/parallax-animation";
import { PROJECTS, type ProjectCategory } from "@/lib/site-data";
import { scrollToTarget } from "@/lib/scroll-utils";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amaravati Solar Solutions — Rooftop Solar for Homes & Business | Andhra Pradesh" },
      {
        name: "description",
        content:
          "Amaravati Solar Solutions is the #1 trusted rooftop solar installer in Amaravati, Vijayawada, Guntur & AP. On-grid, off-grid & hybrid solar systems with ₹78,000 PM Surya Ghar subsidy support, 5-year PowerCare, and free site survey. Call +91 63058 25402.",
      },
      {
        name: "keywords",
        content:
          "Amaravati Solar Solutions, solar solutions amaravati, solar panels vijayawada, rooftop solar guntur, best solar company andhra pradesh, pm surya ghar subsidy ap, residential rooftop solar, commercial solar systems, solar inverter price, solar net metering andhra pradesh",
      },
      { property: "og:title", content: "Amaravati Solar Solutions — #1 Rooftop Solar Company in Andhra Pradesh" },
      {
        property: "og:description",
        content:
          "Smart, reliable and sustainable solar energy solutions for homes, businesses and industries across Amaravati, Vijayawada, and Guntur.",
      },
      { property: "og:url", content: "https://amaravatisolarsolutions.com/" },
      { property: "og:image", content: "https://amaravatisolarsolutions.com/assets/hero-amaravati-exact-panoramic.jpg" },
      { name: "twitter:title", content: "Amaravati Solar Solutions — Rooftop Solar for Homes & Business" },
      {
        name: "twitter:description",
        content:
          "Leading solar rooftop company in Andhra Pradesh. High-efficiency solar panels, PM Surya Ghar subsidy, and 25-year warranty.",
      },
      { name: "twitter:image", content: "https://amaravatisolarsolutions.com/assets/hero-amaravati-exact-panoramic.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://amaravatisolarsolutions.com/" },
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

const SEVEN_STEP_PROCESS = [
  {
    step: "01",
    phaseBadge: "PHASE 01 • CONSULTATION",
    stepperLabel: "Consultation",
    duration: "Day 1 • 1 Business Day",
    title: "Consultation & Energy Audit",
    icon: Headphones,
    image: step1Consultation,
    desc: "Personalized solar energy assessment analyzing your past 12-month power bills, daytime appliances & roof space to recommend the optimal solar capacity.",
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
      tagText: "Zero Obligation Advisory",
    },
  },
  {
    step: "02",
    phaseBadge: "PHASE 02 • SITE SURVEY",
    stepperLabel: "3D Roof Survey",
    duration: "Days 2–3 • On-Site",
    title: "Site Check & 3D Modeling",
    icon: ClipboardCheck,
    image: step2Inspection,
    desc: "Certified engineers visit your rooftop across AP & Telangana to map azimuth tilt, civil load-bearing capacity & 365-day drone shadow paths.",
    photoPill: "3D LiDAR & Drone Scan",
    deliverables: [
      "365-Day Seasonal Solar Shadow Heatmap",
      "RCC Slab / Shed Structural Load Audit",
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
    stepperLabel: "CAD Blueprint",
    duration: "Days 4–5 • Digital Sync",
    title: "Custom 3D CAD Design & SLD",
    icon: SlidersHorizontal,
    image: step3Design,
    desc: "Precision engineering team prepares customized 3D AutoCAD string layouts, electrical Single-Line Diagrams (SLD) & cyclone-certified mounting designs.",
    photoPill: "AutoCAD & SLD Simulation",
    deliverables: [
      "Custom 3D CAD Rooftop String Blueprint",
      "170 km/h Wind-Rated HDG Mounting Design",
      "Tier-1 ALMM & BIS Component Sizing",
    ],
    ctaText: "Review Engineering Specs",
    ctaLink: "/process",
    theme: {
      cardBorder: "border-purple-200/90 hover:border-purple-500",
      cardShadow: "hover:shadow-[0_22px_45px_rgba(168,85,247,0.18)]",
      headerBg: "bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent",
      headerBorder: "border-purple-100",
      badgeText: "text-purple-800 bg-purple-100/80 border-purple-300/80",
      iconWrap: "bg-purple-600 text-white shadow-purple-600/30",
      deliverableBg: "bg-purple-50/50 border-purple-100/80 text-purple-950",
      checkIcon: "text-purple-600",
      ctaBtn: "text-purple-700 bg-purple-50 hover:bg-purple-600 hover:text-white border-purple-200 hover:border-purple-600",
      stepperActive: "bg-purple-50 text-purple-800 border-purple-300",
      stepperNum: "bg-purple-600 text-white",
      tagText: "Tier-1 Module Spec",
    },
  },
  {
    step: "04",
    phaseBadge: "PHASE 04 • GOVT APPROVAL",
    stepperLabel: "Subsidy & Loans",
    duration: "Days 5–7 • Direct DBT",
    title: "Subsidy Filing & Loan Guidance",
    icon: FileText,
    image: stepSubsidyLoan,
    desc: "Dedicated subsidy team handles complete national portal documentation for ₹78,000 PM Surya Ghar DBT subsidy & paperless low-interest bank loans.",
    photoPill: "Direct ₹78,000 DBT Portal",
    deliverables: [
      "PM Surya Ghar National Portal Token",
      "Paperless Low-Interest Loan Assistance",
      "DISCOM Technical Feasibility Sanction",
    ],
    ctaText: "Check Subsidy Sizing",
    ctaLink: "/solar-calculator",
    theme: {
      cardBorder: "border-emerald-200/90 hover:border-emerald-500",
      cardShadow: "hover:shadow-[0_22px_45px_rgba(16,185,129,0.18)]",
      headerBg: "bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent",
      headerBorder: "border-emerald-100",
      badgeText: "text-emerald-800 bg-emerald-100/80 border-emerald-300/80",
      iconWrap: "bg-emerald-600 text-white shadow-emerald-600/30",
      deliverableBg: "bg-emerald-50/50 border-emerald-100/80 text-emerald-950",
      checkIcon: "text-emerald-600",
      ctaBtn: "text-emerald-700 bg-emerald-50 hover:bg-emerald-600 hover:text-white border-emerald-200 hover:border-emerald-600",
      stepperActive: "bg-emerald-50 text-emerald-800 border-emerald-300",
      stepperNum: "bg-emerald-600 text-white",
      tagText: "Direct Bank Transfer",
    },
  },
  {
    step: "05",
    phaseBadge: "PHASE 05 • TURNKEY EPC",
    stepperLabel: "EPC Installation",
    duration: "Days 8–10 • On-Site",
    title: "Certified Turnkey Installation",
    icon: Wrench,
    image: step4Installation,
    desc: "Certified technicians install Tier-1 modules with leak-free anchor fastening, hot-dip galvanized mounting structures, and dual chemical earthing (< 2.0Ω).",
    photoPill: "Hot-Dip Galvanized Mounts",
    deliverables: [
      "Leak-Free RCC Fastening & 80µ HDG Mounts",
      "Dual Chemical Earthing (< 2Ω) + Lightning SPD",
      "UV-Resistant DC/AC Cabling in Conduit",
    ],
    ctaText: "View Installation Specs",
    ctaLink: "/process",
    theme: {
      cardBorder: "border-orange-200/90 hover:border-[#E04F16]",
      cardShadow: "hover:shadow-[0_22px_45px_rgba(224,79,22,0.18)]",
      headerBg: "bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-transparent",
      headerBorder: "border-orange-100",
      badgeText: "text-orange-900 bg-orange-100/80 border-orange-300/80",
      iconWrap: "bg-[#E04F16] text-white shadow-orange-500/30",
      deliverableBg: "bg-orange-50/50 border-orange-100/80 text-orange-950",
      checkIcon: "text-[#E04F16]",
      ctaBtn: "text-[#E04F16] bg-orange-50 hover:bg-[#E04F16] hover:text-white border-orange-200 hover:border-[#E04F16]",
      stepperActive: "bg-orange-50 text-orange-900 border-orange-300",
      stepperNum: "bg-[#E04F16] text-white",
      tagText: "170 km/h Wind-Rated",
    },
  },
  {
    step: "06",
    phaseBadge: "PHASE 06 • GRID SYNC",
    stepperLabel: "Net-Meter Sync",
    duration: "Days 11–14 • Commissioned",
    title: "DISCOM Net-Meter Synchronization",
    icon: PlugZap,
    image: projectResidentialInverter10kw,
    desc: "APCPDCL / APEPDCL / TGSPDCL liaisoning for bi-directional net-meter installation, CEIG safety testing, grid synchronization, and IoT app setup.",
    photoPill: "Net-Meter Synchronized",
    deliverables: [
      "Bi-Directional Net-Meter Testing & Seal",
      "CEIG Safety Sanction & Synchronization",
      "IoT Mobile Telemetry App Activation",
    ],
    ctaText: "Learn Grid Sync",
    ctaLink: "/services/on-grid-solar-systems",
    theme: {
      cardBorder: "border-blue-200/90 hover:border-blue-500",
      cardShadow: "hover:shadow-[0_22px_45px_rgba(59,130,246,0.18)]",
      headerBg: "bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent",
      headerBorder: "border-blue-100",
      badgeText: "text-blue-800 bg-blue-100/80 border-blue-300/80",
      iconWrap: "bg-blue-600 text-white shadow-blue-600/30",
      deliverableBg: "bg-blue-50/50 border-blue-100/80 text-blue-950",
      checkIcon: "text-blue-600",
      ctaBtn: "text-blue-700 bg-blue-50 hover:bg-blue-600 hover:text-white border-blue-200 hover:border-blue-600",
      stepperActive: "bg-blue-50 text-blue-800 border-blue-300",
      stepperNum: "bg-blue-600 text-white",
      tagText: "AP/TS DISCOM Clearance",
    },
  },
  {
    step: "07",
    phaseBadge: "PHASE 07 • LIFETIME CARE",
    stepperLabel: "PowerCare SLA",
    duration: "25 Years • Lifetime Care",
    title: "PowerCare & 25-Yr Support",
    icon: ShieldCheck,
    image: projectHybridStorageVilla,
    desc: "Scheduled bi-annual physical audits, FLIR thermal scans, demineralized module washing, 48-hour resolution SLA, and dedicated engineering support.",
    photoPill: "5-Yr Included Care Pack",
    deliverables: [
      "5-Year Free Scheduled Preventive Audits",
      "FLIR Thermal Hotspot Scans & Module Wash",
      "25-Yr Performance Guarantee + 48h SLA",
    ],
    ctaText: "Explore PowerCare SLA",
    ctaLink: "/powercare",
    theme: {
      cardBorder: "border-teal-200/90 hover:border-teal-500",
      cardShadow: "hover:shadow-[0_22px_45px_rgba(20,184,166,0.2)]",
      headerBg: "bg-gradient-to-r from-teal-500/10 via-teal-500/5 to-transparent",
      headerBorder: "border-teal-100",
      badgeText: "text-teal-900 bg-teal-100/90 border-teal-300",
      iconWrap: "bg-teal-600 text-white shadow-teal-600/30",
      deliverableBg: "bg-teal-50/60 border-teal-100/90 text-teal-950",
      checkIcon: "text-teal-600",
      ctaBtn: "text-teal-800 bg-teal-50 hover:bg-teal-600 hover:text-white border-teal-300 hover:border-teal-600",
      stepperActive: "bg-teal-50 text-teal-800 border-teal-300",
      stepperNum: "bg-teal-600 text-white",
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
    id: "power-back-promise",
    line1: "Power",
    line2: "Sure",
    to: "/power-back-promise",
    icon: () => (
      <svg className="size-4.5 sm:size-5.5 lg:size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3a4.5 4.5 0 0 0 4.5-4.5V8" />
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
];

const FILTERS: ("All" | ProjectCategory)[] = ["All", "Residential", "Commercial", "Industrial"];

function Index() {
  const navigate = useNavigate();
  const [galleryFilter, setGalleryFilter] = useState<"All" | ProjectCategory>("All");

  const handleApplyPlan = (summary: {
    bill: number;
    location: string;
    load: string;
    propertyType: string;
    systemKw: number;
    monthlySavings: number;
    subsidy: number;
  }) => {
    navigate({
      to: "/book-a-demo",
      search: {
        service: `Solar Rooftop System (${summary.systemKw} kW)`,
        type: summary.propertyType.includes("Residential") ? "Residential" : "Commercial",
        tab: "calendar",
      } as any,
    });
  };

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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1 sm:gap-1.5 lg:gap-2">
            {FEATURE_HIGHLIGHTS.map((item, idx) => (
              <Link
                key={idx}
                to={item.to}
                preload="intent"
                data-tilt="true"
                className="parallax-card group flex flex-col items-center justify-center rounded-xl bg-white py-1 sm:py-1.5 px-1 sm:px-1.5 text-center shadow-[0_2px_6px_rgba(224,79,22,0.06)] hover:shadow-md transition-all duration-200 select-none cursor-pointer border border-orange-200/80 hover:border-[#E04F16] min-h-[46px] sm:min-h-[50px]"
              >
                <div className="flex size-4.5 sm:size-5 lg:size-5 items-center justify-center text-[#D9531E] transition-transform duration-200 group-hover:scale-110">
                  <item.icon />
                </div>
                <div className="mt-0.5 text-[10px] sm:text-[10.5px] lg:text-[11px] xl:text-[11.5px] font-bold text-[#082B4C] leading-tight group-hover:text-[#D9531E] transition-colors">
                  <div>{item.line1}</div>
                  <div>{item.line2}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE US (EXTRAORDINARY CINEMATIC SOLAR BACKDROP & SLANTED VALUE CARDS) */}
      <section id="why-choose-us" className="relative bg-[#061e35] py-10 sm:py-14 text-white scroll-mt-28 border-t border-b border-orange-500/50 overflow-hidden">
        <div id="about" className="absolute -top-28" />

        {/* Ambient Photographic Solar Background with Multi-Layer Cinematic Shading */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Subtle real solar panel array photo texture */}
          <img
            src={solarPanelsArray}
            alt=""
            aria-hidden="true"
            data-parallax="bg"
            data-parallax-rate="0.18"
            className="w-full h-full object-cover object-center scale-110 opacity-20 mix-blend-luminosity filter contrast-125 brightness-90"
          />

          {/* Deep Navy & Charcoal Vignette Overlays for Maximum Contrast & Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#061e35]/95 via-[#082B4C]/82 to-[#061e35]/96" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061e35]/90 via-transparent to-[#061e35]/90" />

          {/* Radiant Solar Flare & Amber Glow radiating behind the cards */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[950px] h-[350px] sm:h-[480px] bg-[radial-gradient(ellipse_at_center,rgba(224,79,22,0.22),rgba(245,158,11,0.12),transparent_70%)] blur-2xl pointer-events-none" />

          {/* Subtle Tech Micro-Grid Ambient Texture */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        {/* Glowing Orange Neon Horizon Accent Lines on Top & Bottom */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#E04F16] to-transparent shadow-[0_0_14px_#E04F16] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#E04F16] to-transparent shadow-[0_0_14px_#E04F16] pointer-events-none" />
        
        <div className="container-site relative z-10">
          {/* Main Statement & Headline - Left-Aligned & Single Clean Line */}
          <div className="scroll-pop scroll-pop-1 text-left mb-6 sm:mb-8 pb-3 border-b border-white/10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-0.5 text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-1.5 border border-white/15 shadow-2xs">
              <Sparkles className="size-3 text-amber-300" /> Amaravati Solar Solutions
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Why Choose Us
            </h2>
            <p className="mt-1 text-xs sm:text-sm md:text-base text-white/90 font-medium">
              We don't just install solar. We create a smarter way to power life.
            </p>
          </div>

          {/* 5 Distinctive Value Cards in Compact Slanted Parallelogram Shape (Exact Flyer Match) */}
          {/* Row 1: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 pt-3">
            
            {/* Card 1: 10+ Years of Experience */}
            <div className="group relative pt-7 sm:pt-8 scroll-pop scroll-pop-2 transition-transform duration-300 ease-out hover:-translate-y-2">
              {/* Luxury 3D Medal Floating Icon Badge */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 size-12 sm:size-13 rounded-full bg-gradient-to-b from-white via-white to-orange-50/80 border-2 border-[#E04F16] ring-4 ring-orange-500/25 ring-offset-2 ring-offset-[#082B4C] shadow-[0_8px_20px_rgba(224,79,22,0.38)] flex items-center justify-center text-[#E04F16] group-hover:scale-108 group-hover:-translate-y-1 group-hover:ring-orange-400/40 group-hover:shadow-[0_12px_28px_rgba(224,79,22,0.55)] transition-all duration-300">
                <Award className="size-6 sm:size-6.5 text-[#E04F16] drop-shadow-xs" />
              </div>

              {/* Slanted / Skewed Card Body */}
              <div className="-skew-x-[8deg] sm:-skew-x-[9deg] rounded-2xl sm:rounded-3xl border-2 border-[#E04F16] bg-white shadow-[0_14px_34px_rgba(4,21,38,0.5),0_4px_14px_rgba(224,79,22,0.22)] group-hover:shadow-[0_22px_50px_rgba(224,79,22,0.4)] group-hover:border-orange-400 transition-all duration-300 overflow-hidden">
                {/* Navy Blue Header Bar with Glossy Glass Reflection */}
                <div className="relative bg-gradient-to-b from-[#0b365e] via-[#082B4C] to-[#051c33] pt-9 sm:pt-10 pb-3 px-3 text-center border-b border-orange-500/30">
                  {/* Subtle metallic top shine line */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                  <div className="skew-x-[8deg] sm:skew-x-[9deg]">
                    <h3 className="font-black text-sm sm:text-base text-white tracking-wide drop-shadow-xs">
                      10+ Years of Experience
                    </h3>
                  </div>
                </div>

                {/* White Bottom Body with High-Definition Styling */}
                <div className="bg-gradient-to-b from-white via-[#FCFDFE] to-[#F8FAFC] py-3.5 sm:py-4 px-4 text-center min-h-[58px] sm:min-h-[62px] flex items-center justify-center border-t border-slate-100">
                  <div className="skew-x-[8deg] sm:skew-x-[9deg]">
                    <p className="font-extrabold text-xs sm:text-[13px] text-[#082B4C] leading-snug tracking-tight">
                      Proven EPC engineering &amp; reliable installation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: End-to-End Support */}
            <div className="group relative pt-7 sm:pt-8 scroll-pop scroll-pop-2 transition-transform duration-300 ease-out hover:-translate-y-2">
              {/* Luxury 3D Medal Floating Icon Badge */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 size-12 sm:size-13 rounded-full bg-gradient-to-b from-white via-white to-orange-50/80 border-2 border-[#E04F16] ring-4 ring-orange-500/25 ring-offset-2 ring-offset-[#082B4C] shadow-[0_8px_20px_rgba(224,79,22,0.38)] flex items-center justify-center text-[#E04F16] group-hover:scale-108 group-hover:-translate-y-1 group-hover:ring-orange-400/40 group-hover:shadow-[0_12px_28px_rgba(224,79,22,0.55)] transition-all duration-300">
                <Headphones className="size-6 sm:size-6.5 text-[#E04F16] drop-shadow-xs" />
              </div>

              {/* Slanted / Skewed Card Body */}
              <div className="-skew-x-[8deg] sm:-skew-x-[9deg] rounded-2xl sm:rounded-3xl border-2 border-[#E04F16] bg-white shadow-[0_14px_34px_rgba(4,21,38,0.5),0_4px_14px_rgba(224,79,22,0.22)] group-hover:shadow-[0_22px_50px_rgba(224,79,22,0.4)] group-hover:border-orange-400 transition-all duration-300 overflow-hidden">
                {/* Navy Blue Header Bar with Glossy Glass Reflection */}
                <div className="relative bg-gradient-to-b from-[#0b365e] via-[#082B4C] to-[#051c33] pt-9 sm:pt-10 pb-3 px-3 text-center border-b border-orange-500/30">
                  {/* Subtle metallic top shine line */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                  <div className="skew-x-[8deg] sm:skew-x-[9deg]">
                    <h3 className="font-black text-sm sm:text-base text-white tracking-wide drop-shadow-xs">
                      End-to-End Support
                    </h3>
                  </div>
                </div>

                {/* White Bottom Body with High-Definition Styling */}
                <div className="bg-gradient-to-b from-white via-[#FCFDFE] to-[#F8FAFC] py-3.5 sm:py-4 px-4 text-center min-h-[58px] sm:min-h-[62px] flex items-center justify-center border-t border-slate-100">
                  <div className="skew-x-[8deg] sm:skew-x-[9deg]">
                    <p className="font-extrabold text-xs sm:text-[13px] text-[#082B4C] leading-snug tracking-tight">
                      From consultation to post-sales service
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Trusted Quality */}
            <div className="group relative pt-7 sm:pt-8 scroll-pop scroll-pop-2 transition-transform duration-300 ease-out hover:-translate-y-2">
              {/* Luxury 3D Medal Floating Icon Badge */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 size-12 sm:size-13 rounded-full bg-gradient-to-b from-white via-white to-orange-50/80 border-2 border-[#E04F16] ring-4 ring-orange-500/25 ring-offset-2 ring-offset-[#082B4C] shadow-[0_8px_20px_rgba(224,79,22,0.38)] flex items-center justify-center text-[#E04F16] group-hover:scale-108 group-hover:-translate-y-1 group-hover:ring-orange-400/40 group-hover:shadow-[0_12px_28px_rgba(224,79,22,0.55)] transition-all duration-300">
                <BadgeCheck className="size-6 sm:size-6.5 text-[#E04F16] drop-shadow-xs" />
              </div>

              {/* Slanted / Skewed Card Body */}
              <div className="-skew-x-[8deg] sm:-skew-x-[9deg] rounded-2xl sm:rounded-3xl border-2 border-[#E04F16] bg-white shadow-[0_14px_34px_rgba(4,21,38,0.5),0_4px_14px_rgba(224,79,22,0.22)] group-hover:shadow-[0_22px_50px_rgba(224,79,22,0.4)] group-hover:border-orange-400 transition-all duration-300 overflow-hidden">
                {/* Navy Blue Header Bar with Glossy Glass Reflection */}
                <div className="relative bg-gradient-to-b from-[#0b365e] via-[#082B4C] to-[#051c33] pt-9 sm:pt-10 pb-3 px-3 text-center border-b border-orange-500/30">
                  {/* Subtle metallic top shine line */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                  <div className="skew-x-[8deg] sm:skew-x-[9deg]">
                    <h3 className="font-black text-sm sm:text-base text-white tracking-wide drop-shadow-xs">
                      Trusted Quality
                    </h3>
                  </div>
                </div>

                {/* White Bottom Body with High-Definition Styling */}
                <div className="bg-gradient-to-b from-white via-[#FCFDFE] to-[#F8FAFC] py-3.5 sm:py-4 px-4 text-center min-h-[58px] sm:min-h-[62px] flex items-center justify-center border-t border-slate-100">
                  <div className="skew-x-[8deg] sm:skew-x-[9deg]">
                    <p className="font-extrabold text-xs sm:text-[13px] text-[#082B4C] leading-snug tracking-tight">
                      Premium materials, certified &amp; reliable brands
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Row 2: 2 Cards Centered (Matched Proportional Width) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-6 max-w-[760px] mx-auto w-full pt-8 sm:pt-6">
            
            {/* Card 4: Assured Warranties */}
            <div className="group relative pt-7 sm:pt-8 scroll-pop scroll-pop-3 transition-transform duration-300 ease-out hover:-translate-y-2">
              {/* Luxury 3D Medal Floating Icon Badge */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 size-12 sm:size-13 rounded-full bg-gradient-to-b from-white via-white to-orange-50/80 border-2 border-[#E04F16] ring-4 ring-orange-500/25 ring-offset-2 ring-offset-[#082B4C] shadow-[0_8px_20px_rgba(224,79,22,0.38)] flex items-center justify-center text-[#E04F16] group-hover:scale-108 group-hover:-translate-y-1 group-hover:ring-orange-400/40 group-hover:shadow-[0_12px_28px_rgba(224,79,22,0.55)] transition-all duration-300">
                <ShieldCheck className="size-6 sm:size-6.5 text-[#E04F16] drop-shadow-xs" />
              </div>

              {/* Slanted / Skewed Card Body */}
              <div className="-skew-x-[8deg] sm:-skew-x-[9deg] rounded-2xl sm:rounded-3xl border-2 border-[#E04F16] bg-white shadow-[0_14px_34px_rgba(4,21,38,0.5),0_4px_14px_rgba(224,79,22,0.22)] group-hover:shadow-[0_22px_50px_rgba(224,79,22,0.4)] group-hover:border-orange-400 transition-all duration-300 overflow-hidden">
                {/* Navy Blue Header Bar with Glossy Glass Reflection */}
                <div className="relative bg-gradient-to-b from-[#0b365e] via-[#082B4C] to-[#051c33] pt-9 sm:pt-10 pb-3 px-3 text-center border-b border-orange-500/30">
                  {/* Subtle metallic top shine line */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                  <div className="skew-x-[8deg] sm:skew-x-[9deg]">
                    <h3 className="font-black text-sm sm:text-base text-white tracking-wide drop-shadow-xs">
                      Assured Warranties
                    </h3>
                  </div>
                </div>

                {/* White Bottom Body with High-Definition Styling */}
                <div className="bg-gradient-to-b from-white via-[#FCFDFE] to-[#F8FAFC] py-3.5 sm:py-4 px-4 text-center min-h-[58px] sm:min-h-[62px] flex items-center justify-center border-t border-slate-100">
                  <div className="skew-x-[8deg] sm:skew-x-[9deg]">
                    <p className="font-extrabold text-xs sm:text-[13px] text-[#082B4C] leading-snug tracking-tight">
                      Long-term performance &amp; peace of mind
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 5: Higher Savings */}
            <div className="group relative pt-7 sm:pt-8 scroll-pop scroll-pop-3 transition-transform duration-300 ease-out hover:-translate-y-2">
              {/* Luxury 3D Medal Floating Icon Badge */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 size-12 sm:size-13 rounded-full bg-gradient-to-b from-white via-white to-orange-50/80 border-2 border-[#E04F16] ring-4 ring-orange-500/25 ring-offset-2 ring-offset-[#082B4C] shadow-[0_8px_20px_rgba(224,79,22,0.38)] flex items-center justify-center text-[#E04F16] group-hover:scale-108 group-hover:-translate-y-1 group-hover:ring-orange-400/40 group-hover:shadow-[0_12px_28px_rgba(224,79,22,0.55)] transition-all duration-300">
                <TrendingUp className="size-6 sm:size-6.5 text-[#E04F16] drop-shadow-xs" />
              </div>

              {/* Slanted / Skewed Card Body */}
              <div className="-skew-x-[8deg] sm:-skew-x-[9deg] rounded-2xl sm:rounded-3xl border-2 border-[#E04F16] bg-white shadow-[0_14px_34px_rgba(4,21,38,0.5),0_4px_14px_rgba(224,79,22,0.22)] group-hover:shadow-[0_22px_50px_rgba(224,79,22,0.4)] group-hover:border-orange-400 transition-all duration-300 overflow-hidden">
                {/* Navy Blue Header Bar with Glossy Glass Reflection */}
                <div className="relative bg-gradient-to-b from-[#0b365e] via-[#082B4C] to-[#051c33] pt-9 sm:pt-10 pb-3 px-3 text-center border-b border-orange-500/30">
                  {/* Subtle metallic top shine line */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                  <div className="skew-x-[8deg] sm:skew-x-[9deg]">
                    <h3 className="font-black text-sm sm:text-base text-white tracking-wide drop-shadow-xs">
                      Higher Savings
                    </h3>
                  </div>
                </div>

                {/* White Bottom Body with High-Definition Styling */}
                <div className="bg-gradient-to-b from-white via-[#FCFDFE] to-[#F8FAFC] py-3.5 sm:py-4 px-4 text-center min-h-[58px] sm:min-h-[62px] flex items-center justify-center border-t border-slate-100">
                  <div className="skew-x-[8deg] sm:skew-x-[9deg]">
                    <p className="font-extrabold text-xs sm:text-[13px] text-[#082B4C] leading-snug tracking-tight">
                      Lower electricity bills &amp; faster ROI
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE SOLAR SIZING & FINANCIAL ROI CALCULATOR */}
      <section id="solar-calculator" className="pt-5 sm:pt-6 pb-6 sm:pb-7 scroll-mt-24 sm:scroll-mt-28 border-b border-orange-200/90 bg-gradient-to-b from-white via-[#FFFDF9] to-orange-50/15 relative">
        <div className="container-site">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2.5 pb-2.5 sm:pb-3 border-b border-orange-200/80 mb-3.5 sm:mb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 border border-orange-200/80 px-2.5 py-0.5 text-[10.5px] font-black uppercase tracking-wider text-[#D9410E] mb-1">
                <Calculator className="size-3 text-[#E04F16]" /> Instant Solar Sizing Engine
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#082B4C] tracking-tight">
                Solar <span className="text-[#E04F16]">Calculation &amp; Subsidy Estimator</span>
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-600 mt-0.5 max-w-2xl font-medium">
                Slide your average monthly electricity bill to calculate the optimal kW system, required rooftop space, ₹78,000 PM Surya Ghar DBT subsidy, and 25-year financial savings in Andhra Pradesh.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                to="/solar-calculator"
                className="rounded-full bg-gradient-to-r from-[#D9410E] via-[#E04F16] to-[#F97316] hover:from-[#C03507] hover:to-[#D9410E] text-white font-bold text-xs sm:text-[13px] px-4 py-2 shadow-xs transition-all hover:shadow hover:scale-[1.01] active:scale-95 inline-flex items-center gap-1.5"
              >
                <span>Full Calculator Page</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* Interactive Calculator Card (Compact, Instant Real-Time Display with zero dead gaps) */}
          <div className="rounded-2xl sm:rounded-3xl bg-white border border-orange-200/90 shadow-md overflow-hidden p-3 sm:p-5 lg:p-6">
            <SolarCalculator onApplyPlan={handleApplyPlan} hideHeader className="border-none shadow-none p-0 bg-transparent" />
          </div>
        </div>
      </section>

      {/* OUR 7-STEP PROCESS - Photorealistic Engineering Stepper Layout */}
      <section id="how-it-works" className="bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-4 sm:pt-6 pb-6 sm:pb-8 scroll-mt-20 sm:scroll-mt-24 overflow-hidden border-b border-orange-200/90">
        <div className="container-site">
          {/* Section Header with Curved Orange Swoosh Underline */}
          <div className="text-left mb-5 sm:mb-6 scroll-pop scroll-pop-1">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E04F16]/10 px-3 py-1 text-[10px] sm:text-[11px] font-black text-[#E04F16] uppercase tracking-wider mb-2 border border-orange-200/60 shadow-2xs">
              <Sparkles className="size-3" /> Seamless End-to-End Execution
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#082B4C] tracking-tight">
              Our <span className="text-[#E04F16]">7-Step Process</span>
            </h2>
            {/* Orange Swoosh Curve */}
            <div className="relative mt-1.5 h-2.5 w-32 sm:w-44 overflow-hidden">
              <svg viewBox="0 0 200 14" fill="none" className="w-full h-full text-[#E04F16]">
                <path d="M4 11C60 2 140 2 196 11" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl font-medium">
              From your initial consultation to 25 years of clean power generation — clear, engineered, and transparent solar journey across Andhra Pradesh &amp; Telangana.
            </p>
          </div>

          {/* Connected Progress Pipeline Track (Desktop & Tablet: 7 Milestones) */}
          <div className="mb-6 hidden md:grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 p-2 rounded-2xl bg-white/90 border border-orange-200/80 shadow-2xs backdrop-blur-xs">
            {SEVEN_STEP_PROCESS.map((item) => (
              <div
                key={item.step}
                className={cn(
                  "flex items-center gap-2 px-2.5 py-2 rounded-xl transition-all border",
                  item.theme.stepperActive
                )}
              >
                <span className={cn("grid size-5.5 place-items-center rounded-full text-[11px] font-black shrink-0", item.theme.stepperNum)}>
                  {item.step}
                </span>
                <div className="min-w-0">
                  <div className="text-[11px] font-black tracking-tight text-slate-900 truncate">{item.stepperLabel}</div>
                  <div className="text-[9.5px] text-slate-500 font-medium truncate">{item.duration.split("•")[0]}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 7 Process Cards + 1 Dedicated Senior Manager Spotlight Card = 8 Balanced Cards (2 Rows of 4 on Desktop) */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-3.5 xl:gap-4.5 items-stretch">
            {SEVEN_STEP_PROCESS.map((item, index) => {
              const Icon = item.icon;
              const staggerClass = `scroll-pop-${(index % 4) + 1}`;
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
                            <h3 className="text-sm font-extrabold text-[#082B4C] leading-snug group-hover/card:text-[#E04F16] transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
                              {item.theme.tagText}
                            </p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-slate-600 leading-relaxed text-[11px] sm:text-[11.5px] line-clamp-3 mb-3 font-medium">
                          {item.desc}
                        </p>
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
                </div>
              );
            })}

            {/* Card 8: Dedicated Senior Project Manager Spotlight Card */}
            <div
              data-tilt="true"
              className="parallax-card relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#082B4C] via-[#093259] to-[#E04F16] p-4 sm:p-5 text-white shadow-xl border border-[#0d3b66] overflow-hidden group scroll-pop scroll-pop-4"
            >
              <div className="absolute top-0 right-0 -mr-10 -mt-10 size-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-block rounded-full bg-amber-400 text-[#082B4C] text-[9.5px] font-black uppercase px-2.5 py-0.5 tracking-wider shadow-sm">
                    100% Turnkey Ownership
                  </span>
                  <span className="text-[10px] font-bold text-amber-200">Single Window</span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
                  One Dedicated Senior Engineer
                </h3>
                <p className="mt-2 text-[11px] sm:text-xs text-white/90 leading-relaxed font-medium">
                  Zero middlemen. Never run between electricians, panel dealers, DISCOM offices, or banks. 1 Senior Solar Engineer oversees all 7 milestones with zero finger-pointing.
                </p>

                <div className="mt-4 space-y-2 pt-3 border-t border-white/15 text-[11px] font-bold text-white/95">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-amber-300 shrink-0" />
                    <span>Single Point of Contact for All 7 Milestones</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-amber-300 shrink-0" />
                    <span>Direct WhatsApp &amp; Phone Line with Engineer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-amber-300 shrink-0" />
                    <span>25-Year Performance Assurance Guarantee</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3">
                <Link
                  to="/one-point-of-contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white text-[#082B4C] hover:bg-slate-100 font-bold text-xs py-2.5 px-4 shadow-md transition-all active:scale-95 group/btn"
                >
                  <span>Explore One Point of Contact</span>
                  <ArrowRight className="size-3.5 text-[#E04F16] transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Action CTA for 7-Step Process */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 scroll-pop">
            <Button asChild variant="cta" size="sm" className="rounded-full bg-gradient-to-r from-[#D9410E] via-[#E04F16] to-[#F97316] hover:from-[#C03507] hover:to-[#D9410E] text-white px-7 py-3 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95">
              <Link to="/book-a-demo" search={{ service: "Our 7-Step Solar Process", tab: "calendar" }}>
                <span>Start Your 7-Step Solar Journey</span>
                <ArrowRight className="size-4 ml-1.5" />
              </Link>
            </Button>
            <Link
              to="/one-point-of-contact"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#082B4C] hover:text-[#E04F16] transition-colors px-4 py-2"
            >
              <span>Explore One Point of Contact</span>
              <ArrowRight className="size-3.5 text-[#E04F16]" />
            </Link>
            <Link
              to="/process"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#E04F16] transition-colors px-4 py-2"
            >
              <span>Detailed Process Guide</span>
              <ArrowRight className="size-3.5 text-[#E04F16]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. POWERCARE SECTION - ULTRA-PREMIUM COMPACT REDESIGN (SCREEN FIT) */}
      <section id="powercare" className="scroll-mt-20 sm:scroll-mt-24 py-4 sm:py-6 bg-gradient-to-b from-[#FFFDF9] via-white to-slate-50/70 border-b border-orange-200/90">
        <div className="container-site">
          
          {/* Section Header: Compact & Screen Fit */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2.5 mb-3 sm:mb-4 scroll-pop">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-100/80 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#E04F16] border border-orange-200/90 mb-1 shadow-2xs">
                <ShieldCheck className="size-3 text-[#E04F16]" />
                <span>5 Years of Comprehensive Solar Care • Every 45 Days Visit</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#082B4C] tracking-tight leading-tight">
                PowerCare: <span className="text-[#E04F16]">5 Years of Comprehensive Solar Care</span>
              </h2>
              <p className="mt-0.5 text-xs sm:text-[13px] text-slate-600 leading-snug font-medium">
                Every solar installation includes guaranteed <strong>Every 45 Days Visit</strong> for Structural Check, Electrical Check, Mechanical Check, and Demineralized Panel Cleaning at zero extra cost.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <Link
                to="/powercare"
                className="group inline-flex items-center gap-1.5 rounded-full bg-white hover:bg-orange-50/60 border border-orange-200/90 hover:border-[#E04F16] px-3.5 py-1.5 text-xs font-bold text-[#082B4C] hover:text-[#E04F16] shadow-xs hover:shadow-sm transition-all"
              >
                <span>View Full Program</span>
                <ArrowRight className="size-3.5 text-[#E04F16] transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Main 2-Column Showcase: Left Image Feature Card + Right 6 Dedicated Protocol Cards (Aligned to Same Height & Screen Fit) */}
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 items-stretch">
            
            {/* Left Column (5 Cols): Rooftop Engineer Cleaning Visual Card (Aligned 100% to Height of 6 Cards) */}
            <div className="w-full lg:w-5/12 flex flex-col shrink-0">
              <div className="parallax-wrap relative h-[220px] sm:h-[240px] lg:h-full rounded-2xl overflow-hidden border border-orange-200/90 shadow-md shadow-orange-500/5 group flex flex-col justify-between">
                <img
                  src={powercarePanelCleaning}
                  alt="Amaravati Solar certified engineer actively washing solar panels with water-fed brush on rooftop"
                  data-parallax="image"
                  data-parallax-rate="0.08"
                  data-parallax-max="12"
                  className="w-full h-full object-cover object-[center_2%] transition-transform duration-300 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15 pointer-events-none" />

                {/* Floating Top Glass Badge */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-[#082B4C]/90 border border-white/20 px-2.5 py-1 text-[9.5px] font-black text-white backdrop-blur-md shadow-md">
                  <ShieldCheck className="size-3 text-amber-400" />
                  <span>PowerCare • Certified Engineer On-Site</span>
                </div>

                {/* Floating Bottom Glass Bar */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between rounded-xl bg-[#082B4C]/92 border border-white/20 px-3 py-1.5 text-white backdrop-blur-md shadow-xl">
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-amber-300">
                    <ShieldCheck className="size-3.5 text-amber-400 shrink-0" />
                    <span>5-Yr Free PowerCare Included</span>
                  </div>
                  <span className="text-[9px] font-extrabold uppercase bg-[#E04F16] text-white px-2 py-0.5 rounded-full shadow-2xs">
                    45-Day Visits
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column (7 Cols): 6 Dedicated PowerCare Protocol & Commitment Cards (Tight & Compact - Zero Gap) */}
            <div className="w-full lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
              
              {/* Point 1: Structural Check */}
              <div
                data-tilt="true"
                className="parallax-card group rounded-xl bg-gradient-to-br from-[#FFFDF9] via-white to-[#FFF8F0] p-2.5 sm:p-3 border border-orange-200/90 hover:border-[#E04F16] shadow-2xs hover:shadow-md transition-all duration-300 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="grid size-8 sm:size-8.5 place-items-center rounded-lg bg-orange-100/90 text-[#E04F16] border border-orange-200 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    <Wrench className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-[13px] font-black text-[#082B4C] leading-tight truncate">1. Structural Check</h3>
                    <span className="text-[9px] font-black uppercase text-amber-700 tracking-wider">Civil Integrity</span>
                  </div>
                </div>
                <span className="rounded-full bg-orange-50 border border-orange-200/80 px-2 py-0.5 text-[9px] font-extrabold text-[#E04F16] shrink-0 whitespace-nowrap">
                  Every 45 Days
                </span>
              </div>

              {/* Point 2: Electrical Check */}
              <div
                data-tilt="true"
                className="parallax-card group rounded-xl bg-gradient-to-br from-[#FFFDF9] via-white to-[#F0F7FF] p-2.5 sm:p-3 border border-blue-200/80 hover:border-[#0756B9] shadow-2xs hover:shadow-md transition-all duration-300 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="grid size-8 sm:size-8.5 place-items-center rounded-lg bg-blue-100/90 text-[#0756B9] border border-blue-200 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    <PlugZap className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-[13px] font-black text-[#082B4C] leading-tight truncate">2. Electrical Check</h3>
                    <span className="text-[9px] font-black uppercase text-[#0756B9] tracking-wider">Fire &amp; Yield Safety</span>
                  </div>
                </div>
                <span className="rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-[9px] font-extrabold text-[#0756B9] shrink-0 whitespace-nowrap">
                  Every 45 Days
                </span>
              </div>

              {/* Point 3: Mechanical Check */}
              <div
                data-tilt="true"
                className="parallax-card group rounded-xl bg-gradient-to-br from-[#FFFDF9] via-white to-[#F8FAFC] p-2.5 sm:p-3 border border-slate-200/90 hover:border-slate-500 shadow-2xs hover:shadow-md transition-all duration-300 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="grid size-8 sm:size-8.5 place-items-center rounded-lg bg-slate-100/90 text-slate-700 border border-slate-200 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    <Settings2 className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-[13px] font-black text-[#082B4C] leading-tight truncate">3. Mechanical Check</h3>
                    <span className="text-[9px] font-black uppercase text-slate-600 tracking-wider">Hardware Longevity</span>
                  </div>
                </div>
                <span className="rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-[9px] font-extrabold text-slate-700 shrink-0 whitespace-nowrap">
                  Every 45 Days
                </span>
              </div>

              {/* Point 4: Panel Cleaning */}
              <div
                data-tilt="true"
                className="parallax-card group rounded-xl bg-gradient-to-br from-[#FFFDF9] via-white to-[#F0FDF4] p-2.5 sm:p-3 border border-emerald-200/90 hover:border-emerald-600 shadow-2xs hover:shadow-md transition-all duration-300 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="grid size-8 sm:size-8.5 place-items-center rounded-lg bg-emerald-100/90 text-emerald-700 border border-emerald-200 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    <Sparkles className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-[13px] font-black text-[#082B4C] leading-tight truncate">4. Panel Cleaning</h3>
                    <span className="text-[9px] font-black uppercase text-emerald-700 tracking-wider">Yield Optimization</span>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-extrabold text-emerald-700 shrink-0 whitespace-nowrap">
                  Every 45 Days
                </span>
              </div>

              {/* Point 5: Every 45 Days Visit */}
              <div
                data-tilt="true"
                className="parallax-card group rounded-xl bg-gradient-to-br from-[#FFFDF9] via-white to-[#FFFBEB] p-2.5 sm:p-3 border border-amber-300/90 hover:border-amber-500 shadow-2xs hover:shadow-md transition-all duration-300 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="grid size-8 sm:size-8.5 place-items-center rounded-lg bg-amber-100/90 text-amber-700 border border-amber-300 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    <Clock className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-[13px] font-black text-[#082B4C] leading-tight truncate">5. Every 45 Days Visit</h3>
                    <span className="text-[9px] font-black uppercase text-amber-800 tracking-wider">Proactive Schedule</span>
                  </div>
                </div>
                <span className="rounded-full bg-amber-100 border border-amber-300 px-2 py-0.5 text-[9px] font-extrabold text-amber-900 shrink-0 whitespace-nowrap">
                  Guaranteed
                </span>
              </div>

              {/* Point 6: 5-Yr Comprehensive Care */}
              <div
                data-tilt="true"
                className="parallax-card group rounded-xl bg-gradient-to-br from-[#FFFDF9] via-white to-[#FEF2F2] p-2.5 sm:p-3 border border-rose-200/90 hover:border-rose-500 shadow-2xs hover:shadow-md transition-all duration-300 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="grid size-8 sm:size-8.5 place-items-center rounded-lg bg-rose-100/90 text-rose-700 border border-rose-200 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    <ShieldCheck className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-[13px] font-black text-[#082B4C] leading-tight truncate">6. 5-Yr Comprehensive Care</h3>
                    <span className="text-[9px] font-black uppercase text-rose-700 tracking-wider">100% Free Included</span>
                  </div>
                </div>
                <span className="rounded-full bg-rose-50 border border-rose-200 px-2 py-0.5 text-[9px] font-extrabold text-rose-700 shrink-0 whitespace-nowrap">
                  Zero Fee
                </span>
              </div>

            </div>

          </div>

          {/* 5 Value Pillars: Compact Clean Strip */}
          <div className="mt-3.5 sm:mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
            
            <div className="rounded-xl bg-white p-2.5 sm:p-3 border border-orange-200/80 shadow-2xs hover:shadow-xs hover:border-[#E04F16] transition-all">
              <div className="flex items-center gap-1.5 text-[#E04F16]">
                <BadgeCheck className="size-3.5 shrink-0" />
                <span className="text-xs font-black text-[#082B4C]">Preventive Care</span>
              </div>
              <p className="mt-0.5 text-[10.5px] text-slate-600 font-medium leading-tight">
                Scheduled on-site audits every 45 days.
              </p>
            </div>

            <div className="rounded-xl bg-white p-2.5 sm:p-3 border border-orange-200/80 shadow-2xs hover:shadow-xs hover:border-[#E04F16] transition-all">
              <div className="flex items-center gap-1.5 text-[#E04F16]">
                <Phone className="size-3.5 shrink-0" />
                <span className="text-xs font-black text-[#082B4C]">Dedicated Support</span>
              </div>
              <p className="mt-0.5 text-[10.5px] text-slate-600 font-medium leading-tight">
                Direct phone &amp; WhatsApp helpline.
              </p>
            </div>

            <div className="rounded-xl bg-white p-2.5 sm:p-3 border border-orange-200/80 shadow-2xs hover:shadow-xs hover:border-[#E04F16] transition-all">
              <div className="flex items-center gap-1.5 text-[#E04F16]">
                <Zap className="size-3.5 shrink-0" />
                <span className="text-xs font-black text-[#082B4C]">Peak Yield</span>
              </div>
              <p className="mt-0.5 text-[10.5px] text-slate-600 font-medium leading-tight">
                Optimized daily generation on bills.
              </p>
            </div>

            <div className="rounded-xl bg-white p-2.5 sm:p-3 border border-orange-200/80 shadow-2xs hover:shadow-xs hover:border-[#E04F16] transition-all">
              <div className="flex items-center gap-1.5 text-[#E04F16]">
                <Clock className="size-3.5 shrink-0" />
                <span className="text-xs font-black text-[#082B4C]">48-Hour SLA</span>
              </div>
              <p className="mt-0.5 text-[10.5px] text-slate-600 font-medium leading-tight">
                Prompt senior engineer dispatch.
              </p>
            </div>

            <div className="col-span-2 sm:col-span-1 rounded-xl bg-white p-2.5 sm:p-3 border border-orange-200/80 shadow-2xs hover:shadow-xs hover:border-[#E04F16] transition-all">
              <div className="flex items-center gap-1.5 text-[#E04F16]">
                <FileCheck2 className="size-3.5 shrink-0" />
                <span className="text-xs font-black text-[#082B4C]">Warranty Shield</span>
              </div>
              <p className="mt-0.5 text-[10.5px] text-slate-600 font-medium leading-tight">
                Logbooks keep 25-yr warranty valid.
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
                href="tel:+916305825402"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 px-4 py-2.5 text-xs sm:text-sm font-bold text-white transition-all active:scale-95"
              >
                <Phone className="size-3.5 text-amber-300" />
                <span>+91 63058 25402</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 5B. POWER SURE - Performance Guarantee & Guaranteed Solar Savings Plan */}
      <section id="power-back-promise" className="scroll-mt-24 sm:scroll-mt-28 py-6 sm:py-10 bg-gradient-to-b from-white via-slate-50/50 to-white border-b border-orange-200/90">
        <div className="container-site">
          <div className="relative overflow-hidden rounded-3xl sm:rounded-[32px] border border-orange-200/80 bg-gradient-to-br from-white via-orange-50/30 to-amber-50/40 p-6 sm:p-8 md:p-10 shadow-xl shadow-slate-900/5">
            {/* Ambient Background Decorative Glows */}
            <div className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-gradient-to-br from-orange-400/15 via-amber-300/10 to-transparent blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-20 size-80 rounded-full bg-gradient-to-tl from-orange-400/25 via-amber-300/20 to-transparent blur-3xl" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">
              {/* Left Column: Eyebrow, Title, Subtitle, Description, CTA */}
              <div className="lg:col-span-4 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/10 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-700 border border-emerald-600/20 mb-2">
                    <ShieldCheck className="size-3 text-emerald-600" />
                    <span>Performance Guarantee • Financial Assurance</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#082B4C] tracking-tight leading-tight">
                    Power Sure
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm font-bold text-[#E04F16]">
                    Solar Performance. Financial Assurance.
                  </p>
                  <p className="mt-2 text-xs sm:text-[12.5px] text-slate-600 leading-relaxed font-medium">
                    At Amaravati Solar Solutions, we stand behind our commitment to reliable solar yield. With Power Sure, eligible customers receive <strong className="inline-block whitespace-nowrap text-emerald-700 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">₹7/Unit compensation</strong> when actual generation falls below agreed performance benchmarks, subject to applicable terms.
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Link
                    to="/power-back-promise"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#082B4C] hover:bg-[#E04F16] text-white px-4 sm:px-5 py-2 text-xs font-bold shadow-md hover:shadow-xl transition-all duration-300 active:scale-95 group"
                  >
                    <span>Know More about Power Sure</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/book-a-demo"
                    className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#D9410E] via-[#E04F16] to-[#F97316] hover:from-[#C03507] hover:to-[#D9410E] text-white px-4 py-2 text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
                  >
                    <span>Free Consultation</span>
                  </Link>
                </div>
              </div>

              {/* Middle Column: 2x3 Grid with 6 Clean Points (NO TRUNCATE, NO CUTOFF) */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                {/* 1. ₹7/Unit Compensation */}
                <div className="rounded-xl bg-white/95 p-2.5 sm:p-3 border border-orange-200/90 shadow-2xs hover:border-[#E04F16] hover:shadow-md transition-all flex items-center gap-2.5">
                  <div className="size-8 rounded-lg bg-emerald-100 text-emerald-700 grid place-items-center shrink-0 shadow-2xs">
                    <Coins className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-[13px] font-black text-[#082B4C] leading-tight">₹7/Unit Money Back</h3>
                    <span className="text-[9.5px] font-bold text-emerald-700 uppercase tracking-wide block">Shortfall Compensation</span>
                  </div>
                </div>

                {/* 2. 5-Year Warranty */}
                <div className="rounded-xl bg-white/95 p-2.5 sm:p-3 border border-orange-200/90 shadow-2xs hover:border-[#E04F16] hover:shadow-md transition-all flex items-center gap-2.5">
                  <div className="size-8 rounded-lg bg-orange-100 text-[#E04F16] grid place-items-center shrink-0 shadow-2xs">
                    <ShieldCheck className="size-4 text-[#E04F16]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-[13px] font-black text-[#082B4C] leading-tight">5-Year Warranty</h3>
                    <span className="text-[9.5px] font-bold text-[#E04F16] uppercase tracking-wide block">100% Free PowerCare</span>
                  </div>
                </div>

                {/* 3. 25-Year Performance */}
                <div className="rounded-xl bg-white/95 p-2.5 sm:p-3 border border-orange-200/90 shadow-2xs hover:border-amber-500 hover:shadow-md transition-all flex items-center gap-2.5">
                  <div className="size-8 rounded-lg bg-amber-100 text-amber-800 grid place-items-center shrink-0 shadow-2xs">
                    <Award className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-[13px] font-black text-[#082B4C] leading-tight">25-Year Performance</h3>
                    <span className="text-[9.5px] font-bold text-amber-800 uppercase tracking-wide block">Linear Output Guarantee</span>
                  </div>
                </div>

                {/* 4. Transparent Audits */}
                <div className="rounded-xl bg-white/95 p-2.5 sm:p-3 border border-orange-200/90 shadow-2xs hover:border-blue-500 hover:shadow-md transition-all flex items-center gap-2.5">
                  <div className="size-8 rounded-lg bg-blue-100 text-blue-700 grid place-items-center shrink-0 shadow-2xs">
                    <Target className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-[13px] font-black text-[#082B4C] leading-tight">Transparent Audits</h3>
                    <span className="text-[9.5px] font-bold text-blue-700 uppercase tracking-wide block">PVsyst Solar Target</span>
                  </div>
                </div>

                {/* 5. Tier-1 ALMM Specs */}
                <div className="rounded-xl bg-white/95 p-2.5 sm:p-3 border border-orange-200/90 shadow-2xs hover:border-[#082B4C] hover:shadow-md transition-all flex items-center gap-2.5">
                  <div className="size-8 rounded-lg bg-sky-100 text-[#082B4C] grid place-items-center shrink-0 shadow-2xs">
                    <BadgeCheck className="size-4 text-[#082B4C]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-[13px] font-black text-[#082B4C] leading-tight">Tier-1 ALMM Specs</h3>
                    <span className="text-[9.5px] font-bold text-sky-800 uppercase tracking-wide block">BIS Certified Modules</span>
                  </div>
                </div>

                {/* 6. 48-Hour Service SLA */}
                <div className="rounded-xl bg-white/95 p-2.5 sm:p-3 border border-orange-200/90 shadow-2xs hover:border-rose-500 hover:shadow-md transition-all flex items-center gap-2.5">
                  <div className="size-8 rounded-lg bg-rose-100 text-rose-700 grid place-items-center shrink-0 shadow-2xs">
                    <Clock className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-[13px] font-black text-[#082B4C] leading-tight">48-Hour Service SLA</h3>
                    <span className="text-[9.5px] font-bold text-rose-700 uppercase tracking-wide block">Rapid On-Site Support</span>
                  </div>
                </div>
              </div>

              {/* Right Column: 3D Luxury Orange Assurance Shield Emblem */}
              <div className="lg:col-span-3 flex justify-center lg:justify-end">
                <div className="relative group">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#E04F16]/30 via-amber-400/25 to-[#F97316]/35 blur-2xl group-hover:from-[#E04F16]/45 group-hover:to-amber-400/40 transition-all duration-500" />
                  <img
                    src={powerSureAssuranceShield}
                    alt="Power Sure 100% Performance Assurance & Guarantee Emblem"
                    className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 lg:w-56 lg:h-56 object-contain drop-shadow-[0_16px_36px_rgba(224,79,22,0.35)] hover:scale-105 transition-all duration-500 select-none rounded-2xl"
                    style={{
                      WebkitMaskImage: "radial-gradient(circle at center, black 65%, transparent 95%)",
                      maskImage: "radial-gradient(circle at center, black 65%, transparent 95%)",
                    }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Trust Strip */}
            <div className="mt-6 pt-4 border-t border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-slate-600">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-emerald-600" />
                  <span>Andhra Pradesh &amp; Telangana Guaranteed</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-emerald-600" />
                  <span>Tier-1 Tested Components</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-emerald-600" />
                  <span>48-Hour Service Response SLA</span>
                </span>
              </div>
              <span className="text-[11px] font-extrabold text-[#082B4C]">
                More Confidence. More Value. Smarter Solar.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5C. ONE POINT OF CONTACT - Single Window Accountability */}
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
                One Point of Contact: <span className="text-[#E04F16]">Single Window Accountability</span>
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
                <span>View Full Accountability Model</span>
                <ArrowRight className="size-4 text-[#E04F16] transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* 4 Pillars of Single-Window Accountability (Why One Point of Contact Matters) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <div
              data-tilt="true"
              className="parallax-card rounded-2xl sm:rounded-3xl border border-orange-200/90 bg-white p-5 shadow-xs hover:shadow-xl hover:border-[#E04F16] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="grid size-9 place-items-center rounded-xl bg-orange-50 text-[#E04F16] border border-orange-200/60">
                    <Users className="size-5" />
                  </div>
                  <span className="rounded-full bg-orange-100 text-[#E04F16] text-[9.5px] font-black px-2.5 py-0.5 uppercase tracking-wider">
                    Single Lead
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-[#082B4C]">
                  Dedicated Project Manager
                </h3>
                <p className="mt-1 text-[11px] font-bold text-amber-700">
                  vs. 5+ Disconnected Vendors
                </p>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed font-medium">
                  One senior solar engineer manages your site check, 3D CAD design, DISCOM paperwork, and commissioning. Never run between uncoordinated freelance contractors.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                <span>Zero Middlemen</span>
              </div>
            </div>

            <div
              data-tilt="true"
              className="parallax-card rounded-2xl sm:rounded-3xl border border-orange-200/90 bg-white p-5 shadow-xs hover:shadow-xl hover:border-[#E04F16] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="grid size-9 place-items-center rounded-xl bg-sky-50 text-sky-600 border border-sky-200/60">
                    <ShieldCheck className="size-5" />
                  </div>
                  <span className="rounded-full bg-sky-100 text-sky-800 text-[9.5px] font-black px-2.5 py-0.5 uppercase tracking-wider">
                    48-Hr SLA
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-[#082B4C]">
                  Zero Finger-Pointing
                </h3>
                <p className="mt-1 text-[11px] font-bold text-sky-700">
                  vs. Blame Games
                </p>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed font-medium">
                  100% turnkey accountability. If panels, inverter, or wiring ever encounter a glitch, Amaravati Solar directly diagnoses and resolves it under our 48-hour service SLA.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                <span>25-Yr Support SLA</span>
              </div>
            </div>

            <div
              data-tilt="true"
              className="parallax-card rounded-2xl sm:rounded-3xl border border-orange-200/90 bg-white p-5 shadow-xs hover:shadow-xl hover:border-[#E04F16] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="grid size-9 place-items-center rounded-xl bg-purple-50 text-purple-600 border border-purple-200/60">
                    <PlugZap className="size-5" />
                  </div>
                  <span className="rounded-full bg-purple-100 text-purple-800 text-[9.5px] font-black px-2.5 py-0.5 uppercase tracking-wider">
                    100% Turnkey
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-[#082B4C]">
                  DISCOM &amp; CEIG Liaisoning
                </h3>
                <p className="mt-1 text-[11px] font-bold text-purple-700">
                  vs. Customer Office Visits
                </p>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed font-medium">
                  We handle 100% of APCPDCL, APEPDCL &amp; TGSPDCL paperwork, transformer feasibility sanctions, net-meter testing, and safety approvals without you standing in queues.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                <span>Complete Regulatory Sync</span>
              </div>
            </div>

            <div
              data-tilt="true"
              className="parallax-card rounded-2xl sm:rounded-3xl border border-orange-200/90 bg-white p-5 shadow-xs hover:shadow-xl hover:border-[#E04F16] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="grid size-9 place-items-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                    <FileText className="size-5" />
                  </div>
                  <span className="rounded-full bg-emerald-100 text-emerald-800 text-[9.5px] font-black px-2.5 py-0.5 uppercase tracking-wider">
                    ₹78,000 DBT
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-[#082B4C]">
                  Direct Subsidy Tracking
                </h3>
                <p className="mt-1 text-[11px] font-bold text-emerald-700">
                  vs. Application Rejection Risk
                </p>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed font-medium">
                  Our documentation team tracks your PM Surya Ghar national portal application until the direct bank transfer (DBT) credit lands securely in your bank account.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                <span>Direct DBT Credit</span>
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
                href="tel:+916305825402"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 px-4 py-2.5 text-xs sm:text-sm font-bold text-white transition-all active:scale-95"
              >
                <Phone className="size-3.5 text-amber-300" />
                <span>Call +91 63058 25402</span>
              </a>
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

      {/* 7. SOLAR POWER ARCHITECTURES (PLACED RIGHT ABOVE FOOTER) */}
      <section id="solar-solutions" className="pt-8 sm:pt-10 pb-10 sm:pb-14 scroll-mt-24 sm:scroll-mt-28 border-t border-orange-200/90 bg-gradient-to-b from-white via-[#FFFDF9] to-orange-50/20">
        <div className="container-site">
          {/* Solutions Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 pb-3 sm:pb-4 border-b border-orange-200/80 mb-6 sm:mb-8">
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

    </>
  );
}
