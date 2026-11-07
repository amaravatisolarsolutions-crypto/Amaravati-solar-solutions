import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Headphones,
  HelpCircle,
  MessageSquare,
  Phone,
  PlugZap,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Users,
  Wrench,
  XCircle,
} from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import step1Consultation from "@/assets/process-step-1-consultation.jpg";
import step2Inspection from "@/assets/process-step-2-inspection.jpg";
import step3Design from "@/assets/process-step-3-design.jpg";
import step4Subsidy from "@/assets/process-step-subsidy-loan.jpg";
import step5Installation from "@/assets/process-step-4-installation.jpg";
import step6Commissioning from "@/assets/project-residential-inverter-10kw.jpg";
import step7Support from "@/assets/project-hybrid-storage-villa-8kw.jpg";
import solarWatermark from "@/assets/solar-watermark-bg.jpg";
import { COMPANY } from "@/lib/site-data";
import { setupParallaxAndPopAnimation } from "@/lib/parallax-animation";

export const Route = createFileRoute("/one-point-of-contact")({
  head: () => ({
    meta: [
      { title: "Dedicated Relationship Manager & Single-Window Accountability | Amaravati Solar" },
      {
        name: "description",
        content:
          "Experience hassle-free solar adoption with a dedicated project manager at Amaravati Solar Solutions. Single-window accountability for surveys, 3D CAD designs, DISCOM liaisoning, and 25-year post-sales care in AP.",
      },
      {
        name: "keywords",
        content:
          "dedicated solar project manager, single point contact solar epc, solar customer support ap, turnkey solar engineering vijayawada",
      },
      { property: "og:title", content: "One Point of Contact — Amaravati Solar Solutions" },
      {
        property: "og:description",
        content:
          "Zero middlemen. One dedicated solar engineer manages your complete rooftop project across Andhra Pradesh.",
      },
      { property: "og:url", content: "https://amaravatisolarsolutions.com/one-point-of-contact" },
      { property: "og:image", content: "https://amaravatisolarsolutions.com/assets/hero-amaravati-exact-panoramic.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://amaravatisolarsolutions.com/one-point-of-contact" },
    ],
  }),
  component: OnePointOfContactPage,
});

const SEVEN_STEPS = [
  {
    step: "01",
    title: "Consultation & Energy Audit",
    badge: "ENERGY AUDIT",
    badgeColor: "text-amber-700 bg-amber-50 border-amber-200",
    image: step1Consultation,
    icon: Headphones,
    desc: "Personalized solar energy assessment analyzing your electricity bills, seasonal kWh consumption patterns, and calculating the exact required kW capacity and ROI.",
    highlights: ["Free Technical Assessment", "Transparent ROI Estimation"],
    managerRole: "Solar Energy Consultant",
  },
  {
    step: "02",
    title: "Site Check & 3D Shadow Simulation",
    badge: "DRONE SURVEY",
    badgeColor: "text-sky-700 bg-sky-50 border-sky-200",
    image: step2Inspection,
    icon: ClipboardCheck,
    desc: "Comprehensive on-site physical survey evaluating rooftop civil strength, azimuth angle, structural tilt, and high-precision drone shadow simulation.",
    highlights: ["3D Shadow Simulation", "AP Net-Metering Assessment"],
    managerRole: "Civil & Site Engineer",
  },
  {
    step: "03",
    title: "Custom 3D CAD Design & Engineering",
    badge: "CAD BLUEPRINT",
    badgeColor: "text-purple-700 bg-purple-50 border-purple-200",
    image: step3Design,
    icon: SlidersHorizontal,
    desc: "Tailored 3D CAD rooftop layouts, electrical single-line diagrams (SLD), Tier-1 bifacial panel selection, and cyclone-grade structural blueprints.",
    highlights: ["Custom 3D CAD Plan", "Tier-1 Component Sizing"],
    managerRole: "Systems Design Specialist",
  },
  {
    step: "04",
    title: "PM Surya Ghar Subsidy & Loan Guidance",
    badge: "GOVT APPROVAL",
    badgeColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    image: step4Subsidy,
    icon: FileText,
    desc: "Complete documentation and national portal filing to ensure the ₹78,000 direct bank transfer (DBT) subsidy and paperless low-interest bank financing.",
    highlights: ["Direct ₹78,000 DBT Filing", "Zero-Collateral Bank Financing"],
    managerRole: "Subsidy Liaison Officer",
  },
  {
    step: "05",
    title: "Certified Turnkey Installation",
    badge: "TURNKEY EPC",
    badgeColor: "text-orange-700 bg-orange-50 border-orange-200",
    image: step5Installation,
    icon: Wrench,
    desc: "Leak-free RCC mechanical mounting, hot-dip galvanized structural fastening, UV-resistant DC cabling, dual surge arrestors, and chemical earthing.",
    highlights: ["Hot-Dip Galvanized Mounts", "Chemical Earthing (< 2.0Ω)"],
    managerRole: "Master EPC Electrician",
  },
  {
    step: "06",
    title: "DISCOM Net-Meter Synchronization",
    badge: "GRID SYNC",
    badgeColor: "text-blue-700 bg-blue-50 border-blue-200",
    image: step6Commissioning,
    icon: PlugZap,
    desc: "End-to-end liaisoning with APCPDCL, APEPDCL, or TGSPDCL for bi-directional net-meter installation, CEIG electrical safety sanction, and synchronization.",
    highlights: ["Bi-Directional Net-Meter", "DISCOM & CEIG Clearance"],
    managerRole: "DISCOM Operations Lead",
  },
  {
    step: "07",
    title: "PowerCare 5-Yr Servicing & 25-Yr Support",
    badge: "LIFETIME CARE",
    badgeColor: "text-teal-700 bg-teal-50 border-teal-200",
    image: step7Support,
    icon: ShieldCheck,
    desc: "Scheduled bi-annual physical audits, FLIR thermal scans, demineralized module washing, 48-hour resolution SLA, and direct engineer access for 25 years.",
    highlights: ["5 Years Free Maintenance", "48-Hour On-Site SLA"],
    managerRole: "Dedicated Service Manager",
  },
];

const COMPARISON = [
  {
    issue: "Customer Interface",
    fragmented: "5+ different people: panel dealer, inverter shop, freelance electrician, net-meter agent, AMC provider.",
    amaravati: "1 Single Dedicated Senior Project Manager handles everything from Day 1 to 25 years.",
  },
  {
    issue: "Responsibility for Faults",
    fragmented: "Inverter seller blames panels; electrician blames inverter; customer gets stuck in finger-pointing.",
    amaravati: "100% turnkey accountability. If anything fails, Amaravati Solar inspects and resolves it within 48 hours.",
  },
  {
    issue: "DISCOM Liaisoning",
    fragmented: "Customer has to repeatedly visit the electricity office for feasibility, net-meter, and test reports.",
    amaravati: "We manage 100% of DISCOM paperwork, meter testing, and site synchronization without customer hassle.",
  },
  {
    issue: "Subsidy Disbursement",
    fragmented: "Incorrect document uploads delay or disqualify the ₹78,000 PM Surya Ghar DBT subsidy.",
    amaravati: "Dedicated subsidy documentation team tracks your national portal application until money hits your account.",
  },
];

function OnePointOfContactPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    return setupParallaxAndPopAnimation();
  }, []);

  return (
    <div className="bg-transparent pb-16 relative">
      {/* 1. TOP HEADER & BREADCRUMB WITH WARM SOLAR AMBIENT TINT */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-50/90 via-white/80 to-amber-50/70 backdrop-blur-md border-b border-orange-200/90 pt-5 pb-7 sm:pb-9">
        {/* Subtle Solar Watermark Decoration in Header */}
        <div
          className="absolute -right-8 -bottom-8 w-80 sm:w-96 h-48 sm:h-56 opacity-[0.09] pointer-events-none select-none bg-contain bg-no-repeat bg-right-bottom mix-blend-multiply"
          style={{ backgroundImage: `url(${solarWatermark})` }}
        />
        <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-orange-400/10 blur-3xl pointer-events-none" />

        <div className="container-site relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-primary transition-colors"
            >
              <ArrowLeft className="size-3.5 text-primary" /> Back to Home
            </Link>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black text-primary uppercase tracking-wider border border-primary/20 shadow-2xs">
              <Users className="size-3.5" /> SINGLE-WINDOW ACCOUNTABILITY
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#082B4C] tracking-tight">
            One Point of Contact: <span className="text-[#E04F16]">Your Complete Solar Journey</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-700 max-w-3xl leading-relaxed font-medium">
            One trusted partner from first conversation to 25 years of clean energy generation. Zero middlemen, zero finger-pointing, and complete peace of mind.
          </p>

          {/* 4 Feature Badges */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-orange-200/90 bg-white/90 backdrop-blur-sm p-3.5 text-left shadow-[0_4px_16px_rgba(249,115,22,0.07)] hover:shadow-md hover:border-orange-400 transition-all">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Project Lead</div>
              <div className="mt-0.5 text-base sm:text-lg font-black text-[#082B4C]">Dedicated Engineer</div>
              <div className="text-[10px] text-slate-600 mt-0.5">Assigned on Day 1</div>
            </div>

            <div className="rounded-xl border border-emerald-200/90 bg-white/90 backdrop-blur-sm p-3.5 text-left shadow-[0_4px_16px_rgba(16,185,129,0.07)] hover:shadow-md hover:border-emerald-400 transition-all">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Direct Hotline</div>
              <div className="mt-0.5 text-base sm:text-lg font-black text-emerald-700">Real Human Support</div>
              <div className="text-[10px] text-slate-600 mt-0.5">Direct phone & WhatsApp</div>
            </div>

            <div className="rounded-xl border border-blue-200/90 bg-white/90 backdrop-blur-sm p-3.5 text-left shadow-[0_4px_16px_rgba(14,165,233,0.07)] hover:shadow-md hover:border-blue-400 transition-all">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Lifecycle Scope</div>
              <div className="mt-0.5 text-base sm:text-lg font-black text-blue-700">7-Step Full Ownership</div>
              <div className="text-[10px] text-slate-600 mt-0.5">Survey to 25-yr support</div>
            </div>

            <div className="rounded-xl border border-amber-200/90 bg-white/90 backdrop-blur-sm p-3.5 text-left shadow-[0_4px_16px_rgba(245,158,11,0.07)] hover:shadow-md hover:border-amber-400 transition-all">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Govt &amp; DISCOM</div>
              <div className="mt-0.5 text-base sm:text-lg font-black text-amber-700">100% Handled</div>
              <div className="text-[10px] text-slate-600 mt-0.5">Zero customer running around</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 7-STEP WORKFLOW OWNED BY YOUR PROJECT MANAGER */}
      <section className="container-site pt-8 sm:pt-12">
        <div className="text-left mb-6 sm:mb-8">
          <span className="inline-block text-[11px] font-black uppercase tracking-wider text-[#E04F16] bg-[#E04F16]/10 px-3 py-1 rounded-full">
            END-TO-END LIFECYCLE
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-black text-[#082B4C] tracking-tight">
            7 Critical Steps Managed by Your Single Point of Contact
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            You never have to coordinate between contractors, suppliers, DISCOM offices, or banks. Your dedicated Amaravati Solar engineer oversees every single milestone with 100% turnkey accountability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SEVEN_STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="group relative rounded-2xl sm:rounded-3xl border border-orange-200/80 bg-white shadow-xs hover:shadow-xl hover:border-[#E04F16] transition-all duration-300 text-left flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Step Visual Image with Floating Badges */}
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                    {/* Step Pill Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 shadow-md border border-orange-200/60 backdrop-blur-sm">
                      <span className="size-2 rounded-full bg-[#E04F16]" />
                      <span className="text-[11px] font-black text-[#E04F16] tracking-wider">
                        STEP {item.step}
                      </span>
                    </div>

                    {/* Category Tag */}
                    <div className="absolute top-3 right-3 rounded-full bg-[#082B4C]/90 text-white border border-white/20 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider backdrop-blur-sm shadow-sm">
                      {item.badge}
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-5">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="grid size-8 place-items-center rounded-lg bg-orange-50 text-[#E04F16] border border-orange-200/60 shadow-2xs shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="size-4" />
                      </div>
                      <h3 className="text-base font-black text-[#082B4C] leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-xs text-slate-600 leading-relaxed font-medium">
                      {item.desc}
                    </p>

                    {/* Key Highlights */}
                    <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-1.5">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] font-bold text-slate-700">
                          <CheckCircle2 className="size-3.5 text-[#E04F16] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Pill: Manager Role */}
                <div className="px-5 pb-4 pt-1 bg-gradient-to-b from-transparent to-orange-50/30">
                  <div className="rounded-xl bg-slate-50 border border-slate-200/80 px-3 py-1.5 flex items-center justify-between text-[10.5px]">
                    <span className="text-slate-500 font-semibold">Single Point Contact:</span>
                    <span className="font-extrabold text-[#082B4C]">{item.managerRole}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. WHY FRAGMENTED CONTRACTING FAILS (COMPARISON TABLE) */}
      <section className="container-site pt-12 sm:pt-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-md">
          <div className="max-w-2xl mb-6">
            <span className="inline-block text-[11px] font-black uppercase tracking-wider text-[#E04F16] bg-[#E04F16]/10 px-3 py-1 rounded-full">
              MARKET REALITY CHECK
            </span>
            <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-black text-[#082B4C] tracking-tight">
              Single Partner vs Fragmented Contractors
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Why 70% of solar customer complaints across Andhra Pradesh stem from dealing with multiple uncoordinated vendors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {COMPARISON.map((row, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 p-5 bg-slate-50/50 text-left space-y-3">
                <h3 className="text-xs sm:text-sm font-black text-[#082B4C] uppercase tracking-wider border-b border-slate-200 pb-2">
                  {row.issue}
                </h3>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-rose-600 font-bold text-xs">
                    <XCircle className="size-3.5 shrink-0" /> Fragmented Contractors:
                  </div>
                  <p className="text-xs text-slate-600 pl-5">{row.fragmented}</p>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs">
                    <CheckCircle2 className="size-3.5 shrink-0 text-emerald-600" /> Amaravati Solar Solutions:
                  </div>
                  <p className="text-xs text-slate-800 font-medium pl-5">{row.amaravati}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MEET YOUR PROJECT LEAD & CONTACT OPTIONS */}
      <section className="container-site pt-12">
        <div className="rounded-3xl bg-gradient-to-r from-[#082B4C] via-[#0b3c6a] to-[#E04F16] p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left max-w-2xl">
            <span className="inline-block text-[11px] font-black uppercase tracking-wider text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/15">
              DIRECT ENGINEER ACCESS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Speak With Your Dedicated Solar Project Lead
            </h2>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
              Have questions about roof structural load, DISCOM net-metering feasibility, or government subsidies? Connect with our senior engineering team directly today.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Button asChild size="lg" className="rounded-full bg-white text-[#082B4C] hover:bg-slate-100 font-black text-xs sm:text-sm shadow-lg h-12 px-6 active:scale-95 transition-all">
              <Link to="/book-a-demo">
                <span>Book Free Consultation</span>
                <ArrowRight className="size-4 ml-1.5" />
              </Link>
            </Button>

            <a
              href="tel:+916305825402"
              className="inline-flex items-center gap-2 rounded-full bg-black/25 hover:bg-black/35 border border-white/30 px-5 h-12 text-xs sm:text-sm font-bold text-white transition-all active:scale-95"
            >
              <Phone className="size-4" />
              <span>Call +91 63058 25402</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

