import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Eye, Headphones, HeartHandshake, Leaf, ShieldCheck, Target, Wrench } from "lucide-react";
import { useEffect } from "react";
import installation from "@/assets/installation.jpg";
import { SectionHeading } from "@/components/site/Sections";
import { setupParallaxAndPopAnimation } from "@/lib/parallax-animation";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Amaravati Solar Solutions" },
      { name: "description", content: "Learn about Amaravati Solar Solutions, our mission, values and commitment to clean, sustainable solar energy." },
      { property: "og:title", content: "About Amaravati Solar Solutions" },
      { property: "og:description", content: "Our mission, vision and commitment to clean solar energy." },
    ],
  }),
  component: About,
});

const VALUES = [
  { icon: ShieldCheck, title: "Quality", text: "We use dependable components and follow careful installation practices." },
  { icon: HeartHandshake, title: "Honesty", text: "Clear advice and transparent quotations, always." },
  { icon: Leaf, title: "Sustainability", text: "Helping more people move to clean, renewable power." },
];

function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    return setupParallaxAndPopAnimation();
  }, []);

  return (
    <>
      <section className="container-site grid items-stretch gap-4 sm:gap-5 lg:gap-6 pt-2 pb-3 sm:pb-4 lg:grid-cols-2">
        {/* Parallax Hero Image Container */}
        <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full min-h-[260px] max-h-[460px] overflow-hidden rounded-2xl shadow-lift group parallax-wrap animate-pop-in">
          <img
            src={installation}
            alt="Our team installing solar panels"
            width={1600}
            height={1072}
            loading="lazy"
            data-parallax
            data-parallax-rate="0.12"
            className="parallax-img absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 rounded-xl bg-white/95 backdrop-blur-md p-2.5 sm:p-3 shadow-lg border border-white/60 flex items-center justify-between gap-2 animate-pop-in pop-stagger-2">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-primary">Engineering Trust</p>
              <p className="text-xs sm:text-sm font-bold text-navy">25-Year Performance Guarantee</p>
            </div>
            <div className="size-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
          </div>
        </div>

        {/* Content Column with Pop & Parallax Micro-motion */}
        <div className="flex flex-col justify-between py-0 gap-2">
          <div className="animate-pop-in pop-stagger-1">
            <p className="eyebrow text-[10px] font-bold text-primary tracking-widest uppercase">ABOUT US</p>
            <h1 className="mt-0.5 text-lg sm:text-xl lg:text-[23px] font-extrabold text-navy leading-[1.18] tracking-tight">
              We don't just install solar. We create a smarter way to power life.
            </h1>
            <p className="mt-1.5 text-xs sm:text-[12.5px] leading-relaxed text-foreground/85">
              At Amaravati Solar Solutions, we believe the future of energy should be efficient, dependable, and sustainable. Our approach combines thoughtful solar system design, quality components, precision installation, and end-to-end customer support to deliver solutions built around the needs of every customer.
            </p>
          </div>

          <div className="grid gap-2.5 sm:gap-3 sm:grid-cols-2 mt-1">
            {/* Our Mission */}
            <div className="rounded-xl bg-surface border border-slate-200/70 p-3 sm:p-3.5 shadow-2xs flex flex-col justify-between animate-pop-in pop-stagger-2 parallax-card hover:border-primary/30 transition-all duration-300">
              <div>
                <div className="grid size-7 place-items-center rounded-lg bg-primary/10 text-primary mb-1.5">
                  <Target className="size-3.5" />
                </div>
                <h3 className="text-xs sm:text-[13.5px] font-extrabold text-navy">Our Mission</h3>
                <ul className="mt-1.5 space-y-1 sm:space-y-1.5 text-[10.5px] sm:text-[11.5px] text-muted-foreground leading-snug">
                  <li className="flex items-start gap-1.5">
                    <span className="size-1 rounded-full bg-primary mt-1 shrink-0" />
                    <span>
                      <strong className="text-foreground font-bold">To make the transition to solar simple, seamless, and worthwhile.</strong>{" "}
                      To accelerate the transition towards clean energy by making solar power accessible and reliable, reducing environmental impact, and inspiring communities to embrace a greener, more sustainable future.
                    </span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="size-1 rounded-full bg-primary mt-1 shrink-0" />
                    <span className="text-foreground font-bold">
                      Together, building a greener society for generations to come.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Our Vision */}
            <div className="rounded-xl bg-surface border border-slate-200/70 p-3 sm:p-3.5 shadow-2xs flex flex-col justify-between animate-pop-in pop-stagger-3 parallax-card hover:border-[#087FC1]/30 transition-all duration-300">
              <div>
                <div className="grid size-7 place-items-center rounded-lg bg-[#087FC1]/10 text-[#087FC1] mb-1.5">
                  <Eye className="size-3.5" />
                </div>
                <h3 className="text-xs sm:text-[13.5px] font-extrabold text-navy">Our Vision</h3>
                <ul className="mt-1.5 space-y-1 sm:space-y-1.5 text-[10.5px] sm:text-[11.5px] text-muted-foreground leading-snug">
                  <li className="flex items-start gap-1.5">
                    <span className="size-1 rounded-full bg-[#087FC1] mt-1 shrink-0" />
                    <span className="text-foreground font-bold">
                      To redefine the way people experience energy.
                    </span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="size-1 rounded-full bg-[#087FC1] mt-1 shrink-0" />
                    <span>
                      We envision a future where every suitable rooftop becomes a source of clean power, every household has greater control over its energy costs, and sustainability becomes a natural part of everyday living.
                    </span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="size-1 rounded-full bg-[#087FC1] mt-1 shrink-0" />
                    <span>
                      Our ambition is to build a trusted solar brand that stands for engineering excellence, lasting reliability, and a cleaner tomorrow.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section with Staggered Scroll-Pop & Parallax Lift */}
      <section className="bg-surface py-8 md:py-12">
        <div className="container-site">
          <div className="scroll-pop">
            <SectionHeading center eyebrow="Our values" title="What guides our work" />
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, text }, i) => (
              <div
                key={title}
                className={`scroll-pop scroll-pop-${i + 1} parallax-card rounded-2xl bg-card p-7 sm:p-8 shadow-card border border-slate-100 hover:border-primary/40`}
              >
                <div className="grid size-12 place-items-center rounded-xl bg-sun text-primary-foreground shadow-sm">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-navy">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Support & Approach with Parallax Elevation */}
      <section className="container-site grid gap-6 py-8 md:grid-cols-2 md:py-12">
        <div className="scroll-pop scroll-pop-1 parallax-card rounded-2xl bg-white p-7 sm:p-8 border border-slate-200/80 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
              <Headphones className="size-4" />
              <span>Customer support</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
              Quality and support, beyond installation
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              From your first call to years after commissioning, our team is available to answer questions, inspect your system, and provide prompt maintenance assistance whenever you need it.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5 text-navy font-bold">
              <CheckCircle2 className="size-4 text-emerald-600" /> 24/7 Helpline
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-navy font-bold">
              <Wrench className="size-4 text-primary" /> On-Site Service
            </span>
          </div>
        </div>

        <div className="scroll-pop scroll-pop-2 parallax-card rounded-2xl bg-white p-7 sm:p-8 border border-slate-200/80 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#087FC1] font-bold text-xs uppercase tracking-wider mb-2">
              <ShieldCheck className="size-4" />
              <span>Our approach</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
              Consultation to commissioning
            </h2>
            <ul className="mt-4 space-y-3 text-sm sm:text-base text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="grid size-5.5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-xs font-extrabold">1</span>
                <span>Understand your energy needs in a free consultation</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="grid size-5.5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-xs font-extrabold">2</span>
                <span>Inspect your rooftop site and assess solar irradiation</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="grid size-5.5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-xs font-extrabold">3</span>
                <span>Share a customised, transparent proposal with subsidy support</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="grid size-5.5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-xs font-extrabold">4</span>
                <span>Install professionally with Net-Metering and ongoing warranty</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
