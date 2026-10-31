const fs = require('fs');
const html = fs.readFileSync('frontend/.output/public/index.html', 'utf8');
const match = html.match(/<script data-tsr-stream-part=\"\">([\s\S]*?)<\/script>/);
if (match) {
  fs.writeFileSync('scratch/exact-tsr-script.html', match[0], 'utf8');
  console.log('Saved exact TSR script, length:', match[0].length);
  console.log(match[0]);
}

