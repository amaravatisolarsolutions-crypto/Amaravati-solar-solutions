import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'frontend/.output/public');

async function main() {
  console.log('[Build Static] Starting static generation...');

  // 1. Copy all static files and assets from frontend/.output/public to root
  if (fs.existsSync(publicDir)) {
    console.log(`[Build Static] Copying assets from ${publicDir} to ${rootDir}`);
    fs.cpSync(publicDir, rootDir, { recursive: true, force: true });
  }

  // 2. Start server to render routes
  console.log('[Build Static] Booting server to prerender pages...');
  const serverPath = path.resolve(rootDir, 'frontend/.output/server/index.mjs');
  await import(`file://${serverPath.replace(/\\/g, '/')}`);

  const port = process.env.PORT || 3000;
  const baseUrl = `http://127.0.0.1:${port}`;

  // Wait 1.5 seconds for server to start listening
  await new Promise((r) => setTimeout(r, 1500));

  const routes = [
    '/',
    '/about',
    '/contact',
    '/book-a-demo',
    '/services',
    '/projects',
    '/privacy',
    '/terms',
    '/admin',
    '/login',
  ];

  for (const route of routes) {
    try {
      const url = `${baseUrl}${route}`;
      const res = await fetch(url);
      if (res.ok) {
        const html = await res.text();
        const targetDir = route === '/' ? rootDir : path.resolve(rootDir, route.slice(1));
        fs.mkdirSync(targetDir, { recursive: true });
        const filePath = path.resolve(targetDir, 'index.html');
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`[Build Static] Successfully generated: ${filePath}`);
      } else {
        console.warn(`[Build Static] Route ${route} returned status ${res.status}`);
      }
    } catch (err) {
      console.error(`[Build Static] Failed to prerender ${route}:`, err.message);
    }
  }

  console.log('[Build Static] Static generation complete!');
  process.exit(0);
}

main().catch((err) => {
  console.error('[Build Static] Fatal error:', err);
  process.exit(1);
});
