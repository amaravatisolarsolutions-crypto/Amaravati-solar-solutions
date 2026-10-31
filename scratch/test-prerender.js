const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const routes = [
  '/',
  '/about',
  '/contact',
  '/services',
  '/projects',
  '/book-a-demo',
  '/privacy',
  '/terms',
  '/admin',
  '/admin/login'
];

async function prerender() {
  const port = '3099';
  const server = spawn('node', ['frontend/.output/server/index.mjs'], {
    env: { ...process.env, PORT: port }
  });

  server.stdout.on('data', (d) => {
    const msg = d.toString();
    if (msg.includes('Listening')) {
      setTimeout(async () => {
        try {
          for (const route of routes) {
            const url = `http://localhost:${port}${route}`;
            const res = await fetch(url);
            if (res.ok) {
              const html = await res.text();
              const cleanPath = route === '/' ? '/index.html' : `${route}/index.html`;
              const fullOut = path.join(__dirname, '../frontend/.output/public', cleanPath);
              fs.mkdirSync(path.dirname(fullOut), { recursive: true });
              fs.writeFileSync(fullOut, html, 'utf8');
              console.log(`✓ Prerendered ${route} -> ${cleanPath} (${html.length} bytes)`);
            } else {
              console.warn(`✗ Route ${route} returned status ${res.status}`);
            }
          }
        } catch (err) {
          console.error('Prerender error:', err);
        } finally {
          server.kill();
          process.exit(0);
        }
      }, 500);
    }
  });

  server.stderr.on('data', (d) => console.error(d.toString()));
}

prerender();

