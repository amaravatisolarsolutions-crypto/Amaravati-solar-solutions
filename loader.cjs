// loader.cjs - CommonJS wrapper for Hostinger Node environments
(async () => {
  try {
    await import('./index.js');
  } catch (err) {
    console.error('[Hostinger Loader Error]', err);
    process.exit(1);
  }
})();
