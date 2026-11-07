import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Preloader } from "@/components/site/Preloader";
import { FloatingContactButtons } from "@/components/site/FloatingContactButtons";
import { SolarSiteBackground } from "@/components/site/SolarSiteBackground";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Go home</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong on our end. You can try refreshing or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Try again
          </button>
          <a href="/" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Amaravati Solar Solutions — #1 Rooftop Solar Company in Andhra Pradesh" },
      {
        name: "description",
        content:
          "Amaravati Solar Solutions is the #1 trusted rooftop solar provider across Amaravati, Vijayawada, Guntur & AP. Premium on-grid, off-grid & hybrid solar systems with ₹78,000 PM Surya Ghar subsidy assistance, 5-year PowerCare warranty, and 25-year panel performance guarantee.",
      },
      {
        name: "keywords",
        content:
          "Amaravati Solar Solutions, Amaravati Solar, solar solutions amaravati, solar panels vijayawada, rooftop solar guntur, best solar company andhra pradesh, pm surya ghar subsidy ap, pm surya ghar muft bijli yojana, on grid solar system, off grid solar power, hybrid solar inverter, commercial solar plant andhra pradesh, residential rooftop solar, solar net metering ap, rooftop solar panel price",
      },
      { name: "author", content: "Amaravati Solar Solutions" },
      { name: "publisher", content: "Amaravati Solar Solutions" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { name: "bingbot", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { name: "google-site-verification", content: "dfef471ef71211f1" },
      { name: "geo.region", content: "IN-AP" },
      { name: "geo.placename", content: "Patamata, Vijayawada, Andhra Pradesh 520010" },
      { name: "geo.position", content: "16.486879;80.665757" },
      { name: "ICBM", content: "16.486879, 80.665757" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Amaravati Solar Solutions" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:title", content: "Amaravati Solar Solutions — Clean Energy. Brighter Tomorrow." },
      {
        property: "og:description",
        content:
          "Smart, reliable, high-efficiency solar energy solutions for homes, businesses, and industries across Andhra Pradesh and beyond. Save up to 90% on electricity bills.",
      },
      { property: "og:url", content: "https://amaravatisolarsolutions.com/" },
      { property: "og:image", content: "https://amaravatisolarsolutions.com/assets/hero-amaravati-exact-panoramic.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Amaravati Solar Solutions — Rooftop Solar Systems" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Amaravati Solar Solutions — Rooftop Solar Systems" },
      {
        name: "twitter:description",
        content:
          "Top-rated rooftop solar installation across Amaravati, Vijayawada, and Guntur. High-efficiency solar panels and government subsidy support.",
      },
      { name: "twitter:image", content: "https://amaravatisolarsolutions.com/assets/hero-amaravati-exact-panoramic.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://amaravatisolarsolutions.com/" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["SolarEnergyContractor", "LocalBusiness", "Organization"],
      "@id": "https://amaravatisolarsolutions.com/#organization",
      "name": "Amaravati Solar Solutions",
      "alternateName": ["Amaravati Solar", "Amaravati Solar Solutions AP"],
      "url": "https://amaravatisolarsolutions.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://amaravatisolarsolutions.com/assets/logo-BRdvQGVB.png",
        "caption": "Amaravati Solar Solutions Logo"
      },
      "image": "https://amaravatisolarsolutions.com/assets/hero-amaravati-exact-panoramic.jpg",
      "description": "Amaravati Solar Solutions is Andhra Pradesh's premier rooftop solar EPC provider. Offering high-efficiency on-grid, off-grid, and hybrid solar installations for residential, commercial, and industrial clients with PM Surya Ghar subsidy support and 5-year PowerCare warranty.",
      "telephone": "+91 63058 25402",
      "email": "info@amaravatisolarsolutions.com",
      "priceRange": "₹₹ - ₹₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "74-12/1-12/5, Electricity Colony, 9th Line, opp to Auto Nagar gate, Patamata",
        "addressLocality": "Vijayawada",
        "addressRegion": "Andhra Pradesh",
        "postalCode": "520010",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 16.486879,
        "longitude": 80.665757
      },
      "hasMap": "https://www.google.com/maps?q=16.4868787,80.6657567",
      "areaServed": [
        { "@type": "City", "name": "Amaravati" },
        { "@type": "City", "name": "Vijayawada" },
        { "@type": "City", "name": "Guntur" },
        { "@type": "City", "name": "Tenali" },
        { "@type": "City", "name": "Mangalagiri" },
        { "@type": "AdministrativeArea", "name": "Andhra Pradesh" },
        { "@type": "AdministrativeArea", "name": "Telangana" }
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "10:00",
          "closes": "19:00"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Solar Energy Solutions & Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "On-Grid Rooftop Solar System Installation",
              "description": "Grid-tied solar system with net metering for maximum electricity bill reduction up to 90%."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Off-Grid Solar Power Systems with Battery Storage",
              "description": "Independent battery-backed solar power solutions for continuous 24/7 power during outages."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Hybrid Solar Systems with Smart Energy Management",
              "description": "Best-of-both-worlds solar setup: export surplus power to the grid and keep battery backup for emergencies."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "PowerCare 5-Year Maintenance & Panel Cleaning",
              "description": "Comprehensive maintenance, periodic panel cleaning, generation monitoring, and preventive care."
            }
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://amaravatisolarsolutions.com/#website",
      "url": "https://amaravatisolarsolutions.com",
      "name": "Amaravati Solar Solutions",
      "publisher": {
        "@id": "https://amaravatisolarsolutions.com/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://amaravatisolarsolutions.com/solar-solutions?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "SiteNavigationElement",
      "@id": "https://amaravatisolarsolutions.com/#navigation",
      "name": [
        "Home",
        "About Us",
        "Services",
        "Solar Solutions",
        "Solar Calculator",
        "Projects",
        "Contact Us",
        "Book a Demo"
      ],
      "url": [
        "https://amaravatisolarsolutions.com/",
        "https://amaravatisolarsolutions.com/about",
        "https://amaravatisolarsolutions.com/services",
        "https://amaravatisolarsolutions.com/solar-solutions",
        "https://amaravatisolarsolutions.com/solar-calculator",
        "https://amaravatisolarsolutions.com/projects",
        "https://amaravatisolarsolutions.com/contact",
        "https://amaravatisolarsolutions.com/book-a-demo"
      ]
    }
  ]
};

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager (GTM-M52LL656) */}
        <script async src="https://www.googletagmanager.com/gtm.js?id=GTM-M52LL656" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','GTM-M52LL656');`,
          }}
        />
        {/* Structured Data (Schema.org) for Google Top Ranking & Rich Sitelinks */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(STRUCTURED_DATA),
          }}
        />
        <HeadContent />
      </head>
      <body>
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M52LL656"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function ScrollToTopOnNavigate() {
  const location = useRouterState({ select: (s) => s.location });
  const pathname = location.pathname;
  const searchStr = location.searchStr;
  const hash = location.hash;

  useEffect(() => {
    // If navigating to an in-page anchor hash, scroll smoothly to target
    if (hash) {
      const targetId = hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 50);
      return () => clearTimeout(timer);
    }

    // Force instant scroll to top immediately when route changes
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, searchStr, hash]);

  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const pathname = router.state.location.pathname;
  const isAdmin = pathname.toLowerCase().startsWith("/admin") || pathname.toLowerCase() === "/login";

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTopOnNavigate />
      {!isAdmin && <Preloader />}
      {!isAdmin && <SiteHeader />}
      <main className={!isAdmin ? "relative min-h-[80vh] overflow-x-hidden text-foreground" : ""}>
        {!isAdmin && <SolarSiteBackground />}
        <Outlet />
      </main>
      {!isAdmin && <SiteFooter />}
      {!isAdmin && <FloatingContactButtons />}
    </QueryClientProvider>
  );
}
