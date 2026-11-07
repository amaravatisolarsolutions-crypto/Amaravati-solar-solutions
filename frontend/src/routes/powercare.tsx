import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock,
  Cpu,
  FileCheck2,
  HardHat,
  HelpCircle,
  Phone,
  PlugZap,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Sun,
  Thermometer,
  Wrench,
  Zap,
} from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import step2Inspection from "@/assets/process-step-2-inspection.jpg";
import { COMPANY } from "@/lib/site-data";
import { setupParallaxAndPopAnimation } from "@/lib/parallax-animation";

export const Route = createFileRoute("/powercare")({
  head: () => ({
    meta: [
      { title: "PowerCare 5-Yr Comprehensive Solar Maintenance & Cleaning | Amaravati Solar" },
      {
        name: "description",
        content:
          "PowerCare provides 5 years of certified structural, electrical, and mechanical solar maintenance in Andhra Pradesh. Thermal imaging, string testing, chemical earthing audits, and 48-hour resolution SLA.",
      },
      {
        name: "keywords",
        content:
          "solar panel maintenance andhra pradesh, solar cleaning services vijayawada, solar amc contract amaravati, solar inverter servicing guntur, solar power plant maintenance",
      },
      { property: "og:title", content: "PowerCare 5-Yr Comprehensive Solar Care — Amaravati Solar Solutions" },
      {
        property: "og:description",
        content:
          "Peak generation assurance, scheduled on-site audits, periodic panel cleaning, and 48-hour issue resolution across Andhra Pradesh.",
      },
      { property: "og:url", content: "https://amaravatisolarsolutions.com/powercare" },
      { property: "og:image", content: "https://amaravatisolarsolutions.com/assets/hero-amaravati-exact-panoramic.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "PowerCare 5-Yr Solar Care & Maintenance" },
      {
        name: "twitter:description",
        content:
          "Protect your rooftop solar investment with Amaravati Solar Solutions' 5-year maintenance plan.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://amaravatisolarsolutions.com/powercare" },
    ],
  }),
  component: PowerCarePage,
});

const PROTOCOLS = [
  {
    id: "structural",
    title: "Structural Protocol",
    badge: "CIVIL & MECHANICAL INTEGRITY",
    badgeColor: "text-amber-300 bg-amber-400/10 border-amber-400/30",
    icon: Wrench,
    summary:
      "Rooftop solar mounting structures bear tropical storms, coastal humidity, and cyclone-grade wind loads. Our engineers inspect every anchor point and fastener.",
    checklist: [
      "RCC slab anchor pull-out test & chemical fastener torque checks",
      "Hot-dip galvanization coat thickness audit (minimum 80 microns) to prevent rust",
      "Mid-clamp and end-clamp tightening to prevent module micro-vibration",
      "Structural alignment & wind-brace tilt angle verification",
      "Roof waterproofing seal check to prevent building seepage",
    ],
  },
  {
    id: "electrical",
    title: "Electrical Protocol",
    badge: "GENERATION & FIRE SAFETY",
    badgeColor: "text-sky-300 bg-sky-400/10 border-sky-400/30",
    icon: PlugZap,
    summary:
      "Electrical health directly dictates daily kWh output and premises safety. We employ infrared thermal cameras and multi-string analyzers.",
    checklist: [
      "FLIR infrared thermography to detect micro-cracks and hot spots in solar cells",
      "String Voc (Open Circuit Voltage) and Isc (Short Circuit Current) benchmark testing",
      "Inverter conversion efficiency check, error-log diagnostics, and firmware updates",
      "Chemical earthing pit resistance measurement (strictly maintained < 2.0 Ohms)",
      "Type-II AC & DC Surge Protection Devices (SPD) and DC isolator trip calibration",
    ],
  },
  {
    id: "mechanical",
    title: "Cleaning & Maintenance",
    badge: "YIELD OPTIMIZATION",
    badgeColor: "text-emerald-300 bg-emerald-400/10 border-emerald-400/30",
    icon: HardHat,
    summary:
      "Dust and bird soiling reduce solar output by 15% to 30%. We use demineralized water and specialized solar wipers to maximize light transmission.",
    checklist: [
      "Demineralized (low-TDS) water wash preventing mineral scaling on tempered glass",
      "Soft micro-fiber anti-scratch wiper cleaning without micro-abrasions",
      "DC conduit piping and UV-resistant cable tray inspection",
      "Inverter heat sink and cooling fan dust blow-out",
      "Surrounding tree branch shading growth analysis and mitigation advice",
    ],
  },
];

const PILLARS = [
  {
    title: "Preventive Maintenance",
    desc: "Scheduled physical visits catch component wear before generation drops or safety hazards arise.",
    icon: BadgeCheck,
  },
  {
    title: "Dedicated Local Support",
    desc: "Based in Vijayawada with rapid on-site service teams covering Amaravati, Guntur, and coastal AP.",
    icon: Phone,
  },
  {
    title: "Guaranteed Peak Yield",
    desc: "Maintains optimal string generation so your system consistently reaches its projected monthly units.",
    icon: Zap,
  },
  {
    title: "48-Hour Resolution SLA",
    desc: "Prompt dispatch of senior solar engineers to diagnose and resolve inverter faults or generation shortfalls.",
    icon: Clock,
  },
  {
    title: "Full Audit Trail & Logbook",
    desc: "Documented physical service reports ensuring Tier-1 25-year manufacturer warranties stay 100% valid.",
    icon: FileCheck2,
  },
];

const FAQS = [
  {
    q: "Is PowerCare included for free with my solar system?",
    a: "Yes! Every turnkey On-Grid, Off-Grid, and Hybrid solar installation engineered and commissioned by Amaravati Solar Solutions includes full 5-Year PowerCare at zero extra charge.",
  },
  {
    q: "How often are scheduled preventive maintenance visits conducted?",
    a: "Our certified engineers conduct formal on-site health audits bi-annually, plus remote daily performance monitoring via our integrated cloud IoT platform.",
  },
  {
    q: "What is your on-site resolution turnaround time?",
    a: "We provide a strict 48-hour on-site resolution SLA across Vijayawada, Guntur, and coastal Andhra Pradesh. Critical inverter faults receive same-day priority dispatch.",
  },
  {
    q: "What happens after the initial 5-year PowerCare period ends?",
    a: "After 5 years, customers can seamlessly transition to our affordable Annual Maintenance Contracts (AMC) to keep their system protected for its entire 25+ year lifespan.",
  },
];

function PowerCarePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    return setupParallaxAndPopAnimation();
  }, []);

  return (
    <div className="bg-transparent pb-16 relative">
      {/* 1. TOP HEADER & BREADCRUMB */}
      <section className="bg-[#082B4C] text-white border-b border-[#0d3b66] pt-4 pb-8 sm:pb-12 relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 size-96 rounded-full bg-gradient-to-br from-[#E04F16]/25 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 size-80 rounded-full bg-gradient-to-tr from-[#0756B9]/25 to-transparent blur-3xl pointer-events-none" />

        <div className="container-site relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white/80 hover:text-amber-300 transition-colors"
            >
              <ArrowLeft className="size-3.5 text-amber-300" /> Back to Home
            </Link>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-black text-amber-300 uppercase tracking-wider border border-white/15">
              <ShieldCheck className="size-3.5" /> 5-YEAR COMPREHENSIVE SOLAR HEALTH
            </div>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              PowerCare <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-[#E04F16]">5-Yr Solar Care</span>
            </h1>
            <p className="mt-3 text-xs sm:text-sm md:text-base text-white/85 leading-relaxed">
              More than routine maintenance. PowerCare is our long-term engineering commitment to keeping your solar investment performing at peak efficiency, year after year.
            </p>
          </div>

          {/* 4 Metric Badges */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md text-left">
              <div className="text-[10px] sm:text-[11px] font-bold text-amber-300 uppercase tracking-wider">Warranty Shield</div>
              <div className="mt-0.5 text-base sm:text-xl font-black text-white">5 Years Free</div>
              <div className="text-[10px] text-white/70 mt-0.5">With all installations</div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md text-left">
              <div className="text-[10px] sm:text-[11px] font-bold text-amber-300 uppercase tracking-wider">Resolution SLA</div>
              <div className="mt-0.5 text-base sm:text-xl font-black text-white">48 Hours</div>
              <div className="text-[10px] text-white/70 mt-0.5">On-site technical dispatch</div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md text-left">
              <div className="text-[10px] sm:text-[11px] font-bold text-amber-300 uppercase tracking-wider">Thermal Imaging</div>
              <div className="mt-0.5 text-base sm:text-xl font-black text-white">FLIR Certified</div>
              <div className="text-[10px] text-white/70 mt-0.5">Hot-spot detection</div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md text-left">
              <div className="text-[10px] sm:text-[11px] font-bold text-amber-300 uppercase tracking-wider">Earthing Check</div>
              <div className="mt-0.5 text-base sm:text-xl font-black text-white">&lt; 2.0 Ohms</div>
              <div className="text-[10px] text-white/70 mt-0.5">Strict safety tolerance</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 3 CORE INSPECTION PROTOCOLS */}
      <section className="container-site pt-8 sm:pt-12">
        <div className="text-left mb-6 sm:mb-8">
          <span className="inline-block text-[11px] font-black uppercase tracking-wider text-[#E04F16] bg-[#E04F16]/10 px-3 py-1 rounded-full">
            TRIPLE-TIER ASSURANCE
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-black text-[#082B4C] tracking-tight">
            The 3 Core PowerCare Engineering Protocols
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            A solar power system is an active electrical power plant on your roof. PowerCare covers all three critical dimensions — Structural, Electrical, and Mechanical — so nothing is left to chance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PROTOCOLS.map((proto) => {
            const Icon = proto.icon;
            return (
              <div
                key={proto.id}
                className="rounded-3xl border border-orange-200/85 bg-white/90 backdrop-blur-sm p-6 shadow-md hover:shadow-xl hover:border-orange-400 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${proto.badgeColor}`}>
                      {proto.badge}
                    </span>
                    <div className="grid size-9 place-items-center rounded-xl bg-slate-50 text-[#082B4C] border border-slate-200 shadow-2xs">
                      <Icon className="size-4" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-[#082B4C] tracking-tight">
                    {proto.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {proto.summary}
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-500 mb-2.5">
                      Standard Inspection Checklist:
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-700 font-medium">
                      {proto.checklist.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. ENGINEER SPOTLIGHT BANNER */}
      <section className="container-site pt-12">
        <div className="rounded-3xl border border-orange-200/90 bg-white overflow-hidden shadow-lg flex flex-col lg:flex-row items-stretch">
          <div className="w-full lg:w-5/12 relative min-h-[300px] sm:min-h-[360px] lg:min-h-[440px] bg-slate-900 group shrink-0 overflow-hidden">
            <img
              src={step2Inspection}
              alt="Certified solar engineer performing PowerCare rooftop inspection"
              width={800}
              height={550}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#082B4C]/85 via-[#082B4C]/25 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#082B4C]/95 border border-white/20 text-white backdrop-blur z-10 shadow-lg">
              <span className="text-[10px] font-black uppercase text-amber-300">Certified Solar Field Engineers</span>
              <p className="text-xs font-bold leading-tight mt-0.5">Equipped with calibrated FLIR thermal sensors &amp; earth testers.</p>
            </div>
          </div>

          <div className="w-full lg:w-7/12 p-6 sm:p-8 lg:p-10 space-y-4 text-left flex flex-col justify-center">
            <span className="inline-block text-[11px] font-black uppercase tracking-wider text-[#E04F16] bg-[#E04F16]/10 px-3 py-1 rounded-full w-fit">
              WHY POWERCARE MATTERS
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#082B4C] tracking-tight leading-tight">
              A Dirty or Neglected Solar System Loses Up to 30% Generation Every Month
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-left md:text-justify">
              In coastal and agricultural regions like Vijayawada, Krishna, and Guntur, dust accumulation, red soil blown by winds, and high ambient temperatures create unseen hotspot resistance in solar strings. Without scheduled PowerCare audits, customers often discover generation losses only when their utility bill spikes.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-left md:text-justify">
              With Amaravati Solar PowerCare, you enjoy peace of mind knowing that certified local solar engineers are monitoring and servicing your setup bi-annually.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button asChild size="default" className="rounded-full bg-gradient-to-r from-[#D9410E] via-[#E04F16] to-[#F97316] hover:from-[#C03507] hover:to-[#D9410E] text-white font-bold text-xs shadow-md">
                <Link to="/book-a-demo">Schedule Free Solar Health Check</Link>
              </Button>
              <a
                href="tel:+916305825402"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#082B4C] hover:text-[#E04F16] transition-colors"
              >
                <Phone className="size-3.5 text-[#E04F16]" />
                <span>Call Care Helpline: +91 63058 25402</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 5 VALUE PILLARS */}
      <section className="container-site pt-12">
        <div className="text-left mb-6 sm:mb-8">
          <span className="inline-block text-[11px] font-black uppercase tracking-wider text-[#E04F16] bg-[#E04F16]/10 px-3 py-1 rounded-full">
            CORE PRINCIPLES
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-black text-[#082B4C] tracking-tight">
            5 Guiding Pillars of PowerCare
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {PILLARS.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs hover:shadow-md transition-shadow text-left flex flex-col justify-between"
              >
                <div>
                  <div className="grid size-9 place-items-center rounded-xl bg-orange-50 text-[#E04F16] mb-3">
                    <Icon className="size-4" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-black text-[#082B4C] leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-[11px] text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      <section className="container-site pt-12 sm:pt-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-md">
          <div className="max-w-2xl mb-6">
            <span className="inline-block text-[11px] font-black uppercase tracking-wider text-[#E04F16] bg-[#E04F16]/10 px-3 py-1 rounded-full">
              GOT QUESTIONS?
            </span>
            <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-black text-[#082B4C] tracking-tight">
              Frequently Asked Questions About PowerCare
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {FAQS.map((faq, fIdx) => (
              <div key={fIdx} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 sm:p-5 text-left">
                <div className="flex items-start gap-2.5">
                  <HelpCircle className="size-4 text-[#E04F16] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs sm:text-sm font-black text-[#082B4C] leading-snug">{faq.q}</h3>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM ACTION CTA */}
      <section className="container-site pt-12">
        <div className="rounded-3xl bg-gradient-to-r from-[#B83A16] via-[#D9410E] to-[#E04F16] p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <p className="text-xs font-black uppercase tracking-wider text-amber-200">
              Complete Care • Reliable Power • Greener Tomorrow
            </p>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
              Schedule Your Free Solar System Inspection
            </h3>
            <p className="text-xs sm:text-sm text-white/90">
              Already have solar installed or planning a new installation? Talk directly with our technical lead.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button asChild size="lg" className="rounded-full bg-white text-[#082B4C] hover:bg-slate-100 font-black text-xs sm:text-sm shadow-md h-11 px-6 active:scale-95 transition-all">
              <Link to="/book-a-demo">Book Free Inspection</Link>
            </Button>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-black/20 hover:bg-black/30 border border-white/30 px-5 h-11 text-xs sm:text-sm font-bold text-white transition-all active:scale-95"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

