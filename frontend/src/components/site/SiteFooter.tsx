import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Zap,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { COMPANY } from "@/lib/site-data";

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    badgeClass: "bg-[#1877F2] text-white hover:brightness-110 shadow-sm hover:shadow-[#1877F2]/40",
    icon: (props: { className?: string }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
        <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.52-.14-2.71-.14-2.7 0-4.79 1.64-4.79 4.75V9.5H7v4h3V22h4v-8.5z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    badgeClass: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white hover:brightness-110 shadow-sm hover:shadow-[#dc2743]/40",
    icon: (props: { className?: string }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com",
    badgeClass: "bg-black text-white border border-white/20 hover:brightness-125 shadow-sm",
    icon: (props: { className?: string }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    badgeClass: "bg-[#0A66C2] text-white hover:brightness-110 shadow-sm hover:shadow-[#0A66C2]/40",
    icon: (props: { className?: string }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    badgeClass: "bg-[#FF0000] text-white hover:brightness-110 shadow-sm hover:shadow-[#FF0000]/40",
    icon: (props: { className?: string }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  return (
    <footer className="relative bg-[#051829] text-slate-300 overflow-hidden">
      {/* Top Accent Line — Direct Clean Orange */}
      <div className="h-1 w-full bg-[#E04F16]" />

      {/* Subtle Background Radial Ambient Glows */}
      <div className="absolute top-0 right-1/4 -mt-32 size-96 rounded-full bg-[#E04F16]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -mb-32 size-80 rounded-full bg-[#0756B9]/15 blur-3xl pointer-events-none" />

      {/* Main 4-Column Footer Grid — Compact & Tight Spacing (No Unwanted Gaps) */}
      <div className="container-site relative pt-7 sm:pt-9 pb-5 sm:pb-6 grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-12 items-start">
        {/* Col 1: Brand Info & Trust (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <Link to="/" onClick={scrollToTop} className="inline-block rounded-2xl bg-white p-2.5 shadow-md hover:opacity-95 transition-opacity">
            <img
              src={logo}
              alt="Amaravati Solar Solutions"
              width={1016}
              height={307}
              loading="lazy"
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </Link>

          <p className="text-xs sm:text-[13px] leading-relaxed text-slate-300 max-w-sm">
            Smart, reliable, and sustainable solar energy solutions for residential, commercial, and industrial installations across Andhra Pradesh &amp; Telangana.
          </p>

          {/* Trust Badges Pill Row */}
          <div className="space-y-1.5 pt-0.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-white/90">
              <ShieldCheck className="size-4 text-emerald-400 shrink-0" />
              <span>PM Surya Ghar Govt Subsidy (Up to ₹78,000)</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-white/90">
              <Zap className="size-4 text-[#E04F16] shrink-0" />
              <span>AP Discom Net-Metering Fast-Track Approval</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-white/90">
              <CheckCircle2 className="size-4 text-sky-400 shrink-0" />
              <span>Tier-1 Solar Panels with 25-Year Linear Warranty</span>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="pt-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Connect With Us
            </span>
            <div className="flex items-center gap-2.5">
              {SOCIAL_LINKS.map(({ name, href, badgeClass, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${name} page`}
                  className={`grid size-8 place-items-center rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 ${badgeClass}`}
                >
                  <Icon className="size-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Col 2: Solar Solutions (3 cols) */}
        <div className="lg:col-span-3 space-y-2.5">
          <div className="flex items-center gap-2 pb-1.5 border-b border-white/10">
            <div className="h-4 w-1 rounded-full bg-[#E04F16]" />
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">Solar Solutions</h4>
          </div>

          <ul className="space-y-2 text-xs sm:text-[13px]">
            <li>
              <Link
                to="/services/on-grid-solar-systems"
                onClick={scrollToTop}
                className="hover:text-[#E04F16] transition-colors block"
              >
                On-Grid Rooftop Solar
              </Link>
            </li>
            <li>
              <Link
                to="/services/off-grid-solar-systems"
                onClick={scrollToTop}
                className="hover:text-[#E04F16] transition-colors block"
              >
                Off-Grid Solar Systems
              </Link>
            </li>
            <li>
              <Link
                to="/services/hybrid-solar-systems"
                onClick={scrollToTop}
                className="hover:text-[#E04F16] transition-colors block"
              >
                Hybrid Solar Solutions
              </Link>
            </li>
            <li>
              <Link
                to="/solar-solutions"
                onClick={scrollToTop}
                className="hover:text-[#E04F16] transition-colors block text-white font-semibold"
              >
                All Solar Solutions Overview
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                search={{ category: "residential" } as any}
                onClick={scrollToTop}
                className="hover:text-[#E04F16] transition-colors block"
              >
                Residential Rooftop Solar
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                search={{ category: "commercial" } as any}
                onClick={scrollToTop}
                className="hover:text-[#E04F16] transition-colors block"
              >
                Commercial &amp; Industrial Solar
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                search={{ category: "industrial" } as any}
                onClick={scrollToTop}
                className="hover:text-[#E04F16] transition-colors block"
              >
                Agricultural Solar Water Pumps
              </Link>
            </li>
            <li className="pt-1.5 border-t border-white/10">
              <Link
                to="/services"
                search={{ category: undefined } as any}
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("reset-services-view"));
                  scrollToTop();
                }}
                className="font-bold text-white hover:text-[#E04F16] transition-colors flex items-center gap-1.5"
              >
                <span>Explore All 15 Services</span>
                <ArrowRight className="size-3.5 text-[#E04F16]" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Company & Trust Commitments (2 cols) */}
        <div className="lg:col-span-2 space-y-2.5">
          <div className="flex items-center gap-2 pb-1.5 border-b border-white/10">
            <div className="h-4 w-1 rounded-full bg-[#E04F16]" />
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">Company</h4>
          </div>

          <ul className="space-y-2 text-xs sm:text-[13px]">
            <li>
              <Link
                to="/about"
                onClick={scrollToTop}
                className="hover:text-[#E04F16] transition-colors cursor-pointer block"
              >
                About Our Company
              </Link>
            </li>
            <li>
              <Link
                to="/process"
                onClick={scrollToTop}
                className="hover:text-[#E04F16] transition-colors cursor-pointer block"
              >
                Our 7-Step Process
              </Link>
            </li>
            <li>
              <Link
                to="/powercare"
                onClick={scrollToTop}
                className="hover:text-[#E04F16] transition-colors flex items-center gap-1.5 cursor-pointer text-white font-bold"
              >
                <ShieldCheck className="size-3.5 text-amber-400" />
                <span>PowerCare (5-Yr Care)</span>
              </Link>
            </li>
            <li>
              <Link
                to="/one-point-of-contact"
                onClick={scrollToTop}
                className="hover:text-[#E04F16] transition-colors cursor-pointer block"
              >
                One Point of Contact
              </Link>
            </li>
            <li>
              <Link
                to="/power-back-promise"
                onClick={scrollToTop}
                className="hover:text-[#E04F16] transition-colors cursor-pointer block"
              >
                Power Sure
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                onClick={scrollToTop}
                className="hover:text-[#E04F16] transition-colors block"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                to="/book-a-demo"
                onClick={scrollToTop}
                className="hover:text-[#E04F16] transition-colors font-bold text-white block"
              >
                Request Quick Quote
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Regional Office & Support (3 cols) */}
        <div className="lg:col-span-3 space-y-2.5">
          <div className="flex items-center gap-2 pb-1.5 border-b border-white/10">
            <div className="h-4 w-1 rounded-full bg-[#E04F16]" />
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">Contact &amp; Support</h4>
          </div>

          <div className="space-y-2.5 text-xs sm:text-[13px]">
            {/* Phone */}
            <div className="flex items-start gap-2.5">
              <div className="grid size-6.5 shrink-0 place-items-center rounded-lg bg-[#E04F16]/15 text-[#E04F16] border border-[#E04F16]/30 mt-0.5">
                <Phone className="size-3.5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Phone Support (24/7)</span>
                <a
                  href={`tel:${COMPANY.phone.replace(/[^0-9+]/g, "")}`}
                  className="font-bold text-white hover:text-[#E04F16] transition-colors text-sm"
                >
                  {COMPANY.phone}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-2.5">
              <div className="grid size-6.5 shrink-0 place-items-center rounded-lg bg-[#E04F16]/15 text-[#E04F16] border border-[#E04F16]/30 mt-0.5">
                <Mail className="size-3.5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Direct Email</span>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="font-medium text-white/90 hover:text-[#E04F16] transition-colors block truncate"
                >
                  {COMPANY.email}
                </a>
              </div>
            </div>

            {/* Office Address */}
            <div className="flex items-start gap-2.5">
              <div className="grid size-6.5 shrink-0 place-items-center rounded-lg bg-[#E04F16]/15 text-[#E04F16] border border-[#E04F16]/30 mt-0.5">
                <MapPin className="size-3.5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Regional Office</span>
                <span className="text-slate-300 leading-relaxed block text-xs">
                  {COMPANY.address}
                </span>
              </div>
            </div>

            {/* Operational Hours */}
            <div className="flex items-start gap-2.5">
              <div className="grid size-6.5 shrink-0 place-items-center rounded-lg bg-[#E04F16]/15 text-[#E04F16] border border-[#E04F16]/30 mt-0.5">
                <Clock className="size-3.5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Operational Hours</span>
                <span className="text-slate-300 text-xs block">
                  Mon – Sat: 10:00 AM – 7:00 PM
                </span>
              </div>
            </div>

            {/* Quick Contact CTA */}
            <div className="pt-1">
              <Link
                to="/contact"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#E04F16] transition-colors group"
              >
                <span>Send Enquiry or Visit Us</span>
                <ArrowRight className="size-3.5 text-[#E04F16] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Back-to-Top — Compact py-3 */}
      <div className="border-t border-white/10 bg-black/40 py-3 sm:py-3.5">
        <div className="container-site flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Amaravati Solar Solutions. All rights reserved.</p>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="text-white/60">Engineered with Clean Energy for Andhra Pradesh &amp; Telangana</span>
          </div>

          <div className="flex items-center gap-5">
            <Link to="/privacy" onClick={scrollToTop} className="hover:text-[#E04F16] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" onClick={scrollToTop} className="hover:text-[#E04F16] transition-colors">
              Terms of Service
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="grid size-7.5 place-items-center rounded-lg bg-white/10 hover:bg-[#E04F16] text-white transition-colors cursor-pointer ml-1"
              aria-label="Scroll back to top"
              title="Back to top"
            >
              <ArrowUp className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
