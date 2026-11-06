import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  CheckCircle2,
  Clock,
  ExternalLink,
  HelpCircle,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { SolarCalculator } from "@/components/site/SolarCalculator";
import { COMPANY } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us & Solar Consultation — Amaravati Solar Solutions" },
      {
        name: "description",
        content:
          "Connect with certified solar engineers at Amaravati Solar Solutions in Vijayawada. Book a free rooftop site survey, calculate solar ROI, and apply for PM Surya Ghar subsidies.",
      },
      { property: "og:title", content: "Contact Us & Solar Consultation — Amaravati Solar Solutions" },
      {
        property: "og:description",
        content:
          "Talk to our engineering team in Vijayawada. Free rooftop site audit, 3D shadow analysis, and subsidy assistance across Andhra Pradesh and Telangana.",
      },
    ],
  }),
  component: ContactPage,
});

const CONTACT_FAQS = [
  {
    q: "How quickly will an engineer respond after I submit an enquiry?",
    a: "Our Vijayawada technical desk reviews incoming requests within 2 to 4 business hours. If you need immediate assistance, call us directly at +91 79896 41899 or WhatsApp us.",
  },
  {
    q: "Is the rooftop site survey and feasibility report really free?",
    a: "Yes, 100% complimentary with zero obligation. Our engineer visits your site anywhere in Vijayawada, Guntur, Amaravati, and surrounding AP/Telangana regions to measure shadow-free area and load feasibility.",
  },
  {
    q: "Can you help me choose the right system capacity from my latest power bill?",
    a: "Absolutely! You can upload or WhatsApp your latest DISCOM electricity bill. Our team will calculate your average monthly unit consumption and recommend the exact kW system needed.",
  },
  {
    q: "How does the PM Surya Ghar subsidy disbursement work?",
    a: "We register your project on the national portal, secure DISCOM technical feasibility, complete certified installation, and coordinate net-meter commissioning so your ₹78,000 DBT subsidy is directly credited to your bank account.",
  },
];

function ContactPage() {
  const [initialService, setInitialService] = useState<string>("");
  const [initialMessage, setInitialMessage] = useState<string>("");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const handleApplyPlan = (plan: {
    bill: number;
    location: string;
    load: string;
    propertyType: string;
    systemKw: number;
    monthlySavings: number;
    subsidy: number;
  }) => {
    let serviceCategory = "Residential";
    if (plan.propertyType.includes("Commercial")) serviceCategory = "Commercial";
    else if (plan.propertyType.includes("Industrial")) serviceCategory = "Industrial";

    setInitialService(serviceCategory);
    setInitialMessage(
      `Interested in a ${plan.systemKw} kW ${serviceCategory} Solar System for monthly bill of ₹${plan.bill.toLocaleString("en-IN")} in ${plan.location} (Sanctioned Load: ${plan.load}). Estimated subsidy: ₹${plan.subsidy.toLocaleString("en-IN")}.`
    );

    const el = document.getElementById("enquiry-form-card");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const cleanPhone = COMPANY.phone.replace(/[^0-9+]/g, "");
  const cleanWhatsapp = COMPANY.whatsapp.replace(/[^0-9]/g, "");

  return (
    <div className="bg-slate-50/60 pb-16 space-y-8 sm:space-y-10">
      {/* 1. HERO HEADER (Pixel-perfect alignment with Header Logo) */}
      <section className="bg-white border-b border-orange-100/80 pt-3 pb-5 sm:pb-6">
        <div className="container-site">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#082B4C] hover:text-[#B83A16] transition-colors"
            >
              <ArrowLeft className="size-3.5 text-[#B83A16]" /> Back to Home
            </Link>

            <div className="inline-flex items-center gap-1 rounded-full bg-[#B83A16]/10 px-3 py-0.5 text-[11px] font-bold text-[#B83A16]">
              <Sparkles className="size-3 text-[#B83A16]" /> DIRECT TECHNICAL &amp; SALES CONSULTATION
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#082B4C] tracking-tight">
            Contact Our Solar Engineers
          </h1>
          <p className="mt-1.5 text-sm sm:text-base font-bold text-[#B83A16] leading-snug">
            We're here to help you cut electricity costs and achieve clean energy independence.
          </p>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Whether you want to cut your home electricity bill by 90%, enquire about the PM Surya Ghar ₹78,000 subsidy, or engineer an industrial rooftop plant — our Vijayawada team is ready to assist.
          </p>
        </div>
      </section>

      {/* 2. 3 DIRECT QUICK-CONNECT INTERACTIVE CARDS */}
      <section className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* Card 1: Phone Support */}
          <div className="rounded-none border border-orange-200/90 bg-gradient-to-br from-[#FFFDF9] via-white to-[#FFF5EA] p-5 shadow-2xs hover:shadow-md hover:border-[#B83A16]/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="size-11 rounded-none bg-[#B83A16] text-white flex items-center justify-center shadow-xs">
                  <PhoneCall className="size-5" />
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-none border border-emerald-300/60">
                  <span className="size-1.5 rounded-full bg-emerald-600 animate-pulse" /> Line Active
                </span>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Direct Engineering Helpline
              </span>
              <h2 className="text-lg font-black text-[#082B4C] mt-0.5 group-hover:text-[#B83A16] transition-colors">
                +91 79896 41899
              </h2>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                Speak directly with an experienced rooftop solar engineer for fast technical advice and quotes.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-orange-100/80">
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-bold text-white bg-[#B83A16] hover:bg-[#A33112] transition-colors shadow-xs"
              >
                <Phone className="size-3.5" /> Call Now: +91 79896 41899
              </a>
            </div>
          </div>

          {/* Card 2: WhatsApp Chat */}
          <div className="rounded-none border border-emerald-200/90 bg-gradient-to-br from-[#F7FCF9] via-white to-[#EDFAF1] p-5 shadow-2xs hover:shadow-md hover:border-emerald-500/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="size-11 rounded-none bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <MessageCircle className="size-5" />
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-none border border-emerald-300/60">
                  <span className="size-1.5 rounded-full bg-emerald-600 animate-ping" /> &lt; 15 Min Reply
                </span>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Instant WhatsApp Chat
              </span>
              <h2 className="text-lg font-black text-[#082B4C] mt-0.5 group-hover:text-emerald-700 transition-colors">
                WhatsApp Consultation
              </h2>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                Send a photo of your latest electricity bill or rooftop to get an instant capacity estimation.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-100/80">
              <a
                href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                  "Hello Amaravati Solar Solutions, I want to enquire about rooftop solar installation for my property."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs"
              >
                <MessageCircle className="size-3.5" /> Chat On WhatsApp
              </a>
            </div>
          </div>

          {/* Card 3: Experience Center / Office Visit */}
          <div className="rounded-none border border-orange-200/90 bg-gradient-to-br from-[#FFFDF9] via-white to-[#FFF5EA] p-5 shadow-2xs hover:shadow-md hover:border-[#082B4C]/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="size-11 rounded-none bg-[#082B4C] text-white flex items-center justify-center shadow-xs">
                  <MapPin className="size-5" />
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded-none border border-slate-200">
                  📍 Vijayawada HQ
                </span>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Headquarters &amp; Hub
              </span>
              <h2 className="text-lg font-black text-[#082B4C] mt-0.5">
                Electricity Colony, 9th Line
              </h2>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                Walk in for an in-person demonstration of Tier-1 solar panels, inverters, and mounting structures.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-orange-100/80">
              <a
                href={COMPANY.headquarters.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-bold text-[#082B4C] bg-white border border-slate-300 hover:border-[#082B4C] hover:text-primary transition-colors shadow-2xs"
              >
                <ExternalLink className="size-3.5" /> Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONSULTATION FORM & HEADQUARTERS HUB (2-COLUMN GRID) */}
      <section id="enquiry-section" className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Premium Enquiry Form (7 cols) */}
          <div
            id="enquiry-form-card"
            className="lg:col-span-7 rounded-none border border-orange-200/90 bg-white p-5 sm:p-7 md:p-8 shadow-[0_4px_16px_rgba(224,79,22,0.06)] scroll-mt-24"
          >
            {/* Form Header */}
            <div className="pb-4 mb-4 border-b border-orange-100 flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-[#B83A16] bg-[#B83A16]/10 px-2.5 py-0.5 mb-1.5">
                  <Zap className="size-3" /> FAST-TRACK CONSULTATION
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#082B4C] tracking-tight">
                  Request A Complimentary Site Survey
                </h2>
                <p className="mt-1 text-xs text-slate-600">
                  Fill in your details below and a certified solar engineer will contact you within 24 hours.
                </p>
              </div>

              <a
                href="#solar-calculator-section"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B83A16] hover:text-[#A33112] hover:underline bg-[#FFF5EA] border border-orange-200/80 px-3 py-1.5 shadow-2xs cursor-pointer"
              >
                <Calculator className="size-3.5" />
                <span>Calculate Solar Plan ↓</span>
              </a>
            </div>

            {/* The Interactive Form */}
            <EnquiryForm initialService={initialService} initialMessage={initialMessage} />

            {/* Security & Spam Guarantee */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
              <span>
                <strong>100% Privacy Guarantee:</strong> Your information is strictly used for engineering consultation. No aggressive sales calls or third-party sharing.
              </span>
            </div>
          </div>

          {/* Right Column: Office Operations, Map & Guarantees (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Office Card with Details */}
            <div className="rounded-none border border-orange-200/90 bg-gradient-to-br from-[#FFFDF9] via-white to-[#FFF5EA] p-5 sm:p-6 shadow-[0_4px_16px_rgba(224,79,22,0.06)]">
              <div className="pb-3 mb-3 border-b border-orange-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#B83A16] block">
                  Regional Operations
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#082B4C]">
                  Corporate Headquarters &amp; Experience Center
                </h3>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-[13px]">
                <li className="flex items-start gap-3">
                  <div className="size-8 rounded-none bg-[#082B4C] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="size-4 text-amber-300" />
                  </div>
                  <div>
                    <span className="font-extrabold text-[#082B4C] block">Head Office Address</span>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">
                      {COMPANY.headquarters.company}<br />
                      {COMPANY.headquarters.address}
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="size-8 rounded-none bg-[#082B4C] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="size-4 text-amber-300" />
                  </div>
                  <div>
                    <span className="font-extrabold text-[#082B4C] block">Email Support</span>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-slate-600 hover:text-[#B83A16] transition-colors mt-0.5 block break-all font-medium"
                    >
                      {COMPANY.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="size-8 rounded-none bg-[#082B4C] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="size-4 text-amber-300" />
                  </div>
                  <div>
                    <span className="font-extrabold text-[#082B4C] block">Operating Hours</span>
                    <p className="text-slate-600 mt-0.5 leading-relaxed font-medium">
                      {COMPANY.operationalHours.weekdays}<br />
                      <span className="text-amber-700 font-bold">{COMPANY.operationalHours.sunday}</span>
                    </p>
                  </div>
                </li>
              </ul>

              {/* Single Large Interactive Map Embed */}
              <div className="mt-4 pt-4 border-t border-orange-100">
                <div className="h-48 sm:h-52 w-full rounded-none overflow-hidden border border-orange-200/80 shadow-inner">
                  <iframe
                    title="Amaravati Solar Solutions Headquarters Map"
                    src={COMPANY.headquarters.mapEmbed}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            {/* Why Contact Us? 4 Promises Box */}
            <div className="rounded-none border border-orange-200/90 bg-white p-5 shadow-2xs">
              <h4 className="text-sm font-black text-[#082B4C] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-[#B83A16]" /> What You Can Expect From Us
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-[#B83A16] shrink-0 mt-0.5" />
                  <span><strong>Zero Pressure Site Audit:</strong> Transparent advice with no pushy sales tactics.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-[#B83A16] shrink-0 mt-0.5" />
                  <span><strong>3D CAD Shadow Analysis:</strong> Maximize power generation per square foot.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-[#B83A16] shrink-0 mt-0.5" />
                  <span><strong>Subsidy Assured:</strong> Direct DBT handling for up to ₹78,000 central government grant.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-[#B83A16] shrink-0 mt-0.5" />
                  <span><strong>Performance Backed:</strong> 25-Year panel warranty &amp; 5-Year PowerCare maintenance.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SOLAR CALCULATOR SECTION (Positioned Below) */}
      <section id="solar-calculator-section" className="container-site scroll-mt-24">
        <div className="mb-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#B83A16]/10 px-3 py-0.5 text-[11px] font-bold text-[#B83A16] uppercase tracking-wider mb-1">
            <Calculator className="size-3 text-[#B83A16]" /> Instant System Sizing &amp; Financial ROI
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#082B4C] tracking-tight">
            Calculate Your Solar Potential &amp; Estimated Subsidy
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Slide your average monthly electricity bill to calculate the required kW capacity, rooftop area, and 25-year financial savings.
          </p>
        </div>

        <SolarCalculator onApplyPlan={handleApplyPlan} />
      </section>

      {/* 5. CONTACT & CONSULTATION FAQS */}
      <section className="container-site">
        <div className="rounded-none border border-orange-200/90 bg-white p-5 sm:p-7 shadow-[0_4px_16px_rgba(224,79,22,0.06)]">
          <div className="mb-5 pb-3 border-b border-orange-100 flex items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#B83A16] block">
                Frequently Asked Questions
              </span>
              <h3 className="text-lg sm:text-xl font-black text-[#082B4C]">
                Got Questions Before Contacting?
              </h3>
            </div>
            <div className="grid size-9 place-items-center rounded-none bg-[#FFF5EA] text-[#B83A16]">
              <HelpCircle className="size-5" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CONTACT_FAQS.map((faq, index) => (
              <div key={index} className="rounded-none border border-slate-100 bg-slate-50/70 p-4 hover:border-orange-200 hover:bg-[#FFFDF9] transition-colors">
                <h4 className="text-xs sm:text-sm font-black text-[#082B4C] leading-snug">
                  {faq.q}
                </h4>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed text-justify [text-align-last:left]">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
