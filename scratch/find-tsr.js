const fs = require('fs');
const code = fs.readFileSync('frontend/.output/public/assets/index-Bg1yl2Mf.js', 'utf8');
const regex = /\$_TSR/g;
let m;
while ((m = regex.exec(code)) !== null) {
  console.log('--- Found at index ' + m.index + ' ---');
  console.log(code.substring(Math.max(0, m.index - 80), Math.min(code.length, m.index + 120)));
}

