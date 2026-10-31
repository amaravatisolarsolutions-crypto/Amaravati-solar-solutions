const { spawn } = require('child_process');

process.env.PORT = '3044';
const server = spawn('node', ['frontend/.output/server/index.mjs'], {
  env: { ...process.env, PORT: '3044' }
});

server.stdout.on('data', (d) => {
  const msg = d.toString();
  if (msg.includes('Listening')) {
    setTimeout(async () => {
      try {
        const res = await fetch('http://localhost:3044/');
        console.log('Status:', res.status);
        const html = await res.text();
        console.log('--- Rendered HTML (first 2000 chars) ---');
        console.log(html.substring(0, 2000));
        console.log('--- Look for scripts ---');
        const scripts = html.match(/<script[\s\S]*?<\/script>/gi) || [];
        scripts.forEach((s, i) => console.log(`Script ${i}:`, s));
      } catch (e) {
        console.error('Fetch error:', e);
      } finally {
        server.kill();
        process.exit(0);
      }
    }, 500);
  }
});

server.stderr.on('data', (d) => console.error('Server err:', d.toString()));

