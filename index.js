import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Force binding to 0.0.0.0 so Hostinger reverse proxy can reach the process
process.env.HOST = process.env.HOST || '0.0.0.0';
process.env.NITRO_HOST = process.env.NITRO_HOST || '0.0.0.0';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const candidate1 = path.resolve(__dirname, 'frontend/.output/server/index.mjs');
const candidate2 = path.resolve(__dirname, '.output/server/index.mjs');

let target = null;
if (fs.existsSync(candidate1)) {
  target = candidate1;
} else if (fs.existsSync(candidate2)) {
  target = candidate2;
}

if (target) {
  console.log(`[Hostinger Starter] Target: ${target}`);
  console.log(`[Hostinger Starter] PORT: ${process.env.PORT || 3000}, HOST: ${process.env.HOST}`);
  await import(pathToFileURL(target).href);
} else {
  console.error(`[Hostinger Starter] Server bundle not found in ${candidate1} or ${candidate2}`);
  process.exit(1);
}
