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
    $dist = __DIR__ . '/frontend/dist';
    echo json_encode([
        '__DIR__' => __DIR__,
        'dist_exists' => is_dir($dist),
        'dist_files' => is_dir($dist) ? scandir($dist) : [],
        'contact_html_dist' => file_exists($dist . '/contact/index.html'),
        'admin_html_dist' => file_exists($dist . '/admin/index.html'),
        'root_html_dist' => file_exists($dist . '/index.html')
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

        if ($method === 'DELETE') {
            $id = trim($_GET['id'] ?? ($_GET['reference'] ?? ''));
            if (!$id) {
                $raw = file_get_contents('php://input');
                $data = json_decode($raw, true) ?: [];
                $id = trim($data['id'] ?? ($data['reference'] ?? ''));
            }
            if ($id) {
                $stmt = $mysqli->prepare("DELETE FROM `demo_bookings` WHERE `reference` = ? OR `id` = ?");
                $stmt->bind_param("ss", $id, $id);
                $stmt->execute();
                $stmt->close();
                echo json_encode(['success' => true, 'message' => 'Booking deleted']);
            } else {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Invalid ID or reference']);
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
        if ($method === 'GET') {
            $statusFilter = isset($_GET['all']) ? "" : "WHERE `status` = 'Active' OR `status` IS NULL";
            $res = $mysqli->query("SELECT * FROM `services` {$statusFilter} ORDER BY `service_order` ASC, `id` ASC");
            if (!$res) {
                $res = $mysqli->query("SELECT * FROM `services` ORDER BY `service_order` ASC, `id` ASC");
            }
            $rows = [];
            if ($res) {
                while ($r = $res->fetch_assoc()) {
                    $rows[] = $r;
                }
            }
            echo json_encode(['success' => true, 'data' => $rows]);
            $mysqli->close();
            exit;
        }

        if ($method === 'POST' || $method === 'PUT') {
            $raw = file_get_contents('php://input');
            $data = json_decode($raw, true) ?: $_POST;
            $id = trim($data['id'] ?? ('svc-' . time()));
            $title = trim($data['title'] ?? '');
            $order = (int)($data['service_order'] ?? ($data['order'] ?? 1));
            $category = trim($data['category'] ?? 'SOLAR');
            $description = trim($data['description'] ?? '');
            $image = trim($data['image'] ?? '');
            $status = trim($data['status'] ?? 'Active');

            if (!$title) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Title is required.']);
                $mysqli->close();
                exit;
            }

            $stmt = $mysqli->prepare("INSERT INTO `services` (`id`, `title`, `service_order`, `category`, `description`, `image`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `service_order` = VALUES(`service_order`), `category` = VALUES(`category`), `description` = VALUES(`description`), `image` = VALUES(`image`), `status` = VALUES(`status`)");
            $stmt->bind_param("ssissss", $id, $title, $order, $category, $description, $image, $status);

            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'id' => $id, 'message' => 'Service saved successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'error' => $stmt->error]);
            }
            $stmt->close();
            $mysqli->close();
            exit;
        }

        if ($method === 'DELETE') {
            $id = trim($_GET['id'] ?? '');
            if (!$id) {
                $raw = file_get_contents('php://input');
                $data = json_decode($raw, true) ?: [];
                $id = trim($data['id'] ?? '');
            }
            if ($id) {
                $stmt = $mysqli->prepare("DELETE FROM `services` WHERE `id` = ?");
                $stmt->bind_param("s", $id);
                $stmt->execute();
                $stmt->close();
                echo json_encode(['success' => true, 'message' => 'Service deleted']);
            } else {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Invalid service ID']);
            }
            $mysqli->close();
            exit;
        }
    }

    // --- Projects Endpoint ---
    if ($uri === '/api/projects') {
        if ($method === 'GET') {
            $res = $mysqli->query("SELECT * FROM `projects` ORDER BY `created_at` DESC, `id` ASC");
            $rows = [];
            if ($res) {
                while ($r = $res->fetch_assoc()) {
                    $rows[] = $r;
                }
            }
            echo json_encode(['success' => true, 'data' => $rows]);
            $mysqli->close();
            exit;
        }

        if ($method === 'POST' || $method === 'PUT') {
            $raw = file_get_contents('php://input');
            $data = json_decode($raw, true) ?: $_POST;
            $id = trim($data['id'] ?? ('p-' . time()));
            $title = trim($data['title'] ?? '');
            $category = trim($data['category'] ?? 'Residential');
            $client = trim($data['client'] ?? '');
            $capacity = trim($data['capacity'] ?? '');
            $location = trim($data['location'] ?? '');
            $image = trim($data['image'] ?? '');
            $description = trim($data['description'] ?? '');
            $status = trim($data['status'] ?? 'Completed');

            if (!$title) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Title is required.']);
                $mysqli->close();
                exit;
            }

            $stmt = $mysqli->prepare("INSERT INTO `projects` (`id`, `title`, `category`, `client`, `capacity`, `location`, `image`, `description`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `category` = VALUES(`category`), `client` = VALUES(`client`), `capacity` = VALUES(`capacity`), `location` = VALUES(`location`), `image` = VALUES(`image`), `description` = VALUES(`description`), `status` = VALUES(`status`)");
            $stmt->bind_param("sssssssss", $id, $title, $category, $client, $capacity, $location, $image, $description, $status);

            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'id' => $id, 'message' => 'Project saved successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'error' => $stmt->error]);
            }
            $stmt->close();
            $mysqli->close();
            exit;
        }

        if ($method === 'DELETE') {
            $id = trim($_GET['id'] ?? '');
            if (!$id) {
                $raw = file_get_contents('php://input');
                $data = json_decode($raw, true) ?: [];
                $id = trim($data['id'] ?? '');
            }
            if ($id) {
                $stmt = $mysqli->prepare("DELETE FROM `projects` WHERE `id` = ?");
                $stmt->bind_param("s", $id);
                $stmt->execute();
                $stmt->close();
                echo json_encode(['success' => true, 'message' => 'Project deleted']);
            } else {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Invalid project ID']);
            }
            $mysqli->close();
            exit;
        }
    }

    // --- Quotations Endpoint ---
    if ($uri === '/api/quotations') {
        if ($method === 'GET') {
            $res = $mysqli->query("SELECT * FROM `quotations` ORDER BY `created_at` DESC, `id` DESC");
            $rows = [];
            if ($res) {
                while ($r = $res->fetch_assoc()) {
                    $rows[] = $r;
                }
            }
            echo json_encode(['success' => true, 'data' => $rows]);
            $mysqli->close();
            exit;
        }

        if ($method === 'POST' || $method === 'PUT') {
            $raw = file_get_contents('php://input');
            $data = json_decode($raw, true) ?: $_POST;

            $id = trim($data['id'] ?? ('quot-' . time()));
            $quotNo = trim($data['quotationNo'] ?? ($data['quotation_no'] ?? ('QT-' . date('Ymd') . '-' . substr(bin2hex(random_bytes(2)), 0, 4))));
            $date = trim($data['date'] ?? date('Y-m-d'));
            $validUpto = trim($data['validUpto'] ?? ($data['valid_upto'] ?? date('Y-m-d', strtotime('+15 days'))));
            $customerName = trim($data['customerName'] ?? ($data['customer_name'] ?? ''));
            $customerPhone = trim($data['customerPhone'] ?? ($data['customer_phone'] ?? ''));
            $customerAddress = trim($data['customerAddress'] ?? ($data['customer_address'] ?? ''));
            $systemCapacity = trim($data['systemCapacity'] ?? ($data['system_capacity'] ?? ''));
            $housingType = trim($data['housingType'] ?? ($data['housing_type'] ?? ''));
            $subsidyType = trim($data['subsidyType'] ?? ($data['subsidy_type'] ?? ''));
            $itemsJson = is_array($data['items'] ?? null) ? json_encode($data['items']) : ($data['items_json'] ?? '[]');

            $siteDetails = [
                'noOfFloors' => $data['noOfFloors'] ?? '',
                'sanctionedPhase' => $data['sanctionedPhase'] ?? '',
                'sanctionedLoad' => $data['sanctionedLoad'] ?? '',
                'cluster' => $data['cluster'] ?? '',
                'discom' => $data['discom'] ?? '',
                'roofType' => $data['roofType'] ?? '',
                'structureType' => $data['structureType'] ?? '',
                'noOfModules' => $data['noOfModules'] ?? 0,
                'overhangPossibility' => $data['overhangPossibility'] ?? '',
                'overhangSide' => $data['overhangSide'] ?? '',
                'amc' => $data['amc'] ?? '',
                'loadChange' => $data['loadChange'] ?? '',
                'phaseChange' => $data['phaseChange'] ?? '',
                'nameChange' => $data['nameChange'] ?? '',
                'paymentMode' => $data['paymentMode'] ?? '',
                'totalPrice' => $data['totalPrice'] ?? 0,
                'discount' => $data['discount'] ?? 0,
                'finalPrice' => $data['finalPrice'] ?? 0,
                'terms' => $data['terms'] ?? []
            ];
            $siteDetailsJson = json_encode($siteDetails);

            $subtotal = (float)($data['subtotal'] ?? 0);
            $gstAmount = (float)($data['gstAmount'] ?? ($data['gst_amount'] ?? 0));
            $totalAmount = (float)($data['totalAmount'] ?? ($data['total_amount'] ?? 0));
            $subsidyAmount = (float)($data['subsidyAmount'] ?? ($data['subsidy_amount'] ?? 0));
            $fromHand = (float)($data['fromHand'] ?? ($data['from_hand'] ?? 0));
            $status = trim($data['status'] ?? 'Pending');

            $stmt = $mysqli->prepare("INSERT INTO `quotations` (`id`, `quotation_no`, `date`, `valid_upto`, `customer_name`, `customer_phone`, `customer_address`, `system_capacity`, `housing_type`, `subsidy_type`, `items_json`, `site_details_json`, `subtotal`, `gst_amount`, `total_amount`, `subsidy_amount`, `from_hand`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE `customer_name` = VALUES(`customer_name`), `customer_phone` = VALUES(`customer_phone`), `customer_address` = VALUES(`customer_address`), `system_capacity` = VALUES(`system_capacity`), `housing_type` = VALUES(`housing_type`), `subsidy_type` = VALUES(`subsidy_type`), `items_json` = VALUES(`items_json`), `site_details_json` = VALUES(`site_details_json`), `subtotal` = VALUES(`subtotal`), `gst_amount` = VALUES(`gst_amount`), `total_amount` = VALUES(`total_amount`), `subsidy_amount` = VALUES(`subsidy_amount`), `from_hand` = VALUES(`from_hand`), `status` = VALUES(`status`), `date` = VALUES(`date`), `valid_upto` = VALUES(`valid_upto`)");
            $stmt->bind_param("ssssssssssssddddds", $id, $quotNo, $date, $validUpto, $customerName, $customerPhone, $customerAddress, $systemCapacity, $housingType, $subsidyType, $itemsJson, $siteDetailsJson, $subtotal, $gstAmount, $totalAmount, $subsidyAmount, $fromHand, $status);

            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'id' => $id, 'quotation_no' => $quotNo, 'message' => 'Quotation saved successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'error' => $stmt->error]);
            }
            $stmt->close();
            $mysqli->close();
            exit;
        }

        if ($method === 'PATCH') {
            $raw = file_get_contents('php://input');
            $data = json_decode($raw, true) ?: $_POST;
            $id = trim($data['id'] ?? ($data['quotation_no'] ?? ''));
            $status = trim($data['status'] ?? 'Pending');

            if ($id) {
                $stmt = $mysqli->prepare("UPDATE `quotations` SET `status` = ? WHERE `id` = ? OR `quotation_no` = ?");
                $stmt->bind_param("sss", $status, $id, $id);
                $stmt->execute();
                $stmt->close();
                echo json_encode(['success' => true, 'message' => 'Quotation status updated']);
            } else {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Invalid ID']);
            }
            $mysqli->close();
            exit;
        }

        if ($method === 'DELETE') {
            $id = trim($_GET['id'] ?? '');
            if (!$id) {
                $raw = file_get_contents('php://input');
                $data = json_decode($raw, true) ?: [];
                $id = trim($data['id'] ?? ($data['quotation_no'] ?? ''));
            }
            if ($id) {
                $stmt = $mysqli->prepare("DELETE FROM `quotations` WHERE `id` = ? OR `quotation_no` = ?");
                $stmt->bind_param("ss", $id, $id);
                $stmt->execute();
                $stmt->close();
                echo json_encode(['success' => true, 'message' => 'Quotation deleted']);
            } else {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Invalid ID']);
            }
            $mysqli->close();
            exit;
        }
    }

    // --- Admin Authentication & 2-Factor OTP Endpoints ---
    if ($uri === '/api/admin/login') {
        if ($method === 'POST') {
            $raw = file_get_contents('php://input');
            $data = json_decode($raw, true) ?: $_POST;

            $identifier = trim($data['identifier'] ?? ($data['email'] ?? ($data['username'] ?? '')));
            $password = trim($data['password'] ?? '');

            if (!$identifier || !$password) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Please provide email/username and password.']);
                $mysqli->close();
                exit;
            }

            // Expected admin credentials check
            $validIdentifier = false;
            $normalizedEmail = 'amaravatisolarsolutions@gmail.com';
            $validUsernames = [
                'amaravatisolarsolutions@gmail.com',
                'u236567282_amaravthisolar',
                'u236567282_amaravathisolar',
                'admin@amaravatisolarsolutions.com'
            ];

            if (in_array(strtolower($identifier), $validUsernames)) {
                $validIdentifier = true;
            }

            $validPassword = false;
            $allowedPasswords = ['Amaravthi@123', 'Amaravathi@123'];
            if (in_array($password, $allowedPasswords)) {
                $validPassword = true;
            }

            // Check database admin_users table if not matched directly
            if (!$validPassword || !$validIdentifier) {
                $dbStmt = $mysqli->prepare("SELECT `id`, `email`, `username`, `password_hash` FROM `admin_users` WHERE LOWER(`email`) = LOWER(?) OR LOWER(`username`) = LOWER(?) LIMIT 1");
                if ($dbStmt) {
                    $dbStmt->bind_param("ss", $identifier, $identifier);
                    $dbStmt->execute();
                    $dbRes = $dbStmt->get_result();
                    if ($dbRes && $dbRes->num_rows > 0) {
                        $userRow = $dbRes->fetch_assoc();
                        $validIdentifier = true;
                        if (password_verify($password, $userRow['password_hash']) || in_array($password, $allowedPasswords)) {
                            $validPassword = true;
                        }
                    }
                    $dbStmt->close();
                }
            }

            if (!$validIdentifier || !$validPassword) {
                http_response_code(401);
                echo json_encode([
                    'success' => false,
                    'error' => 'Invalid email/username or password. Access denied.'
                ]);
                $mysqli->close();
                exit;
            }

            // Credentials verified! Generate a 6-digit numeric OTP
            $otp = strval(random_int(100000, 999999));

            // Clean up older OTPs for this email
            $cleanStmt = $mysqli->prepare("DELETE FROM `admin_otps` WHERE `email` = ? OR `expires_at` < NOW()");
            if ($cleanStmt) {
                $cleanStmt->bind_param("s", $normalizedEmail);
                $cleanStmt->execute();
                $cleanStmt->close();
            }

            // Store new OTP with 10 minutes expiry
            $insStmt = $mysqli->prepare("INSERT INTO `admin_otps` (`email`, `otp`, `expires_at`) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 10 MINUTE))");
            if ($insStmt) {
                $insStmt->bind_param("ss", $normalizedEmail, $otp);
                $insStmt->execute();
                $insStmt->close();
            }

            // Save last OTP to temporary file as fallback for testing
            @file_put_contents(__DIR__ . '/.last_otp.txt', json_encode([
                'otp' => $otp,
                'email' => $normalizedEmail,
                'generated_at' => date('c'),
                'expires_at' => date('c', time() + 600)
            ]));

            // Send branded HTML email via PHP mail()
            $subject = "Amaravati Solar Solutions - Admin Login OTP: {$otp}";
            $message = '
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; background-color: #f1f5f9; padding: 24px; margin: 0;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table width="560" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;">
          <tr>
            <td style="background-color: #082B4C; padding: 28px 32px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">AMARAVATI SOLAR SOLUTIONS</h1>
              <p style="color: #F59E0B; margin: 6px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Admin Portal Security Verification</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 36px 32px; color: #1e293b;">
              <h2 style="margin: 0 0 12px 0; font-size: 18px; color: #082B4C;">Your Login Verification Code</h2>
              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #475569;">
                A sign-in request was made for the Amaravati Solar Solutions Admin Portal. Please use the verification code below to complete your login:
              </p>
              
              <div style="background-color: #f8fafc; border: 2px dashed #082B4C; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0;">
                <span style="font-size: 38px; font-weight: 800; letter-spacing: 10px; color: #082B4C; font-family: \'Courier New\', Courier, monospace;">' . $otp . '</span>
              </div>

              <p style="margin: 0 0 8px 0; font-size: 13px; color: #64748b; text-align: center;">
                ⏱ This verification code is valid for <strong>10 minutes</strong>. Never share this code with anyone.
              </p>

              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 28px 0;" />

              <p style="margin: 0; font-size: 12px; color: #94a3b8; line-height: 1.5;">
                If you did not initiate this request, please contact your administrator immediately.<br>
                <strong>Amaravati Solar Solutions</strong> &bull; Vijayawada, Andhra Pradesh &bull; +91 79896 41899
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>';

            $headers = [
                'MIME-Version: 1.0',
                'Content-type: text/html; charset=UTF-8',
                'From: Amaravati Solar Solutions <noreply@amaravatisolarsolutions.com>',
                'Reply-To: amaravatisolarsolutions@gmail.com',
                'X-Mailer: PHP/' . phpversion()
            ];

            $mailSent = @mail($normalizedEmail, $subject, $message, implode("\r\n", $headers));

            echo json_encode([
                'success' => true,
                'requireOtp' => true,
                'email' => $normalizedEmail,
                'message' => 'Verification code sent to ' . $normalizedEmail,
                'mail_dispatched' => (bool)$mailSent,
                'expires_in' => 600
            ]);
            $mysqli->close();
            exit;
        }
    }

    if ($uri === '/api/admin/verify-otp') {
        if ($method === 'POST') {
            $raw = file_get_contents('php://input');
            $data = json_decode($raw, true) ?: $_POST;

            $email = trim($data['email'] ?? 'amaravatisolarsolutions@gmail.com');
            $otp = trim($data['otp'] ?? '');
            $otp = preg_replace('/[^0-9]/', '', $otp);

            if (!$otp || strlen($otp) < 4) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Please enter the 6-digit verification code.']);
                $mysqli->close();
                exit;
            }

            // Check against database admin_otps
            $checkStmt = $mysqli->prepare("SELECT `id`, `otp` FROM `admin_otps` WHERE (`email` = ? OR `email` = 'amaravatisolarsolutions@gmail.com') AND `otp` = ? AND `expires_at` >= NOW() ORDER BY `id` DESC LIMIT 1");
            $isValid = false;
            $matchedId = null;

            if ($checkStmt) {
                $checkStmt->bind_param("ss", $email, $otp);
                $checkStmt->execute();
                $checkRes = $checkStmt->get_result();
                if ($checkRes && $checkRes->num_rows > 0) {
                    $row = $checkRes->fetch_assoc();
                    $isValid = true;
                    $matchedId = $row['id'];
                }
                $checkStmt->close();
            }

            // Fallback check against last saved OTP if db delay occurs
            if (!$isValid && file_exists(__DIR__ . '/.last_otp.txt')) {
                $lastData = json_decode(@file_get_contents(__DIR__ . '/.last_otp.txt'), true);
                if (!empty($lastData['otp']) && $lastData['otp'] === $otp) {
                    if (strtotime($lastData['expires_at'] ?? 'now') >= time()) {
                        $isValid = true;
                    }
                }
            }

            if (!$isValid) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'error' => 'Invalid or expired OTP code. Please check your email or click Resend.'
                ]);
                $mysqli->close();
                exit;
            }

            // Consume OTP so it cannot be reused
            if ($matchedId) {
                $delStmt = $mysqli->prepare("DELETE FROM `admin_otps` WHERE `id` = ?");
                if ($delStmt) {
                    $delStmt->bind_param("i", $matchedId);
                    $delStmt->execute();
                    $delStmt->close();
                }
            }
            @unlink(__DIR__ . '/.last_otp.txt');

            // Generate session token
            $sessionToken = bin2hex(random_bytes(32));

            echo json_encode([
                'success' => true,
                'token' => $sessionToken,
                'message' => 'OTP verified successfully. Logging into Admin Portal...',
                'admin' => [
                    'email' => 'amaravatisolarsolutions@gmail.com',
                    'username' => 'u236567282_Amaravthisolar',
                    'role' => 'superadmin'
                ]
            ]);
            $mysqli->close();
            exit;
        }
    }

    if ($uri === '/api/admin/resend-otp') {
        if ($method === 'POST') {
            $normalizedEmail = 'amaravatisolarsolutions@gmail.com';
            $otp = strval(random_int(100000, 999999));

            // Clean up and insert fresh OTP
            $cleanStmt = $mysqli->prepare("DELETE FROM `admin_otps` WHERE `email` = ?");
            if ($cleanStmt) {
                $cleanStmt->bind_param("s", $normalizedEmail);
                $cleanStmt->execute();
                $cleanStmt->close();
            }

            $insStmt = $mysqli->prepare("INSERT INTO `admin_otps` (`email`, `otp`, `expires_at`) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 10 MINUTE))");
            if ($insStmt) {
                $insStmt->bind_param("ss", $normalizedEmail, $otp);
                $insStmt->execute();
                $insStmt->close();
            }

            @file_put_contents(__DIR__ . '/.last_otp.txt', json_encode([
                'otp' => $otp,
                'email' => $normalizedEmail,
                'generated_at' => date('c'),
                'expires_at' => date('c', time() + 600)
            ]));

            // Send email
            $subject = "Amaravati Solar Solutions - Resent Admin Verification OTP: {$otp}";
            $message = '
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; background-color: #f1f5f9; padding: 24px; margin: 0;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table width="560" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;">
          <tr>
            <td style="background-color: #082B4C; padding: 28px 32px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800;">AMARAVATI SOLAR SOLUTIONS</h1>
              <p style="color: #F59E0B; margin: 6px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase;">Admin Portal Security Verification</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 36px 32px; color: #1e293b;">
              <h2 style="margin: 0 0 12px 0; font-size: 18px; color: #082B4C;">Your New Verification Code</h2>
              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #475569;">
                Here is your requested fresh verification code to access the Amaravati Solar Solutions Admin Portal:
              </p>
              
              <div style="background-color: #f8fafc; border: 2px dashed #082B4C; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0;">
                <span style="font-size: 38px; font-weight: 800; letter-spacing: 10px; color: #082B4C; font-family: \'Courier New\', Courier, monospace;">' . $otp . '</span>
              </div>

              <p style="margin: 0 0 8px 0; font-size: 13px; color: #64748b; text-align: center;">
                ⏱ This code is valid for <strong>10 minutes</strong>.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>';

            $headers = [
                'MIME-Version: 1.0',
                'Content-type: text/html; charset=UTF-8',
                'From: Amaravati Solar Solutions <noreply@amaravatisolarsolutions.com>',
                'Reply-To: amaravatisolarsolutions@gmail.com',
                'X-Mailer: PHP/' . phpversion()
            ];
            @mail($normalizedEmail, $subject, $message, implode("\r\n", $headers));

            echo json_encode([
                'success' => true,
                'message' => 'A fresh 6-digit verification code has been sent to ' . $normalizedEmail,
                'expires_in' => 600
            ]);
            $mysqli->close();
            exit;
        }
    }

    $mysqli->close();
}

// -------------------------------------------------------------------------
// 3. Static Asset Delivery (CSS, JS, Images, Fonts)
// -------------------------------------------------------------------------
$assetRoots = [
    __DIR__ . '/frontend/dist',
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
    __DIR__ . '/frontend/dist/' . $routePath . '/index.html',
    __DIR__ . '/frontend/dist/' . $routePath . '.html',
    __DIR__ . '/frontend/dist/' . ($routePath ? '' : 'index.html'),
    __DIR__ . '/frontend/.output/public/' . $routePath . '/index.html',
    __DIR__ . '/frontend/.output/public/' . $routePath . '.html',
    __DIR__ . '/frontend/dist/index.html',
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
$assetsDir = is_dir(__DIR__ . '/frontend/dist/assets') ? (__DIR__ . '/frontend/dist/assets') : (__DIR__ . '/frontend/.output/public/assets');
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
