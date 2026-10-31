<?php
// =========================================================================
// Amaravati Solar Solutions - Universal MySQL Database Engine & Auto-Migrator
// Target Database: u236567282_Amaravthisolar
// =========================================================================

/**
 * Attempts connection with multiple candidate usernames/db names
 * to account for case sensitivity on Hostinger Linux MySQL servers.
 */
function getDatabaseConnection() {
    $hostCandidates = ['localhost', '127.0.0.1'];
    $port = (int)(getenv('DB_PORT') ?: (getenv('PORT') === '3306' ? 3306 : 3306));
    $pass = getenv('DB_PASSWORD') ?: (getenv('PASSWORD') ?: 'Amaravathi@123');

    $userCandidates = array_values(array_unique(array_filter([
        'u236567282_Amaravthisolar',
        'u236567282_amaravthisolar',
        getenv('DB_USER'),
        getenv('USERNAME'),
        getenv('DB_USERNAME'),
        strtolower(getenv('DB_USER') ?: ''),
        strtolower(getenv('USERNAME') ?: '')
    ])));

    $dbCandidates = array_values(array_unique(array_filter([
        'u236567282_Amaravthisolar',
        'u236567282_amaravthisolar',
        getenv('DB_NAME'),
        getenv('DATABASE_NAME'),
        strtolower(getenv('DB_NAME') ?: ''),
        strtolower(getenv('DATABASE_NAME') ?: '')
    ])));

    $lastError = 'No connection attempted';

    foreach ($hostCandidates as $h) {
        foreach ($userCandidates as $u) {
            foreach ($dbCandidates as $d) {
                try {
                    $mysqli = @new mysqli($h, $u, $pass, $d, $port);
                    if (!$mysqli->connect_error) {
                        $mysqli->set_charset("utf8mb4");
                        return [
                            'success' => true,
                            'mysqli' => $mysqli,
                            'host' => $h,
                            'user' => $u,
                            'database' => $d
                        ];
                    }
                    $lastError = $mysqli->connect_error;
                } catch (\Throwable $t) {
                    $lastError = $t->getMessage();
                }
            }
        }
    }

    return [
        'success' => false,
        'mysqli' => null,
        'error' => $lastError
    ];
}

/**
 * Table Schemas Registry with Columns and Data Types
 */
function getSchemaRegistry() {
    return [
        "enquiries" => [
            "columns" => [
                "id" => "INT AUTO_INCREMENT PRIMARY KEY",
                "full_name" => "VARCHAR(255) NOT NULL",
                "phone" => "VARCHAR(50) NOT NULL",
                "email" => "VARCHAR(255) NOT NULL",
                "customer_type" => "VARCHAR(100) NOT NULL DEFAULT 'Residential'",
                "service" => "VARCHAR(100) NOT NULL DEFAULT 'Rooftop Solar'",
                "city" => "VARCHAR(100) NOT NULL DEFAULT 'Amaravati'",
                "message" => "TEXT NULL",
                "status" => "VARCHAR(50) NOT NULL DEFAULT 'New'",
                "notes" => "TEXT NULL",
                "created_at" => "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP",
                "updated_at" => "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
            ],
            "indexes" => [
                "idx_enquiries_status" => "KEY `idx_enquiries_status` (`status`)"
            ]
        ],
        "demo_bookings" => [
            "columns" => [
                "id" => "INT AUTO_INCREMENT PRIMARY KEY",
                "reference" => "VARCHAR(50) NOT NULL UNIQUE",
                "full_name" => "VARCHAR(255) NOT NULL",
                "phone" => "VARCHAR(50) NOT NULL",
                "email" => "VARCHAR(255) NOT NULL",
                "customer_type" => "VARCHAR(100) NOT NULL DEFAULT 'Residential'",
                "solution" => "VARCHAR(100) NOT NULL DEFAULT 'On-Grid Solar'",
                "property_type" => "VARCHAR(100) NOT NULL DEFAULT 'Independent House'",
                "city" => "VARCHAR(100) NOT NULL DEFAULT 'Amaravati'",
                "preferred_date" => "DATE NULL",
                "preferred_time" => "VARCHAR(50) NOT NULL DEFAULT '10:00 AM - 01:00 PM'",
                "requirements" => "TEXT NULL",
                "status" => "VARCHAR(50) NOT NULL DEFAULT 'pending'",
                "notes" => "TEXT NULL",
                "created_at" => "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP",
                "updated_at" => "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
            ],
            "indexes" => [
                "idx_bookings_ref" => "KEY `idx_bookings_ref` (`reference`)",
                "idx_bookings_status" => "KEY `idx_bookings_status` (`status`)"
            ]
        ],
        "services" => [
            "columns" => [
                "id" => "VARCHAR(50) NOT NULL PRIMARY KEY",
                "title" => "VARCHAR(255) NOT NULL",
                "service_order" => "INT NOT NULL DEFAULT 1",
                "category" => "VARCHAR(100) NOT NULL DEFAULT 'SOLAR'",
                "description" => "TEXT NULL",
                "image" => "VARCHAR(500) NULL",
                "status" => "VARCHAR(50) NOT NULL DEFAULT 'Active'",
                "created_at" => "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP",
                "updated_at" => "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
            ]
        ],
        "projects" => [
            "columns" => [
                "id" => "VARCHAR(50) NOT NULL PRIMARY KEY",
                "title" => "VARCHAR(255) NOT NULL",
                "category" => "VARCHAR(100) NOT NULL DEFAULT 'Residential'",
                "client" => "VARCHAR(255) NULL",
                "capacity" => "VARCHAR(100) NULL",
                "location" => "VARCHAR(255) NULL",
                "image" => "VARCHAR(500) NULL",
                "description" => "TEXT NULL",
                "status" => "VARCHAR(50) NOT NULL DEFAULT 'Completed'",
                "created_at" => "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP",
                "updated_at" => "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
            ]
        ],
        "quotations" => [
            "columns" => [
                "id" => "VARCHAR(50) NOT NULL PRIMARY KEY",
                "quotation_no" => "VARCHAR(100) NOT NULL UNIQUE",
                "date" => "VARCHAR(50) NULL",
                "valid_upto" => "VARCHAR(50) NULL",
                "customer_name" => "VARCHAR(255) NOT NULL",
                "customer_phone" => "VARCHAR(50) NOT NULL",
                "customer_address" => "TEXT NULL",
                "system_capacity" => "VARCHAR(100) NULL",
                "housing_type" => "VARCHAR(100) NULL",
                "subsidy_type" => "VARCHAR(100) NULL",
                "items_json" => "LONGTEXT NULL",
                "site_details_json" => "LONGTEXT NULL",
                "subtotal" => "DECIMAL(12, 2) NOT NULL DEFAULT 0.00",
                "gst_amount" => "DECIMAL(12, 2) NOT NULL DEFAULT 0.00",
                "total_amount" => "DECIMAL(12, 2) NOT NULL DEFAULT 0.00",
                "subsidy_amount" => "DECIMAL(12, 2) NOT NULL DEFAULT 0.00",
                "from_hand" => "DECIMAL(12, 2) NOT NULL DEFAULT 0.00",
                "status" => "VARCHAR(50) NOT NULL DEFAULT 'Pending'",
                "created_at" => "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP",
                "updated_at" => "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
            ],
            "indexes" => [
                "idx_quotations_no" => "KEY `idx_quotations_no` (`quotation_no`)",
                "idx_quotations_status" => "KEY `idx_quotations_status` (`status`)"
            ]
        ],
        "admin_users" => [
            "columns" => [
                "id" => "INT AUTO_INCREMENT PRIMARY KEY",
                "email" => "VARCHAR(255) NOT NULL UNIQUE",
                "password_hash" => "VARCHAR(255) NOT NULL",
                "role" => "VARCHAR(50) NOT NULL DEFAULT 'admin'",
                "created_at" => "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP",
                "updated_at" => "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
            ]
        ]
    ];
}

/**
 * Executes Auto-Migration: Creates all tables and adds any missing columns!
 */
function runAutoMigration() {
    $connRes = getDatabaseConnection();
    if (!$connRes['success']) {
        return [
            'success' => false,
            'error' => $connRes['error']
        ];
    }

    $mysqli = $connRes['mysqli'];
    $schema = getSchemaRegistry();
    $report = [];

    // Get existing tables
    $existingTables = [];
    $res = $mysqli->query("SHOW TABLES");
    if ($res) {
        while ($row = $res->fetch_array()) {
            $existingTables[] = strtolower($row[0]);
        }
    }

    foreach ($schema as $tableName => $tableDef) {
        if (!in_array(strtolower($tableName), $existingTables)) {
            // Table doesn't exist -> CREATE TABLE
            $colDefs = [];
            foreach ($tableDef['columns'] as $cName => $cType) {
                $colDefs[] = "`{$cName}` {$cType}";
            }
            if (!empty($tableDef['indexes'])) {
                foreach ($tableDef['indexes'] as $idxDef) {
                    $colDefs[] = $idxDef;
                }
            }
            $sql = "CREATE TABLE IF NOT EXISTS `{$tableName}` (\n  " . implode(",\n  ", $colDefs) . "\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
            if ($mysqli->query($sql)) {
                $report[$tableName] = 'created';
            } else {
                $report[$tableName] = 'error: ' . $mysqli->error;
            }
        } else {
            // Table exists -> Check for any missing columns and add them
            $existingCols = [];
            $cRes = $mysqli->query("SHOW COLUMNS FROM `{$tableName}`");
            if ($cRes) {
                while ($cRow = $cRes->fetch_assoc()) {
                    $existingCols[] = strtolower($cRow['Field']);
                }
            }

            $addedCols = [];
            foreach ($tableDef['columns'] as $cName => $cType) {
                if (!in_array(strtolower($cName), $existingCols)) {
                    $cleanDef = preg_replace('/PRIMARY KEY/i', '', $cType);
                    $alterSql = "ALTER TABLE `{$tableName}` ADD COLUMN `{$cName}` {$cleanDef};";
                    if ($mysqli->query($alterSql)) {
                        $addedCols[] = $cName;
                    }
                }
            }
            $report[$tableName] = empty($addedCols) ? 'already_exists' : ('added_columns: ' . implode(', ', $addedCols));
        }
    }

    // Seed default admin and services if empty
    seedInitialData($mysqli);

    $mysqli->close();

    return [
        'success' => true,
        'message' => 'All database tables and columns are synchronized successfully on Hostinger MySQL!',
        'database' => $connRes['database'],
        'connected_user' => $connRes['user'],
        'host' => $connRes['host'],
        'report' => $report,
        'timestamp' => date('c')
    ];
}

function seedInitialData($mysqli) {
    // Admin user default
    $adminCheck = $mysqli->query("SELECT id FROM `admin_users` LIMIT 1");
    if ($adminCheck && $adminCheck->num_rows === 0) {
        $defaultHash = password_hash("Admin@123", PASSWORD_DEFAULT);
        $mysqli->query("INSERT IGNORE INTO `admin_users` (`email`, `password_hash`, `role`) VALUES ('admin@amaravatisolarsolutions.com', '{$defaultHash}', 'superadmin')");
    }

    // Default services if empty
    $svcCheck = $mysqli->query("SELECT id FROM `services` LIMIT 1");
    if ($svcCheck && $svcCheck->num_rows === 0) {
        $services = [
            ['svc-1', 'Residential Rooftop Solar', 1, 'SOLAR', 'Complete rooftop solar installation for homes with high efficiency panels and net-metering support.', '/assets/hero-residential-D28_GEsT.jpg'],
            ['svc-2', 'Commercial & Industrial Solar', 2, 'SOLAR', 'Custom turnkey solar plants for factories, offices, and commercial establishments with maximum ROI.', '/assets/hero-commercial-C_m7ud18.jpg'],
            ['svc-3', 'Solar Water Pumping', 3, 'AGRICULTURE', 'Reliable DC and AC solar water pumps for agriculture and remote farm irrigation.', '/assets/hero-industrial-DBI3n6Ha.jpg'],
            ['svc-4', 'Operations & Maintenance (O&M)', 4, 'SERVICES', 'Comprehensive preventive maintenance, cleaning, inverter inspection and performance tracking.', '/assets/installation-Cc7xU_Ew.jpg']
        ];
        $stmt = $mysqli->prepare("INSERT IGNORE INTO `services` (`id`, `title`, `service_order`, `category`, `description`, `image`, `status`) VALUES (?, ?, ?, ?, ?, ?, 'Active')");
        if ($stmt) {
            foreach ($services as $s) {
                $stmt->bind_param("ssisss", $s[0], $s[1], $s[2], $s[3], $s[4], $s[5]);
                $stmt->execute();
            }
            $stmt->close();
        }
    }
}

// Standalone execution handler (when requested directly via /setup-db.php or CLI)
if (php_sapi_name() === 'cli' || basename($_SERVER['SCRIPT_FILENAME'] ?? '') === 'setup-db.php') {
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    $result = runAutoMigration();
    if (!$result['success']) {
        http_response_code(500);
    }
    echo json_encode($result, JSON_PRETTY_PRINT);
    exit;
}
