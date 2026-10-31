<?php
// =========================================================================
// Amaravati Solar Solutions - Universal Hostinger Production Bridge
// Handles:
//  1. Automatic Database Migration (Tables & Columns) on live server
//  2. Live REST API for Form Submissions & CRUD operations
//  3. Static Asset delivery (CSS, JS, Images) from frontend/.output/public
//  4. Frontend SPA / SSR client mounting for all website routes
// =========================================================================

// Include database auto-migrator
require_once __DIR__ . '/backend/setup-db.php';

// Auto-run schema migration on every new deployment (tracks file modification time)
$dbVersion = @filemtime(__DIR__ . '/backend/setup-db.php') ?: 1;
$dbFlag = __DIR__ . '/.db_synced_' . $dbVersion;
if (!file_exists($dbFlag)) {
    $res = runAutoMigration();
    if ($res['success']) {
        @file_put_contents($dbFlag, date('c') . " - Host: " . ($res['host'] ?? '') . " - DB: " . ($res['database'] ?? ''));
    }
}

$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// -------------------------------------------------------------------------
// 1. API: Database Initialization / Verification Webhook
// -------------------------------------------------------------------------
if ($uri === '/api/debug-files') {
    header('Content-Type: application/json');
    echo json_encode([
        '__DIR__' => __DIR__,
        'frontend_exists' => is_dir(__DIR__ . '/frontend'),
        'output_exists' => is_dir(__DIR__ . '/frontend/.output'),
        'public_exists' => is_dir(__DIR__ . '/frontend/.output/public'),
        'contact_html' => file_exists(__DIR__ . '/frontend/.output/public/contact/index.html'),
        'root_html' => file_exists(__DIR__ . '/frontend/.output/public/index.html'),
        'files_in_frontend' => is_dir(__DIR__ . '/frontend') ? scandir(__DIR__ . '/frontend') : []
    ], JSON_PRETTY_PRINT);
    exit;
}

if ($uri === '/api/init-db' || $uri === '/setup-db.php' || $uri === '/migrate') {
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    $result = runAutoMigration();
    if (!$result['success']) {
        http_response_code(500);
    }
    echo json_encode($result, JSON_PRETTY_PRINT);
    exit;
}

// -------------------------------------------------------------------------
// 2. API: Live Form Handlers & CRUD Endpoints
// -------------------------------------------------------------------------
if (strpos($uri, '/api/') === 0) {
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');

    if ($method === 'OPTIONS') {
        http_response_code(204);
        exit;
    }

    $connInfo = getDatabaseConnection();
    if (!$connInfo['success']) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Database connection failed: ' . $connInfo['error']]);
        exit;
    }
    $mysqli = $connInfo['mysqli'];

    // --- Bookings Endpoint ---
    if ($uri === '/api/bookings' || $uri === '/api/demo-bookings') {
        if ($method === 'POST') {
            $raw = file_get_contents('php://input');
            $data = json_decode($raw, true) ?: $_POST;

            $reference = 'BK-' . date('Ymd') . '-' . strtoupper(substr(bin2hex(random_bytes(3)), 0, 6));
            $fullName = trim($data['fullName'] ?? ($data['full_name'] ?? ''));
            $phone = trim($data['phone'] ?? '');
            $email = trim($data['email'] ?? '');
            $customerType = trim($data['customerType'] ?? ($data['customer_type'] ?? 'Residential'));
            $solution = trim($data['solution'] ?? 'On-Grid Solar');
            $propertyType = trim($data['propertyType'] ?? ($data['property_type'] ?? 'Independent House'));
            $city = trim($data['city'] ?? 'Amaravati');
            $preferredDate = !empty($data['preferredDate'] ?? ($data['preferred_date'] ?? null)) ? date('Y-m-d', strtotime($data['preferredDate'] ?? $data['preferred_date'])) : null;
            $preferredTime = trim($data['preferredTime'] ?? ($data['preferred_time'] ?? '10:00 AM - 01:00 PM'));
            $requirements = trim($data['requirements'] ?? '');

            if (!$fullName || !$phone) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Name and phone are required.']);
                exit;
            }

            $stmt = $mysqli->prepare("INSERT INTO `demo_bookings` (`reference`, `full_name`, `phone`, `email`, `customer_type`, `solution`, `property_type`, `city`, `preferred_date`, `preferred_time`, `requirements`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')");
            $stmt->bind_param("sssssssssss", $reference, $fullName, $phone, $email, $customerType, $solution, $propertyType, $city, $preferredDate, $preferredTime, $requirements);

            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'reference' => $reference, 'message' => 'Demo booking submitted successfully!']);
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'error' => $stmt->error]);
            }
            $stmt->close();
            $mysqli->close();
            exit;
        }

        if ($method === 'GET') {
            $res = $mysqli->query("SELECT * FROM `demo_bookings` ORDER BY `id` DESC LIMIT 100");
            $rows = [];
            while ($r = $res->fetch_assoc()) {
                $rows[] = $r;
            }
            echo json_encode(['success' => true, 'data' => $rows]);
            $mysqli->close();
            exit;
        }

        if ($method === 'PUT' || $method === 'PATCH') {
            $raw = file_get_contents('php://input');
            $data = json_decode($raw, true) ?: $_POST;
            $ref = trim($data['reference'] ?? ($data['id'] ?? ''));
            $status = trim($data['status'] ?? 'pending');
            if ($ref) {
                $stmt = $mysqli->prepare("UPDATE `demo_bookings` SET `status` = ? WHERE `reference` = ? OR `id` = ?");
                $stmt->bind_param("sss", $status, $ref, $ref);
                $stmt->execute();
                $stmt->close();
                echo json_encode(['success' => true, 'message' => 'Booking updated']);
            } else {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Invalid reference']);
            }
            $mysqli->close();
            exit;
        }
    }

    // --- Enquiries Endpoint ---
    if ($uri === '/api/enquiries' || $uri === '/api/contact') {
        if ($method === 'POST') {
            $raw = file_get_contents('php://input');
            $data = json_decode($raw, true) ?: $_POST;

            $fullName = trim($data['fullName'] ?? ($data['full_name'] ?? ''));
            $phone = trim($data['phone'] ?? '');
            $email = trim($data['email'] ?? '');
            $customerType = trim($data['customerType'] ?? ($data['customer_type'] ?? 'Residential'));
            $service = trim($data['service'] ?? 'Rooftop Solar');
            $city = trim($data['city'] ?? 'Amaravati');
            $message = trim($data['message'] ?? '');

            if (!$fullName || !$phone) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Name and phone are required.']);
                exit;
            }

            $stmt = $mysqli->prepare("INSERT INTO `enquiries` (`full_name`, `phone`, `email`, `customer_type`, `service`, `city`, `message`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?, 'New')");
            $stmt->bind_param("sssssss", $fullName, $phone, $email, $customerType, $service, $city, $message);

            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'id' => $stmt->insert_id, 'message' => 'Enquiry submitted successfully!']);
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'error' => $stmt->error]);
            }
            $stmt->close();
            $mysqli->close();
            exit;
        }

        if ($method === 'GET') {
            $res = $mysqli->query("SELECT * FROM `enquiries` ORDER BY `id` DESC LIMIT 100");
            $rows = [];
            while ($r = $res->fetch_assoc()) {
                $rows[] = $r;
            }
            echo json_encode(['success' => true, 'data' => $rows]);
            $mysqli->close();
            exit;
        }

        if ($method === 'PUT' || $method === 'PATCH') {
            $raw = file_get_contents('php://input');
            $data = json_decode($raw, true) ?: $_POST;
            $id = (int)($data['id'] ?? 0);
            $status = trim($data['status'] ?? 'New');
            if ($id > 0) {
                $stmt = $mysqli->prepare("UPDATE `enquiries` SET `status` = ? WHERE `id` = ?");
                $stmt->bind_param("si", $status, $id);
                $stmt->execute();
                $stmt->close();
                echo json_encode(['success' => true, 'message' => 'Status updated']);
            } else {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Invalid ID']);
            }
            $mysqli->close();
            exit;
        }

        if ($method === 'DELETE') {
            $id = (int)($_GET['id'] ?? 0);
            if (!$id) {
                $raw = file_get_contents('php://input');
                $data = json_decode($raw, true) ?: [];
                $id = (int)($data['id'] ?? 0);
            }
            if ($id > 0) {
                $stmt = $mysqli->prepare("DELETE FROM `enquiries` WHERE `id` = ?");
                $stmt->bind_param("i", $id);
                $stmt->execute();
                $stmt->close();
                echo json_encode(['success' => true, 'message' => 'Enquiry deleted']);
            } else {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Invalid ID']);
            }
            $mysqli->close();
            exit;
        }
    }

    // --- Services Endpoint ---
    if ($uri === '/api/services') {
        $res = $mysqli->query("SELECT * FROM `services` WHERE `status` = 'Active' ORDER BY `service_order` ASC");
        $rows = [];
        while ($r = $res->fetch_assoc()) {
            $rows[] = $r;
        }
        echo json_encode(['success' => true, 'data' => $rows]);
        $mysqli->close();
        exit;
    }

    // --- Projects Endpoint ---
    if ($uri === '/api/projects') {
        $res = $mysqli->query("SELECT * FROM `projects` ORDER BY `id` DESC");
        $rows = [];
        while ($r = $res->fetch_assoc()) {
            $rows[] = $r;
        }
        echo json_encode(['success' => true, 'data' => $rows]);
        $mysqli->close();
        exit;
    }

    $mysqli->close();
}

// -------------------------------------------------------------------------
// 3. Static Asset Delivery (CSS, JS, Images, Fonts)
// -------------------------------------------------------------------------
$assetRoots = [
    __DIR__ . '/frontend/.output/public',
    __DIR__ . '/frontend/public',
    __DIR__
];

$cleanUri = urldecode($uri);

foreach ($assetRoots as $root) {
    $filePath = realpath($root . $cleanUri);
    if ($filePath && is_file($filePath) && strpos($filePath, __DIR__) === 0) {
        $ext = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
        $mimes = [
            'css'   => 'text/css; charset=UTF-8',
            'js'    => 'application/javascript; charset=UTF-8',
            'mjs'   => 'application/javascript; charset=UTF-8',
            'json'  => 'application/json; charset=UTF-8',
            'png'   => 'image/png',
            'jpg'   => 'image/jpeg',
            'jpeg'  => 'image/jpeg',
            'svg'   => 'image/svg+xml',
            'webp'  => 'image/webp',
            'gif'   => 'image/gif',
            'ico'   => 'image/x-icon',
            'woff'  => 'font/woff',
            'woff2' => 'font/woff2',
            'ttf'   => 'font/ttf',
            'pdf'   => 'application/pdf',
        ];

        if (isset($mimes[$ext])) {
            header('Content-Type: ' . $mimes[$ext]);
        }
        header('Cache-Control: public, max-age=31536000, immutable');
        readfile($filePath);
        exit;
    }
}

// -------------------------------------------------------------------------
// 4. Serve Pre-Rendered Full SSR HTML Pages (Fast & Hydration-Safe)
// -------------------------------------------------------------------------
$routePath = trim($cleanUri, '/');
$htmlCandidates = [
    __DIR__ . '/frontend/.output/public/' . $routePath . '/index.html',
    __DIR__ . '/frontend/.output/public/' . $routePath . '.html',
    __DIR__ . '/frontend/.output/public/index.html'
];

foreach ($htmlCandidates as $htmlFile) {
    if (file_exists($htmlFile) && is_file($htmlFile) && filesize($htmlFile) > 100) {
        header('Content-Type: text/html; charset=UTF-8');
        header('Cache-Control: public, max-age=3600');
        readfile($htmlFile);
        exit;
    }
}

// -------------------------------------------------------------------------
// 5. Fallback HTML Application Renderer with TanStack Start Bootstrap
// -------------------------------------------------------------------------
$assetsDir = __DIR__ . '/frontend/.output/public/assets';
$cssFiles = glob($assetsDir . '/*.css') ?: [];
$jsFiles  = glob($assetsDir . '/index-*.js') ?: (glob($assetsDir . '/*.js') ?: []);

$cssUrl = !empty($cssFiles) ? '/assets/' . basename($cssFiles[0]) : '';
$jsUrl  = !empty($jsFiles)  ? '/assets/' . basename($jsFiles[0])  : '';

header('Content-Type: text/html; charset=UTF-8');
header('Cache-Control: no-cache, must-revalidate');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Amaravati Solar Solutions - Smart, Reliable, Sustainable Energy</title>
    <meta name="description" content="Smart, reliable and sustainable solar energy solutions for homes, businesses and industries across Amaravati and Andhra Pradesh.">
    <link rel="icon" type="image/png" href="/favicon.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap">
    <?php if ($cssUrl): ?>
    <link rel="stylesheet" href="<?php echo htmlspecialchars($cssUrl); ?>">
    <?php endif; ?>
</head>
<body class="bg-background text-foreground antialiased">
    <div id="root"></div>
    <script data-tsr-stream-part="">
    (self.$R=self.$R||{})["tsr"]=[];
    self.$_TSR={h(){this.hydrated=!0,this.c()},e(){this.streamEnded=!0,this.c()},c(){this.hydrated&&this.streamEnded&&(delete self.$_TSR,delete self.$R.tsr)},p(e){this.initialized?e():this.buffer.push(e)},buffer:[]};
    $_TSR.router=($R=>$R[0]={manifest:$R[1]={routes:{__root__:{scripts:[{attrs:{type:"module",async:!0,src:"<?php echo $jsUrl; ?>"}}]}}},matches:[{i:"__root__ ",s:"success",ssr:!0}]})($R["tsr"]);
    $_TSR.e();
    </script>
    <?php if ($jsUrl): ?>
    <script type="module" src="<?php echo htmlspecialchars($jsUrl); ?>"></script>
    <?php endif; ?>
</body>
</html>
