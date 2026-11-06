import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  ChevronDown,
  Clock,
  Headphones,
  Mail,
  Menu,
  Phone,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/logo.png";
import { COMPANY, NAV } from "@/lib/site-data";
import { scrollToTarget } from "@/lib/scroll-utils";
import { cn } from "@/lib/utils";

export const SERVICE_SECTORS = [
  { title: "Residential", sector: "residential" },
  { title: "Commercial", sector: "commercial" },
  { title: "Industrial", sector: "industrial" },
] as const;

export const SOLAR_SOLUTIONS = [
  { title: "All Solar Solutions", to: "/solar-solutions" },
  { title: "On-Grid Rooftop Solar", to: "/services/on-grid-solar-systems" },
  { title: "Off-Grid Rooftop Solar", to: "/services/off-grid-solar-systems" },
  { title: "Hybrid Rooftop Solar", to: "/services/hybrid-solar-systems" },
] as const;

export function SiteHeader() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const solutionsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Active route helpers
  const isSolarActive =
    pathname === "/solar-solutions" ||
    pathname.startsWith("/solar-solutions") ||
    pathname.includes("solar-systems");

  const isServicesActive =
    (pathname === "/services" || pathname.startsWith("/services")) &&
    !pathname.includes("solar-systems");

  const getIsActive = (label: string, to: string) => {
    if (label === "Home") return pathname === "/";
    if (label === "About Us") return pathname === "/about" || pathname.startsWith("/about");
    if (label === "Services") return isServicesActive;
    if (label === "Our Solar Solutions") return isSolarActive;
    if (label === "Projects") return pathname === "/projects" || pathname.startsWith("/projects");
    if (label === "Contact Us") return pathname === "/contact" || pathname.startsWith("/contact");
    return pathname === to || (to !== "/" && pathname.startsWith(to));
  };

  // Sticky shadow on scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 25);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle direct hash navigation if URL has #hash
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash) {
        const targetId = window.location.hash.replace("#", "");
        setTimeout(() => {
          scrollToTarget(targetId);
        }, 150);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleSolutionClick = (e: React.MouseEvent, sol: (typeof SOLAR_SOLUTIONS)[number]) => {
    e.preventDefault();
    setSolutionsDropdownOpen(false);
    setOpen(false);
    navigate({ to: sol.to as any });
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  const handleNavClick = (e: React.MouseEvent, item: (typeof NAV)[number]) => {
    e.preventDefault();
    setOpen(false);

    if (item.label === "Home") {
      if (pathname === "/") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        navigate({ to: "/" });
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
      return;
    }

    if (item.label === "Services") {
      navigate({ to: "/services", search: { category: undefined } as any });
      window.dispatchEvent(new CustomEvent("reset-services-view"));
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    if (item.label === "Our Solar Solutions") {
      navigate({ to: "/solar-solutions" as any });
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    navigate({ to: item.to as any });
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  return (
    <>
      {/* Top Announcement Bar - Vibrant Brand Orange Header */}
      <div className="bg-gradient-to-r from-[#B83A16] via-[#C84118] to-[#E04F16] text-white py-1 sm:py-1.5 border-b border-orange-700/30 shadow-xs transition-all duration-300">
        <div className="container-site flex items-center justify-center lg:justify-between gap-2 sm:gap-3 overflow-hidden">
          {/* Left: Email & Phone Support in Single Line */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-3 shrink-0 whitespace-nowrap text-[9px] min-[360px]:text-[10px] sm:text-xs font-semibold">
            <a
              href="mailto:amaravatisolarsolutions@gmail.com"
              className="flex items-center gap-1 text-white/95 hover:text-white hover:underline transition-colors"
            >
              <Mail className="size-2.5 sm:size-3 text-amber-200 shrink-0" />
              <span>amaravatisolarsolutions@gmail.com</span>
            </a>
            <span className="text-white/40 text-[8px] sm:text-xs">|</span>
            <a
              href="tel:+917989641899"
              className="flex items-center gap-1 text-white/95 hover:text-white hover:underline transition-colors font-bold"
            >
              <Phone className="size-2.5 sm:size-3 text-amber-200 shrink-0" />
              <span>+91 79896 41899</span>
            </a>
          </div>

          {/* Right: Operational Hours & Social Icons */}
          <div className="hidden lg:flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5 text-white/95">
              <Clock className="size-3.5 text-amber-200 shrink-0" />
              <span>Mon - Sat: 10:00 AM - 7:00 PM</span>
            </div>
            <span className="text-white/40">|</span>
            <span className="text-white/90">Sunday - Holiday</span>
            <span className="text-white/40">|</span>
            <div className="flex items-center gap-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid size-6 place-items-center rounded-full bg-white/20 text-white hover:bg-white hover:text-[#1877F2] hover:scale-110 transition-all">
                <svg className="size-3 fill-current" viewBox="0 0 24 24"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.52-.14-2.71-.14-2.7 0-4.79 1.64-4.79 4.75V9.5H7v4h3V22h4v-8.5z" /></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-6 place-items-center rounded-full bg-white/20 text-white hover:bg-white hover:text-[#dc2743] hover:scale-110 transition-all">
                <svg className="size-3 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="grid size-6 place-items-center rounded-full bg-white/20 text-white hover:bg-white hover:text-black hover:scale-110 transition-all">
                <svg className="size-2.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid size-6 place-items-center rounded-full bg-white/20 text-white hover:bg-white hover:text-[#0A66C2] hover:scale-110 transition-all">
                <svg className="size-3 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="grid size-6 place-items-center rounded-full bg-white/20 text-white hover:bg-white hover:text-[#FF0000] hover:scale-110 transition-all">
                <svg className="size-3 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

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
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
            setOpen(false);
          }}
          className="flex shrink-0 items-center py-1 transition-transform hover:opacity-95"
          aria-label="Amaravati Solar Solutions home"
        >
          <img
            src={logo}
            alt="Amaravati Solar Solutions"
            width={1016}
            height={307}
            className="h-11 sm:h-12 md:h-[3.25rem] xl:h-[3.6rem] w-auto object-contain transition-transform duration-200 hover:scale-102"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2.5 xl:gap-5 lg:flex">
          <nav className="flex items-center gap-0.5 xl:gap-1" aria-label="Main">
            {NAV.map((item) => {
              const isActive = getIsActive(item.label, item.to);

              if (item.label === "Services") {
                return (
                  <div
                    key={item.label}
                    className="relative flex items-center group"
                    onMouseEnter={() => {
                      if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
                      setServicesDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      servicesTimeoutRef.current = setTimeout(() => {
                        setServicesDropdownOpen(false);
                      }, 180);
                    }}
                  >
                    <a
                      href={item.to}
                      onClick={(e) => handleNavClick(e, item)}
                      className={cn(
                        "relative px-2.5 xl:px-3 py-1.5 rounded-full text-[13px] xl:text-[14px] font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-1",
                        isActive
                          ? "bg-primary/10 text-primary font-bold border border-primary/25 shadow-sm"
                          : "text-[#0c2340] hover:text-primary hover:bg-slate-100/80"
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "size-3.5 text-slate-400 transition-transform duration-200",
                          servicesDropdownOpen ? "rotate-180 text-primary" : "group-hover:rotate-180 group-hover:text-primary"
                        )}
                      />
                    </a>

                    {/* Premium Sleek Hover Dropdown Menu */}
                    <div
                      className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 transition-all duration-200",
                        servicesDropdownOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto visible"
                          : "opacity-0 -translate-y-1.5 pointer-events-none invisible"
                      )}
                    >
                      <div className="w-[190px] rounded-xl bg-white/95 backdrop-blur-xl p-1.5 shadow-[0_16px_36px_rgba(8,43,76,0.18)] border border-slate-200/90">
                        <div className="space-y-0.5">
                          <a
                            href="/services"
                            onClick={(e) => {
                              e.preventDefault();
                              setServicesDropdownOpen(false);
                              navigate({
                                to: "/services",
                                search: { category: undefined } as any,
                              });
                              window.dispatchEvent(new CustomEvent("reset-services-view"));
                              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                            }}
                            className="flex items-center gap-1.5 w-full px-3.5 py-2 rounded-lg text-[13px] font-bold text-primary hover:bg-primary/10 transition-all duration-150 active:scale-[0.98] cursor-pointer text-left border-b border-slate-100 mb-0.5"
                          >
                            <Sparkles className="size-3 text-primary shrink-0" />
                            <span>All Services</span>
                          </a>
                          {SERVICE_SECTORS.map((sec) => (
                            <a
                              key={sec.sector}
                              href={`/services?category=${sec.sector}`}
                              onClick={(e) => {
                                e.preventDefault();
                                setServicesDropdownOpen(false);
                                navigate({
                                  to: "/services",
                                  search: { category: sec.sector } as any,
                                });
                                window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                              }}
                              className="block w-full px-3.5 py-2 rounded-lg text-[13px] font-bold text-[#082B4C] hover:bg-primary/10 hover:text-primary transition-all duration-150 active:scale-[0.98] cursor-pointer text-left"
                            >
                              {sec.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              if (item.label === "Our Solar Solutions") {
                return (
                  <div
                    key={item.label}
                    className="relative flex items-center group"
                    onMouseEnter={() => {
                      if (solutionsTimeoutRef.current) clearTimeout(solutionsTimeoutRef.current);
                      setSolutionsDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      solutionsTimeoutRef.current = setTimeout(() => {
                        setSolutionsDropdownOpen(false);
                      }, 180);
                    }}
                  >
                    <a
                      href={item.to}
                      onClick={(e) => handleNavClick(e, item)}
                      className={cn(
                        "relative px-2 xl:px-2.5 py-1.5 rounded-full text-[12.5px] xl:text-[13.5px] font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-1",
                        isSolarActive
                          ? "bg-primary/10 text-primary font-bold border border-primary/25 shadow-sm"
                          : "text-[#0c2340] hover:text-primary hover:bg-slate-100/80"
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "size-3.5 text-slate-400 transition-transform duration-200",
                          solutionsDropdownOpen ? "rotate-180 text-primary" : "group-hover:rotate-180 group-hover:text-primary"
                        )}
                      />
                    </a>

                    {/* Premium Sleek Hover Dropdown Menu */}
                    <div
                      className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 transition-all duration-200",
                        solutionsDropdownOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto visible"
                          : "opacity-0 -translate-y-1.5 pointer-events-none invisible"
                      )}
                    >
                      <div className="w-[190px] rounded-xl bg-white/95 backdrop-blur-xl p-1.5 shadow-[0_16px_36px_rgba(8,43,76,0.18)] border border-slate-200/90">
                        <div className="space-y-0.5">
                          {SOLAR_SOLUTIONS.map((sol) => (
                            <a
                              key={sol.to}
                              href={sol.to}
                              onClick={(e) => handleSolutionClick(e, sol)}
                              className={cn(
                                "block w-full px-3.5 py-2 rounded-lg text-[13px] font-bold transition-all duration-150 active:scale-[0.98] cursor-pointer text-left",
                                pathname === sol.to
                                  ? "bg-primary/10 text-primary font-extrabold"
                                  : "text-[#082B4C] hover:bg-primary/10 hover:text-primary"
                              )}
                            >
                              {sol.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={item.label} className="flex items-center gap-0.5 xl:gap-1">
                  <a
                    href={item.to}
                    onClick={(e) => handleNavClick(e, item)}
                    className={cn(
                      "relative px-2.5 xl:px-3 py-1.5 rounded-full text-[13px] xl:text-[14px] font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-1.5",
                      isActive
                        ? "bg-primary/10 text-primary font-bold border border-primary/25 shadow-sm"
                        : "text-[#0c2340] hover:text-primary hover:bg-slate-100/80"
                    )}
                  >
                    <span>{item.label}</span>
                  </a>

                  {item.label === "Projects" && (
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
            className="inline-flex items-center justify-center rounded-[30px] bg-[#B83A16] px-4 xl:px-5 py-2 text-xs xl:text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#A33112] hover:shadow-md hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0"
          >
            Get A Quote
          </Link>
        </div>

        {/* Tablet quick CTA button (768px - 1023px) */}
        <div className="hidden md:flex lg:hidden items-center gap-2">
          <Link
            to="/book-a-demo"
            className="inline-flex items-center justify-center rounded-[30px] bg-[#B83A16] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#A33112] whitespace-nowrap"
          >
            Get A Quote
          </Link>
        </div>

        {/* Mobile & Tablet menu toggle button */}
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

      {/* Mobile & Tablet Drawer */}
      <div
        className={cn(
          "grid overflow-hidden border-t bg-white transition-[grid-template-rows] duration-300 lg:hidden shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-transparent"
        )}
      >
        <nav className="min-h-0" aria-label="Mobile and Tablet Navigation">
          <div className="container-site max-w-2xl flex flex-col gap-1 py-3 sm:py-4">
            {/* Home */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                if (pathname === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  navigate({ to: "/" });
                  window.scrollTo({ top: 0, behavior: "instant" });
                }
              }}
              className={cn(
                "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-semibold transition-all cursor-pointer",
                pathname === "/"
                  ? "bg-primary/10 text-primary font-bold border border-primary/20 shadow-xs"
                  : "text-[#0c2340] hover:bg-slate-50 hover:text-primary active:bg-slate-100"
              )}
            >
              <span>Home</span>
            </a>

            {/* About Us */}
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                navigate({ to: "/about" });
                window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              }}
              className={cn(
                "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-semibold transition-all cursor-pointer",
                pathname === "/about" || pathname.startsWith("/about")
                  ? "bg-primary/10 text-primary font-bold border border-primary/20 shadow-xs"
                  : "text-[#0c2340] hover:bg-slate-50 hover:text-primary active:bg-slate-100"
              )}
            >
              <span>About Us</span>
            </a>

            {/* Services (Expandable Accordion) */}
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 overflow-hidden transition-colors">
              <button
                type="button"
                onClick={() => setMobileServicesOpen((prev) => !prev)}
                className={cn(
                  "w-full flex items-center justify-between px-3.5 py-2.5 text-sm sm:text-base font-semibold transition-all cursor-pointer select-none text-left",
                  isServicesActive
                    ? "text-primary font-bold"
                    : "text-[#0c2340] hover:text-primary"
                )}
                aria-expanded={mobileServicesOpen}
              >
                <span>Services</span>
                <ChevronDown
                  className={cn(
                    "size-4 text-slate-400 transition-transform duration-200",
                    mobileServicesOpen && "rotate-180 text-primary"
                  )}
                />
              </button>

              {mobileServicesOpen && (
                <div className="px-2.5 pb-2.5 pt-0.5 space-y-1">
                  <a
                    href="/services"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      navigate({
                        to: "/services",
                        search: { category: undefined } as any,
                      });
                      window.dispatchEvent(new CustomEvent("reset-services-view"));
                      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold bg-primary/10 text-primary hover:bg-primary/15 transition-colors cursor-pointer"
                  >
                    <Sparkles className="size-3.5 text-primary shrink-0" />
                    <span>All Services (15 Solutions)</span>
                  </a>
                  {SERVICE_SECTORS.map((sec) => (
                    <a
                      key={sec.sector}
                      href={`/services?category=${sec.sector}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
                        navigate({
                          to: "/services",
                          search: { category: sec.sector } as any,
                        });
                        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                      }}
                      className="flex items-center px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold text-slate-700 hover:text-primary hover:bg-white transition-colors cursor-pointer"
                    >
                      <span className="size-1.5 rounded-full bg-primary/60 mr-2 shrink-0" />
                      <span>{sec.title}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Our Solar Solutions (Expandable Accordion) */}
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 overflow-hidden transition-colors">
              <button
                type="button"
                onClick={() => setMobileSolutionsOpen((prev) => !prev)}
                className={cn(
                  "w-full flex items-center justify-between px-3.5 py-2.5 text-sm sm:text-base font-semibold transition-all cursor-pointer select-none text-left",
                  isSolarActive
                    ? "text-primary font-bold"
                    : "text-[#0c2340] hover:text-primary"
                )}
                aria-expanded={mobileSolutionsOpen}
              >
                <span>Our Solar Solutions</span>
                <ChevronDown
                  className={cn(
                    "size-4 text-slate-400 transition-transform duration-200",
                    mobileSolutionsOpen && "rotate-180 text-primary"
                  )}
                />
              </button>

              {mobileSolutionsOpen && (
                <div className="px-2.5 pb-2.5 pt-0.5 space-y-1">
                  {SOLAR_SOLUTIONS.map((sol) => (
                    <a
                      key={sol.to}
                      href={sol.to}
                      onClick={(e) => handleSolutionClick(e, sol)}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer",
                        pathname === sol.to
                          ? "bg-primary/10 text-primary font-extrabold"
                          : "text-slate-700 hover:text-primary hover:bg-white"
                      )}
                    >
                      <span className="size-1.5 rounded-full bg-amber-500 mr-2 shrink-0" />
                      <span>{sol.title}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Projects */}
            <a
              href="/projects"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                navigate({ to: "/projects" });
                window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              }}
              className={cn(
                "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-semibold transition-all cursor-pointer",
                pathname === "/projects" || pathname.startsWith("/projects")
                  ? "bg-primary/10 text-primary font-bold border border-primary/20 shadow-xs"
                  : "text-[#0c2340] hover:bg-slate-50 hover:text-primary active:bg-slate-100"
              )}
            >
              <span>Projects</span>
            </a>

            {/* Contact Us */}
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                navigate({ to: "/contact" });
                window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              }}
              className={cn(
                "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-semibold transition-all cursor-pointer",
                pathname === "/contact" || pathname.startsWith("/contact")
                  ? "bg-primary/10 text-primary font-bold border border-primary/20 shadow-xs"
                  : "text-[#0c2340] hover:bg-slate-50 hover:text-primary active:bg-slate-100"
              )}
            >
              <span>Contact Us</span>
            </a>

            {/* 24/7 Support Phone Action */}
            <a
              href={`tel:${COMPANY.phone.replace(/[^0-9+]/g, "")}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-bold text-[#087FC1] bg-sky-50/80 hover:bg-sky-100 active:scale-[0.99] transition-all"
            >
              <Headphones className="size-4 sm:size-5 text-[#087FC1] shrink-0" />
              <span>24/7 Support: {COMPANY.phone}</span>
            </a>

            {/* Get A Quote Button */}
            <Link
              to="/book-a-demo"
              onClick={() => {
                setOpen(false);
                window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              }}
              className="mt-2 inline-flex items-center justify-center rounded-[30px] bg-[#B83A16] py-3 text-sm sm:text-base font-bold text-white shadow-sm transition-all hover:bg-[#A33112] active:scale-95 text-center"
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
