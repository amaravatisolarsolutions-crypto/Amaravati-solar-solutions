const fs = require('fs');

let code = fs.readFileSync('frontend/src/routes/book-a-demo.tsx', 'utf8');

const targetOld = `<div className="flex rounded-lg bg-slate-100 p-1 text-xs font-semibold shadow-inner border border-slate-200/80">
                  <button
                    type="button"
                    role="tab"
                    data-unstyled="true"
                    aria-selected={formTab === "proposal"}
                    onClick={() => setFormTab("proposal")}
                    className={cn(
                      "rounded-md px-3.5 py-1.5 transition-all text-xs font-bold cursor-pointer select-none",
                      formTab === "proposal"
                        ? "!bg-white !text-[#082B4C] shadow-xs"
                        : "!bg-transparent !text-slate-600 hover:!text-[#082B4C] hover:!bg-slate-200/60"
                    )}
                  >
                    Quick Quote
                  </button>
                  <button
                    type="button"
                    role="tab"
                    data-unstyled="true"
                    aria-selected={formTab === "calendar"}
                    onClick={() => setFormTab("calendar")}
                    className={cn(
                      "rounded-md px-3.5 py-1.5 transition-all text-xs font-bold cursor-pointer select-none",
                      formTab === "calendar"
                        ? "!bg-white !text-[#082B4C] shadow-xs"
                        : "!bg-transparent !text-slate-600 hover:!text-[#082B4C] hover:!bg-slate-200/60"
                    )}
                  >
                    Book Slot
                  </button>
                </div>`;

const targetNew = `<div className="flex rounded-full bg-slate-100 p-1 text-xs font-semibold shadow-inner border border-slate-200/80">
                  <button
                    type="button"
                    role="tab"
                    data-unstyled="true"
                    aria-selected={formTab === "proposal"}
                    onClick={() => setFormTab("proposal")}
                    className={cn(
                      "rounded-full px-4 py-1.5 transition-all text-xs font-bold cursor-pointer select-none",
                      formTab === "proposal"
                        ? "!bg-[#E04F16] !text-white shadow-md"
                        : "!bg-transparent !text-slate-600 hover:!text-[#E04F16] hover:!bg-orange-100/50"
                    )}
                  >
                    Quick Quote
                  </button>
                  <button
                    type="button"
                    role="tab"
                    data-unstyled="true"
                    aria-selected={formTab === "calendar"}
                    onClick={() => setFormTab("calendar")}
                    className={cn(
                      "rounded-full px-4 py-1.5 transition-all text-xs font-bold cursor-pointer select-none",
                      formTab === "calendar"
                        ? "!bg-[#E04F16] !text-white shadow-md"
                        : "!bg-transparent !text-slate-600 hover:!text-[#E04F16] hover:!bg-orange-100/50"
                    )}
                  >
                    Book Slot
                  </button>
                </div>`;

if (code.includes('Quick Quote') && code.includes('Book Slot')) {
  const startIdx = code.indexOf('<div className="flex rounded-lg bg-slate-100 p-1 text-xs font-semibold');
  const endIdx = code.indexOf('</div>', startIdx) + 6;
  const replaced = code.substring(0, startIdx) + targetNew + code.substring(endIdx);
  fs.writeFileSync('frontend/src/routes/book-a-demo.tsx', replaced, 'utf8');
  console.log('Successfully updated tabs to Orange background & White text!');
} else {
  console.error('Could not find Quick Quote block in book-a-demo.tsx');
  process.exit(1);
}

