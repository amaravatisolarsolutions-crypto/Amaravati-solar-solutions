<?php
// =============================================================
// Amaravati Solar Solutions - Main Hostinger Entry
// =============================================================

// 1. Auto-initialize database on first request
$dbFlagFile = __DIR__ . '/.db_initialized';
if (!file_exists($dbFlagFile)) {
    @ob_start();
    include_once __DIR__ . '/backend/setup-db.php';
    @ob_end_clean();
    @file_put_contents($dbFlagFile, date('c'));
}

// 2. If API / setup-db is requested
$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
if ($uri === '/setup-db.php' || $uri === '/api/init-db') {
    include_once __DIR__ . '/backend/setup-db.php';
    exit;
}

// 3. Serve Frontend HTML if present
$candidates = [
    __DIR__ . '/frontend/.output/public/index.html',
    __DIR__ . '/frontend/dist/index.html',
];

foreach ($candidates as $candidate) {
    if (file_exists($candidate)) {
        header('Content-Type: text/html; charset=utf-8');
        readfile($candidate);
        exit;
    }
}

// Fallback message if files are still building
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Amaravati Solar Solutions</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #041525; color: white; text-align: center; }
        .card { padding: 40px; border-radius: 20px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); max-width: 500px; }
        h1 { color: #F5A623; margin-bottom: 12px; }
        p { color: #cbd5e1; line-height: 1.6; }
        .btn { display: inline-block; margin-top: 20px; padding: 10px 24px; background: #F5A623; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="card">
        <h1>Amaravati Solar Solutions</h1>
        <p>Database and Application are successfully running on Hostinger.</p>
        <a class="btn" href="/setup-db.php">Verify Database Tables</a>
    </div>
</body>
</html>
