const fs = require('fs');

let code = fs.readFileSync('frontend/src/routes/index.tsx', 'utf8');

const startMarker = '{/* 2. ABOUT US SECTION';
const endMarker = '{/* Solutions Header - Side Heading';

const startIndex = code.indexOf(startMarker);
const endIndex = code.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Markers not found!');
  process.exit(1);
}

const newBlock = `{/* 2. ABOUT US SECTION - Perfectly Aligned with Logo & Navbar (container-site) */}
      <section id="about" className="bg-gradient-to-b from-[#082B4C] via-[#093259] to-[#082B4C] py-8 sm:py-12 text-white scroll-mt-28">
        <div className="container-site">
          {/* Main About Statement - Perfectly Aligned with Logo */}
          <div className="scroll-pop scroll-pop-1 mb-6 sm:mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-2.5 border border-white/15">
              <Sparkles className="size-3 text-amber-300" /> Amaravati Solar Solutions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              ABOUT
            </h2>
            <p className="mt-1.5 text-base sm:text-lg md:text-xl font-bold text-white/95 leading-snug">
              We don't just install solar. We create a smarter way to power life.
            </p>
            <div className="mt-3.5 flex items-start gap-3 w-full">
              <span className="size-2 rounded-full bg-[#E04F16] mt-2 shrink-0 shadow-[0_0_8px_rgba(224,79,22,0.7)]" />
              <p className="text-xs sm:text-sm md:text-[15px] text-white/90 leading-relaxed text-justify [text-align-last:left] w-full">
                At Amaravati Solar Solutions, we believe the future of energy should be efficient, dependable, and sustainable. Our approach combines thoughtful solar system design, quality components, precision installation, and end-to-end customer support to deliver solutions built around the needs of every customer.
              </p>
            </div>
          </div>

          {/* Vision & Mission - Full-Width 2-Column Symmetrical Grid (Aligned with Navbar edges) */}
          <div className="grid gap-8 md:grid-cols-2 pt-6 border-t border-white/15 w-full">
            {/* Our Vision */}
            <div className="flex flex-col justify-between scroll-pop scroll-pop-2">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="grid size-8 place-items-center rounded-xl bg-amber-400/15 text-amber-300 border border-amber-400/30">
                    <Eye className="size-4" />
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                    Our Vision
                  </h3>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-white/85 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="size-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <p className="flex-1 font-bold text-white text-justify [text-align-last:left]">
                      To redefine the way people experience energy.
                    </p>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="size-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <p className="flex-1 text-white/80 text-justify [text-align-last:left]">
                      We envision a future where every suitable rooftop becomes a source of clean power, every household has greater control over its energy costs, and sustainability becomes a natural part of everyday living.
                    </p>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="size-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <p className="flex-1 text-white/80 text-justify [text-align-last:left]">
                      Our ambition is to build a trusted solar brand that stands for engineering excellence, lasting reliability, and a cleaner tomorrow.
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Our Mission */}
            <div className="flex flex-col justify-between scroll-pop scroll-pop-3">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="grid size-8 place-items-center rounded-xl bg-orange-500/20 text-[#FF7A1A] border border-orange-400/30">
                    <Target className="size-4" />
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                    Our Mission
                  </h3>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-white/85 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="size-1.5 rounded-full bg-[#E04F16] mt-2 shrink-0" />
                    <div className="flex-1">
                      <p className="font-bold text-white text-justify [text-align-last:left]">
                        To make the transition to solar simple, seamless, and worthwhile.
                      </p>
                      <p className="mt-1 text-white/80 text-justify [text-align-last:left]">
                        To accelerate the transition towards clean energy by making solar power accessible and reliable, reducing environmental impact, and inspiring communities to embrace a greener, more sustainable future.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="size-1.5 rounded-full bg-[#E04F16] mt-2 shrink-0" />
                    <p className="flex-1 font-bold text-white text-justify [text-align-last:left]">
                      Together, building a greener society for generations to come.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action CTAs - Aligned with Left Edge */}
          <div className="mt-8 sm:mt-10 flex flex-wrap gap-3.5 scroll-pop scroll-pop-4">
            <Button asChild variant="cta" className="h-10 sm:h-10.5 rounded-full bg-gradient-to-r from-[#D9410E] via-[#E04F16] to-[#F97316] hover:from-[#C03507] hover:to-[#D9410E] text-white px-6 sm:px-7 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg active:scale-95 transition-all">
              <Link to="/about">
                <span>More About Our Company</span>
                <ArrowRight className="size-4 ml-1.5" />
              </Link>
            </Button>
            <Button asChild variant="heroOutline" className="h-10 sm:h-10.5 rounded-full border-white/35 text-white hover:bg-white/10 px-5 sm:px-6 text-xs sm:text-sm font-bold active:scale-95 transition-all">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>\n\n      `;

code = code.substring(0, startIndex) + newBlock + code.substring(endIndex);
fs.writeFileSync('frontend/src/routes/index.tsx', code, 'utf8');
console.log('Successfully aligned About section with container-site in frontend/src/routes/index.tsx');

