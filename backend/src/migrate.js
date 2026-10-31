import { syncDatabaseSchema, pool } from "./db.js";

console.log("[Deployment Migration] Starting automatic schema synchronization...");

syncDatabaseSchema()
  .then((res) => {
    if (res.success) {
      console.log("[Deployment Migration] Completed successfully: all tables and columns are created/synced.");
    } else {
      console.warn("[Deployment Migration] Finished with note:", res.error);
    }
  })
  .catch((err) => {
    console.warn("[Deployment Migration] Process note:", err.message);
  })
  .finally(() => {
    pool.end().catch(() => {});
    process.exit(0);
  });
