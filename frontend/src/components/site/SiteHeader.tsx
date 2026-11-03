import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Clock, Headphones, Mail, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/logo.png";
import { COMPANY, NAV } from "@/lib/site-data";
import { scrollToTarget } from "@/lib/scroll-utils";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isContactPage = pathname === "/contact";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const isAutoScrollingRef = useRef(false);
  const scrollLockTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ScrollSpy & sticky shadow
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 25);
      if (isAutoScrollingRef.current) return;

      // Dynamic scrollspy for both desktop and mobile/tablet
      if (window.location.pathname === "/") {
        const sectionIds = ["gallery", "hybrid", "off-grid", "on-grid", "about", "home"];
        const headerEl = document.querySelector("header");
        const headerHeight = headerEl ? headerEl.offsetHeight : 90;
        const scrollPosition = window.scrollY + headerHeight + 50;

        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const top = el.offsetTop;
            if (scrollPosition >= top) {
              setActiveSection(id);
              break;
            }
          }
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle direct hash navigation on initial page load or when hash/section changes
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash) {
        const targetId = window.location.hash.replace("#", "");
        setActiveSection(targetId);
        isAutoScrollingRef.current = true;
        if (scrollLockTimerRef.current) clearTimeout(scrollLockTimerRef.current);
        scrollLockTimerRef.current = setTimeout(() => {
          isAutoScrollingRef.current = false;
        }, 1400);

        setTimeout(() => {
          scrollToTarget(targetId);
        }, 150);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);

    const onSectionScrolled = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setActiveSection(customEvent.detail);
        isAutoScrollingRef.current = true;
        if (scrollLockTimerRef.current) clearTimeout(scrollLockTimerRef.current);
        scrollLockTimerRef.current = setTimeout(() => {
          isAutoScrollingRef.current = false;
        }, 1400);
      }
    };
    window.addEventListener("section-scrolled", onSectionScrolled);

    return () => {
      window.removeEventListener("hashchange", handleHash);
      window.removeEventListener("section-scrolled", onSectionScrolled);
      if (scrollLockTimerRef.current) clearTimeout(scrollLockTimerRef.current);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent, item: (typeof NAV)[number]) => {
    const isHomePage = pathname === "/";

    if ("targetId" in item && item.targetId && ["on-grid", "off-grid", "hybrid", "home"].includes(item.targetId)) {
      e.preventDefault();
      setOpen(false);
      const targetId = item.targetId;
      setActiveSection(targetId);
      isAutoScrollingRef.current = true;
      if (scrollLockTimerRef.current) clearTimeout(scrollLockTimerRef.current);
      scrollLockTimerRef.current = setTimeout(() => {
        isAutoScrollingRef.current = false;
      }, 1400);

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
      return;
    }

    if (item.to === "/contact" || item.to === "/about" || item.to === "/projects" || item.to === "/services") {
      e.preventDefault();
      setOpen(false);
      navigate({ to: item.to });
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      return;
    }

    setOpen(false);
  };

  return (
    <>
      {/* Top Announcement Bar - Single Line & Compact Size (Non-sticky, scrolls with page, hidden on /contact) */}
      {!isContactPage && (
        <div className="bg-[#082B4C] text-white py-0.5 sm:py-1 border-b border-white/10 transition-all duration-300">
          <div className="container-site px-2 sm:px-6 flex items-center justify-center lg:justify-between gap-2 sm:gap-3 overflow-hidden">
            {/* Left: Email & Phone Support in Single Line */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-3 shrink-0 whitespace-nowrap text-[9px] min-[360px]:text-[10px] sm:text-xs">
              <a
                href="mailto:amaravatisolarsolutions@gmail.com"
                className="flex items-center gap-1 text-white/90 hover:text-gold transition-colors"
              >
                <Mail className="size-2.5 sm:size-3 text-gold shrink-0" />
                <span>amaravatisolarsolutions@gmail.com</span>
              </a>
              <span className="text-white/30 text-[8px] sm:text-xs">|</span>
              <a
                href="tel:+917989641899"
                className="flex items-center gap-1 text-white/90 hover:text-gold transition-colors"
              >
                <Phone className="size-2.5 sm:size-3 text-gold shrink-0" />
                <span>+91 79896 41899</span>
              </a>
            </div>

            {/* Right: Operational Hours & Social Icons */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-white/85">
                <Clock className="size-3.5 text-gold shrink-0" />
                <span>Mon - Sat: 10:00 AM - 7:00 PM</span>
              </div>
              <span className="text-white/30">|</span>
              <span className="text-white/85">Sunday - Holiday</span>
              <span className="text-white/30">|</span>
              <div className="flex items-center gap-2">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid size-6 place-items-center rounded-full bg-[#1877F2] text-white hover:scale-110 transition-transform">
                  <svg className="size-3 fill-current" viewBox="0 0 24 24"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.52-.14-2.71-.14-2.7 0-4.79 1.64-4.79 4.75V9.5H7v4h3V22h4v-8.5z" /></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-6 place-items-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white hover:scale-110 transition-transform">
                  <svg className="size-3 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="grid size-6 place-items-center rounded-full bg-black text-white border border-white/30 hover:scale-110 transition-transform">
                  <svg className="size-2.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid size-6 place-items-center rounded-full bg-[#0A66C2] text-white hover:scale-110 transition-transform">
                  <svg className="size-3 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="grid size-6 place-items-center rounded-full bg-[#FF0000] text-white hover:scale-110 transition-transform">
                  <svg className="size-3 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Header - Sticky Top */}
      <header
        className={cn(
          "sticky top-0 z-50 bg-white transition-all duration-200",
          scrolled ? "shadow-md border-b border-slate-200/80" : "border-b border-slate-100"
        )}
      >
        <div className="container-site flex h-20 items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActiveSection("home");
            }
            setOpen(false);
          }}
          className="flex shrink-0 items-center py-2 transition-transform hover:opacity-95"
          aria-label="Amaravati Solar Solutions home"
        >
          <img
            src={logo}
            alt="Amaravati Solar Solutions"
            width={1016}
            height={307}
            className="h-9 sm:h-10 md:h-11 xl:h-12 w-auto object-contain transition-transform"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2.5 xl:gap-5 lg:flex">
          <nav className="flex items-center gap-0.5 xl:gap-1" aria-label="Main">
            {NAV.map((item) => {
              const isActive = pathname === "/"
                ? ("targetId" in item && item.targetId ? activeSection === item.targetId : false)
                : (item.to === pathname || (item.to !== "/" && pathname.startsWith(item.to)));
              return (
                <div key={item.label} className="flex items-center gap-0.5 xl:gap-1">
                  <a
                    href={item.to}
                    onClick={(e) => handleNavClick(e, item)}
                    className={cn(
                      "relative px-2.5 xl:px-3.5 py-1.5 rounded-full text-[13px] xl:text-[14px] font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-1.5",
                      isActive
                        ? "bg-primary/10 text-primary font-bold border border-primary/25 shadow-sm"
                        : "text-[#0c2340] hover:text-primary hover:bg-slate-100/80"
                    )}
                  >
                    {isActive && (
                      <span className="size-1.5 rounded-full bg-primary animate-pulse shrink-0" />
                    )}
                    <span>{item.label}</span>
                  </a>

                  {item.label === "Gallery" && (
                    <div className="flex items-center gap-1.5 border-l border-slate-300 pl-2.5 xl:pl-3.5 ml-1">
                      <a
                        href={`tel:${COMPANY.phone.replace(/[^0-9+]/g, "")}`}
                        className="flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-full text-[13px] xl:text-[14px] font-bold text-[#082B4C] hover:text-[#087FC1] hover:bg-sky-50 transition-colors whitespace-nowrap"
                      >
                        <Headphones className="size-3.5 xl:size-4 text-[#087FC1]" />
                        <span>24/7 Support</span>
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA Button: Get A Quote */}
          <Link
            to="/book-a-demo"
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 xl:px-5 py-2 text-xs xl:text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0"
          >
            Get A Quote
          </Link>
        </div>

        {/* Mobile menu toggle button */}
        <button
          type="button"
          className="grid size-10 place-items-center rounded-lg text-[#0c2340] lg:hidden hover:bg-slate-100 active:scale-90 transition-all cursor-pointer"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-6 transition-transform rotate-90 duration-200" /> : <Menu className="size-6 transition-transform duration-200" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "grid overflow-hidden border-t bg-white transition-[grid-template-rows] duration-300 lg:hidden shadow-lg",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-transparent"
        )}
      >
        <nav className="min-h-0" aria-label="Mobile">
          <div className="container-site flex flex-col gap-0.5 py-2.5">
            {NAV.map((item) => {
              const isActive = pathname === "/"
                ? ("targetId" in item && item.targetId ? activeSection === item.targetId : false)
                : (item.to === pathname || (item.to !== "/" && pathname.startsWith(item.to)));
              return (
                <div key={item.label} className="flex flex-col">
                  <a
                    href={item.to}
                    onClick={(e) => handleNavClick(e, item)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all active:scale-[0.98] select-none cursor-pointer",
                      isActive
                        ? "bg-primary/10 text-primary font-bold border border-primary/25 shadow-xs"
                        : "text-[#0c2340] hover:bg-slate-50 hover:text-primary active:bg-slate-100"
                    )}
                  >
                    {isActive && (
                      <span className="size-1.5 rounded-full bg-primary animate-pulse shrink-0" />
                    )}
                    <span>{item.label}</span>
                  </a>
                  {item.label === "Gallery" && (
                    <a
                      href={`tel:${COMPANY.phone.replace(/[^0-9+]/g, "")}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-[#087FC1] hover:bg-sky-50 active:bg-sky-100 active:scale-[0.98] transition-all"
                    >
                      <Headphones className="size-4 text-[#087FC1]" />
                      <span>24/7 Support</span>
                    </a>
                  )}
                </div>
              );
            })}
            <Link
              to="/book-a-demo"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-primary py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-95"
            >
              Get A Quote
            </Link>
          </div>
        </nav>
      </div>
      </header>
    </>
  );
}
