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

async function runPrerender() {
  const port = '3099';
  console.log('[Prerender] Starting temporary Nitro SSR server on port ' + port + '...');

  const server = spawn('node', ['frontend/.output/server/index.mjs'], {
    env: { ...process.env, PORT: port }
  });

  let serverStarted = false;

  server.stdout.on('data', (d) => {
    const msg = d.toString();
    if (msg.includes('Listening') && !serverStarted) {
      serverStarted = true;
      setTimeout(async () => {
        try {
          for (const route of routes) {
            const url = `http://localhost:${port}${route}`;
            const res = await fetch(url);
            if (res.ok) {
              const html = await res.text();
              const cleanPath = route === '/' ? 'index.html' : path.join(route.replace(/^\//, ''), 'index.html');
              const fullOut = path.join(__dirname, '../frontend/.output/public', cleanPath);
              fs.mkdirSync(path.dirname(fullOut), { recursive: true });
              fs.writeFileSync(fullOut, html, 'utf8');
              console.log(`[Prerender] ✓ ${route} -> ${cleanPath} (${html.length} bytes)`);
            } else {
              console.warn(`[Prerender] ✗ ${route} returned status ${res.status}`);
            }
          }
          console.log('[Prerender] Complete: All routes prerendered successfully.');
        } catch (err) {
          console.error('[Prerender] Error during rendering:', err);
        } finally {
          server.kill();
          process.exit(0);
        }
      }, 500);
    }
  });

  server.stderr.on('data', (d) => {
    const msg = d.toString();
    if (!msg.includes('ECONNREFUSED')) {
      console.warn('[Prerender Notice]', msg.trim());
    }
  });

  setTimeout(() => {
    if (!serverStarted) {
      console.error('[Prerender] Timeout waiting for server startup.');
      server.kill();
      process.exit(0);
    }
  }, 10000);
}

runPrerender();

