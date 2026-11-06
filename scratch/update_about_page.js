const fs = require('fs');
let code = fs.readFileSync('frontend/src/routes/about.tsx', 'utf8');

code = code.replace(
  'p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed"',
  'p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed text-justify [text-align-last:left]"'
);

code = code.replace(
  'span className="text-slate-600">\n                    We envision a future',
  'span className="text-slate-600 flex-1 text-justify [text-align-last:left]">\n                    We envision a future'
);

code = code.replace(
  'span className="text-slate-600">\n                    Our ambition is to build',
  'span className="text-slate-600 flex-1 text-justify [text-align-last:left]">\n                    Our ambition is to build'
);

code = code.replace(
  'p className="mt-0.5 text-slate-600">',
  'p className="mt-0.5 text-slate-600 text-justify [text-align-last:left]">'
);

fs.writeFileSync('frontend/src/routes/about.tsx', code, 'utf8');
console.log('Updated frontend/src/routes/about.tsx');

