const { createServer } = require('http');
async function test() {
  const mod = await import('../frontend/.output/server/index.mjs');
  console.log('Nitro exported:', Object.keys(mod));
  // Let's test fetch on the handler
  const req = new Request('http://localhost:3000/');
  const res = await mod.default.fetch(req);
  console.log('Status for /:', res.status);
  console.log('Content-Type:', res.headers.get('content-type'));
  const html = await res.text();
  console.log('HTML preview (first 500 chars):', html.substring(0, 500));
  console.log('Does HTML contain $_TSR?', html.includes('$_TSR'));
  if (html.includes('$_TSR')) {
    const idx = html.indexOf('$_TSR');
    console.log('TSR snippet in HTML:', html.substring(idx - 50, idx + 200));
  }
}
test().catch(console.error);

