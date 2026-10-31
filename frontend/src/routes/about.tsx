import { createFileRoute } from "@tanstack/react-router";
import { Eye, HeartHandshake, Leaf, ShieldCheck, Target } from "lucide-react";
import { useEffect } from "react";
import installation from "@/assets/installation.jpg";
import { SectionHeading } from "@/components/site/Sections";

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
  }, []);

  return (
    <>      <section className="container-site grid items-stretch gap-4 sm:gap-5 lg:gap-6 pt-2 pb-3 sm:pb-4 lg:grid-cols-2">
        <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full min-h-[220px] max-h-[450px] overflow-hidden rounded-2xl shadow-lift">
          <img
            src={installation}
            alt="Our team installing solar panels"
            width={1600}
            height={1072}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-between py-0 gap-2">
          <div>
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
            <div className="rounded-xl bg-surface border border-slate-200/70 p-3 sm:p-3.5 shadow-2xs flex flex-col justify-between">
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
            <div className="rounded-xl bg-surface border border-slate-200/70 p-3 sm:p-3.5 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="grid size-7 place-items-center rounded-xl bg-[#087FC1]/10 text-[#087FC1] mb-1.5">
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

      <section className="bg-surface py-6 md:py-8">
        <div className="container-site">
          <SectionHeading center eyebrow="Our values" title="What guides our work" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl bg-card p-8 shadow-card">
                <div className="grid size-12 place-items-center rounded-xl bg-sun text-primary-foreground"><Icon className="size-6" /></div>
                <h3 className="mt-6 text-xl font-bold">{title}</h3>
                <p className="mt-2 text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site grid gap-8 py-6 md:grid-cols-2 md:py-8">
        <div>
          <SectionHeading eyebrow="Customer support" title="Quality and support, beyond installation" />
          <p className="mt-4 text-base sm:text-lg">From your first call to years after commissioning, our team is available to answer questions, inspect your system and provide maintenance assistance.</p>
        </div>
        <div>
          <SectionHeading eyebrow="Our approach" title="Consultation to commissioning" />
          <ul className="mt-5 space-y-3 text-lg">
            <li>1. Understand your needs in a free consultation</li>
            <li>2. Inspect your site and assess energy use</li>
            <li>3. Share a customised, transparent proposal</li>
            <li>4. Install professionally and support you ongoing</li>
          </ul>
        </div>
      </section>
    </>
  );
}
