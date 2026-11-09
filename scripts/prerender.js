const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const routes = [
  '/',
  '/about',
  '/contact',
  '/services',
  '/services/on-grid-solar-systems',
  '/services/off-grid-solar-systems',
  '/services/hybrid-solar-systems',
  '/process',
  '/powercare',
  '/one-point-of-contact',
  '/power-back-promise',
  '/projects',
  '/solar-solutions',
  '/solar-calculator',
  '/book-a-demo',
  '/privacy',
  '/terms',
  '/admin',
  '/admin/login'
];

function copyFolderRecursiveSync(source, target) {
  if (!fs.existsSync(source)) return;
  if (!fs.existsSync(target)) fs.mkdirSync(target, { recursive: true });

  const files = fs.readdirSync(source, { withFileTypes: true });
  for (const file of files) {
    const curSource = path.join(source, file.name);
    const curTarget = path.join(target, file.name);
    if (file.isDirectory()) {
      copyFolderRecursiveSync(curSource, curTarget);
    } else {
      fs.copyFileSync(curSource, curTarget);
    }
  }
}

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
          const distDir = path.join(__dirname, '../frontend/dist');
          const outputPubDir = path.join(__dirname, '../frontend/.output/public');

          // Copy all public static assets to dist first
          copyFolderRecursiveSync(outputPubDir, distDir);

          for (const route of routes) {
            const url = `http://localhost:${port}${route}`;
            const res = await fetch(url);
            if (res.ok) {
              const html = await res.text();
              const cleanPath = route === '/' ? 'index.html' : path.join(route.replace(/^\//, ''), 'index.html');
              
              // Write to frontend/dist/
              const distOut = path.join(distDir, cleanPath);
              fs.mkdirSync(path.dirname(distOut), { recursive: true });
              fs.writeFileSync(distOut, html, 'utf8');

              // Also write to frontend/.output/public/
              const outputOut = path.join(outputPubDir, cleanPath);
              fs.mkdirSync(path.dirname(outputOut), { recursive: true });
              fs.writeFileSync(outputOut, html, 'utf8');

              // Also write to root directory for direct Hostinger/Apache static serving
              const rootOut = path.join(__dirname, '..', cleanPath);
              fs.mkdirSync(path.dirname(rootOut), { recursive: true });
              fs.writeFileSync(rootOut, html, 'utf8');

              console.log(`[Prerender] ✓ ${route} -> frontend/dist/${cleanPath} and root (${html.length} bytes)`);
            } else {
              console.warn(`[Prerender] ✗ ${route} returned status ${res.status}`);
            }
          }

          // Mirror assets to root assets/ directory for direct server access
          const rootAssetsDir = path.join(__dirname, '../assets');
          const distAssetsDir = path.join(distDir, 'assets');
          if (fs.existsSync(distAssetsDir)) {
            copyFolderRecursiveSync(distAssetsDir, rootAssetsDir);
            console.log('[Prerender] Assets synced to root /assets directory.');
          }

          // Copy common static root files
          [
            'favicon.ico',
            'favicon.png',
            'favicon-48x48.png',
            'favicon-96x96.png',
            'favicon-144x144.png',
            'favicon-192x192.png',
            'favicon-512x512.png',
            'apple-touch-icon.png',
            'site.webmanifest',
            'logo.png',
            'robots.txt',
            'sitemap.xml',
            'googledfef471ef71211f1.html'
          ].forEach((f) => {
            const src = path.join(distDir, f);
            const dst = path.join(__dirname, '..', f);
            if (fs.existsSync(src)) {
              fs.copyFileSync(src, dst);
            }
          });

          console.log('[Prerender] Complete: All routes prerendered into frontend/dist and root successfully.');
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
