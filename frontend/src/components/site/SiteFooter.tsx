import { Link, useNavigate } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { COMPANY, NAV } from "@/lib/site-data";
import { scrollToTarget } from "@/lib/scroll-utils";

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    badgeClass: "bg-[#1877F2] text-white hover:brightness-110 shadow-sm",
    icon: (props: { className?: string }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
        <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.52-.14-2.71-.14-2.7 0-4.79 1.64-4.79 4.75V9.5H7v4h3V22h4v-8.5z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    badgeClass: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white hover:brightness-110 shadow-sm",
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
    badgeClass: "bg-[#0A66C2] text-white hover:brightness-110 shadow-sm",
    icon: (props: { className?: string }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    badgeClass: "bg-[#FF0000] text-white hover:brightness-110 shadow-sm",
    icon: (props: { className?: string }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export function SiteFooter() {
  const navigate = useNavigate();

  const handleTargetClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const isHomePage = window.location.pathname === "/";
    if (isHomePage) {
      scrollToTarget(targetId);
      setTimeout(() => scrollToTarget(targetId, false, true), 150);
      setTimeout(() => scrollToTarget(targetId, false, true), 400);
    } else {
      navigate({ to: "/" }).then(() => {
        setTimeout(() => scrollToTarget(targetId, false, false), 80);
        setTimeout(() => scrollToTarget(targetId, true, true), 250);
        setTimeout(() => scrollToTarget(targetId, false, true), 600);
      });
    }
  };

  return (
    <footer className="bg-navy text-navy-foreground/80">
      <div className="container-site grid gap-6 py-8 md:py-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div>
          <div className="inline-block rounded-xl bg-white p-2.5 shadow-sm">
            <img src={logo} alt="Amaravati Solar Solutions" width={1016} height={307} loading="lazy" className="h-10 sm:h-11 w-auto object-contain" />
          </div>
          <p className="mt-3 text-xs leading-relaxed max-w-xs">
            Smart, reliable and sustainable solar energy solutions for homes, commercial complexes, and industrial installations across India.
          </p>
          <div className="mt-4 flex items-center gap-2">
            {SOCIAL_LINKS.map(({ name, href, badgeClass, icon: Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit our ${name} page`}
                className={`grid size-8 place-items-center rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-md ${badgeClass}`}
              >
                <Icon className="size-3.5 sm:size-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-navy-foreground">Quick links</h3>
          <ul className="mt-2.5 space-y-1.5 text-xs">
            {NAV.map((n) => {
              const targetId = "targetId" in n ? n.targetId : undefined;
              if (targetId && ["about", "on-grid", "off-grid", "hybrid", "home"].includes(targetId)) {
                return (
                  <li key={n.label}>
                    <a
                      href={`/#${targetId}`}
                      onClick={(e) => handleTargetClick(e, targetId)}
                      className="hover:text-gold transition-colors cursor-pointer"
                    >
                      {n.label}
                    </a>
                  </li>
                );
              }

              if (n.label === "Services") {
                return (
                  <li key={n.label}>
                    <Link
                      to="/services"
                      search={{ category: undefined } as any}
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent("reset-services-view"));
                        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                      }}
                      className="hover:text-gold transition-colors"
                    >
                      {n.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={n.label}>
                  <Link
                    to={n.to as any}
                    onClick={() => {
                      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                    }}
                    className="hover:text-gold transition-colors"
                  >
                    {n.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                to="/book-a-demo"
                onClick={() => {
                  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                }}
                className="hover:text-gold transition-colors"
              >
                Get A Quote
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-navy-foreground">Services</h3>
          <ul className="mt-2.5 space-y-2 text-xs">
            <li>
              <Link
                to="/services"
                search={{ category: "residential" } as any}
                onClick={() => {
                  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                }}
                className="hover:text-gold transition-colors"
              >
                Residential
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                search={{ category: "commercial" } as any}
                onClick={() => {
                  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                }}
                className="hover:text-gold transition-colors"
              >
                Commercial
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                search={{ category: "industrial" } as any}
                onClick={() => {
                  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                }}
                className="hover:text-gold transition-colors"
              >
                Industrial
              </Link>
            </li>
            <li className="pt-1.5 border-t border-navy-foreground/15 mt-2">
              <Link
                to="/services"
                search={{ category: undefined } as any}
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("reset-services-view"));
                  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                }}
                className="font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 text-xs cursor-pointer"
              >
                All services →
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-navy-foreground">Contact</h3>
          <ul className="mt-2.5 space-y-2 text-xs">
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-3.5 shrink-0 text-gold" />
              <a href={`tel:${COMPANY.phone.replace(/[^0-9+]/g, "")}`} className="hover:text-gold transition-colors">{COMPANY.phone}</a>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 size-3.5 shrink-0 text-gold" />
              <a href={`mailto:${COMPANY.email}`} className="hover:text-gold transition-colors truncate">{COMPANY.email}</a>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-3.5 shrink-0 text-gold" />
              <span className="line-clamp-2">{COMPANY.address}</span>
            </li>
          </ul>
          <Link to="/contact" className="mt-3 inline-block text-xs font-semibold text-gold hover:underline">Send us an enquiry →</Link>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10">
        <div className="container-site flex flex-col gap-2 py-3.5 text-[11px] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Amaravati Solar Solutions. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-gold">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gold">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
