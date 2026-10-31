const fs = require('fs');
const path = require('path');
function search(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory() && f.name !== '.git') {
      search(full);
    } else if (f.isFile() && (f.name.endsWith('.js') || f.name.endsWith('.ts') || f.name.endsWith('.mjs'))) {
      try {
        const c = fs.readFileSync(full, 'utf8');
        if (c.includes('$_TSR')) {
          console.log('Match in:', full);
          // Print snippet
          const idx = c.indexOf('$_TSR');
          console.log(c.substring(Math.max(0, idx - 100), Math.min(c.length, idx + 200)));
          console.log('---');
        }
      } catch(e) {}
    }
  }
}
search('frontend/node_modules/@tanstack');

