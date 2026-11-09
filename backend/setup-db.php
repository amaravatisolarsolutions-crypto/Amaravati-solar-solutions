<?php
// =========================================================================
// Amaravati Solar Solutions - Universal MySQL Database Engine & Auto-Migrator
// Target Database: u236567282_Amaravthisolar
// =========================================================================

/**
 * Attempts connection with multiple candidate usernames, passwords, and db names
 * to account for typos, case sensitivity, and Hostinger Unix socket routing.
 */
function getDatabaseConnection() {
    // On Hostinger Linux, 'localhost' uses the local UNIX socket (which is permitted),
    // whereas TCP 127.0.0.1:3306 is blocked by firewall (EPERM / Operation not permitted).
    $hostCandidates = ['localhost', 'auth-db1991.hstgr.io', '127.0.0.1'];
    $port = 3306;

    // Notice: Hostinger screenshot shows 'Amaravthi@123' (no 'a' between v and t)
    // while some envs have 'Amaravathi@123' (with 'a'). We test both!
    $passCandidates = array_values(array_unique(array_filter([
        'Amaravthi@123',
        'Amaravathi@123',
        getenv('DB_PASSWORD'),
        getenv('PASSWORD')
    ])));

    $userCandidates = array_values(array_unique(array_filter([
        'u236567282_Amaravthisolar',
        'u236567282_amaravthisolar',
        getenv('DB_USER'),
        getenv('USERNAME'),
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

    $attemptsLog = [];

    foreach ($hostCandidates as $h) {
        foreach ($userCandidates as $u) {
            foreach ($passCandidates as $p) {
                foreach ($dbCandidates as $d) {
                    try {
                        // Suppress warnings with @, but catch exceptions
                        $mysqli = @new mysqli($h, $u, $p, $d, $port);
                        if (!$mysqli->connect_error) {
                            $mysqli->set_charset("utf8mb4");
                            return [
                                'success' => true,
                                'mysqli' => $mysqli,
                                'host' => $h,
                                'user' => $u,
                                'database' => $d,
                                'attempts' => $attemptsLog
                            ];
                        }
                        $attemptsLog[] = [
                            'host' => $h,
                            'user' => $u,
                            'pass_mask' => substr($p, 0, 4) . '***',
                            'db' => $d,
                            'error' => $mysqli->connect_error
                        ];
                    } catch (\Throwable $t) {
                        $attemptsLog[] = [
                            'host' => $h,
                            'user' => $u,
                            'pass_mask' => substr($p, 0, 4) . '***',
                            'db' => $d,
                            'error' => $t->getMessage()
                        ];
                    }
                }
            }
        }
    }

    $lastError = !empty($attemptsLog) ? end($attemptsLog)['error'] : 'No attempts made';

    return [
        'success' => false,
        'mysqli' => null,
        'error' => $lastError,
        'attempts' => $attemptsLog
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
                "username" => "VARCHAR(100) NULL UNIQUE",
                "email" => "VARCHAR(255) NOT NULL UNIQUE",
                "password_hash" => "VARCHAR(255) NOT NULL",
                "role" => "VARCHAR(50) NOT NULL DEFAULT 'admin'",
                "created_at" => "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP",
                "updated_at" => "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
            ]
        ],
        "admin_otps" => [
            "columns" => [
                "id" => "INT AUTO_INCREMENT PRIMARY KEY",
                "email" => "VARCHAR(255) NOT NULL",
                "otp" => "VARCHAR(10) NOT NULL",
                "expires_at" => "DATETIME NOT NULL",
                "created_at" => "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP"
            ],
            "indexes" => [
                "idx_otps_email" => "KEY `idx_otps_email` (`email`)",
                "idx_otps_otp" => "KEY `idx_otps_otp` (`otp`)"
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
            'error' => $connRes['error'],
            'attempts' => $connRes['attempts'] ?? []
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
    // Admin user default: ensure owner account exists with credentials
    $adminEmail = 'amaravatisolarsolutions@gmail.com';
    $adminUsername = 'u236567282_Amaravthisolar';
    $adminPasswordHash = password_hash('Amaravthi@123', PASSWORD_DEFAULT);

    $adminCheck = $mysqli->prepare("SELECT id, password_hash FROM `admin_users` WHERE `email` = ? OR `username` = ?");
    if ($adminCheck) {
        $adminCheck->bind_param("ss", $adminEmail, $adminUsername);
        $adminCheck->execute();
        $adminRes = $adminCheck->get_result();
        if ($adminRes && $adminRes->num_rows > 0) {
            $row = $adminRes->fetch_assoc();
            // Preserve customized admin password - only seed default hash if empty/null
            if (empty($row['password_hash'])) {
                $upStmt = $mysqli->prepare("UPDATE `admin_users` SET `username` = ?, `password_hash` = ?, `role` = 'superadmin' WHERE `id` = ?");
                if ($upStmt) {
                    $upStmt->bind_param("ssi", $adminUsername, $adminPasswordHash, $row['id']);
                    $upStmt->execute();
                    $upStmt->close();
                }
            }
        } else {
            $insStmt = $mysqli->prepare("INSERT INTO `admin_users` (`username`, `email`, `password_hash`, `role`) VALUES (?, ?, ?, 'superadmin')");
            if ($insStmt) {
                $insStmt->bind_param("sss", $adminUsername, $adminEmail, $adminPasswordHash);
                $insStmt->execute();
                $insStmt->close();
            }
        }
        $adminCheck->close();
    }

    // Default services if empty
    $svcCheck = $mysqli->query("SELECT id FROM `services` LIMIT 1");
    if ($svcCheck && $svcCheck->num_rows < 10) {
        $services = [
            ['svc-1', 'Residential Rooftop Solar', 1, 'SOLAR', 'Designed to help homeowners reduce electricity costs and generate clean, renewable energy from their own rooftop.', '/assets/hero-residential-D28_GEsT.jpg'],
            ['svc-2', 'Commercial & Industrial Solar', 2, 'SOLAR', 'Efficient solar power solutions for industries, factories, hospitals, educational institutions, office buildings, hotels, warehouses, and commercial spaces.', '/assets/hero-commercial-C_m7ud18.jpg'],
            ['svc-3', 'Ground Mounted Solar Power Plants', 3, 'SOLAR', 'Complete EPC solutions for MW-scale solar projects including design, engineering, procurement, installation, testing, and commissioning.', '/assets/solar-farm-BOHTUAgk.jpg'],
            ['svc-4', 'On-Grid Solar Systems', 4, 'SOLAR', 'Grid-tied solar systems that sync seamlessly with utility power, lowering electricity bills through net metering credits.', '/assets/solar-hyderabad-rooftop-DRo-ta6t.jpg'],
            ['svc-5', 'Off-Grid Solar Systems', 5, 'SOLAR', 'Independent solar power systems equipped with advanced battery energy storage for farmhouses, remote areas, and outage protection.', '/assets/hero-future-Bhbvz5Ay.jpg'],
            ['svc-6', 'Hybrid Solar Systems', 6, 'SOLAR', 'Smart multi-mode systems delivering the economic savings of grid export alongside battery storage backup during power cuts.', '/assets/installation-Cc7xU_Ew.jpg'],
            ['svc-7', 'HT / LT Substation & Transformer Works', 7, 'ELECTRICAL', 'Complete electrical infrastructure installation, HT yard switchgear commissioning, power transformer erection, and statutory inspections.', '/assets/hero-industrial-DBI3n6Ha.jpg'],
            ['svc-8', 'Solar Water Pumping', 8, 'AGRICULTURE', 'Reliable DC and AC solar water pumps for agriculture, borewells, and remote farm irrigation.', '/assets/hero-industrial-DBI3n6Ha.jpg'],
            ['svc-9', 'EV Charging Infrastructure', 9, 'EV CHARGING', 'Commercial and residential EV charging stations powered by smart solar integration for green mobility.', '/assets/solar-carport-DLxQdB2g.jpg'],
            ['svc-10', 'Operations & Maintenance (O&M)', 10, 'MAINTENANCE / AMC', 'Comprehensive preventive maintenance, cleaning, thermal drone imaging, inverter inspection, and 24/7 performance tracking.', '/assets/installation-Cc7xU_Ew.jpg']
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

    // Default projects if empty
    $projCheck = $mysqli->query("SELECT id FROM `projects` LIMIT 1");
    if ($projCheck && $projCheck->num_rows === 0) {
        $projects = [
            ['p0', 'Roof Top solar power plant', 'Commercial', 'Commercial Rooftop Facility', '75KWP', 'Hyderabad', '/assets/solar-hyderabad-rooftop-DRo-ta6t.jpg', '75 kWp high-yield commercial rooftop solar power plant installed in Hyderabad with elevated structure and DISCOM net-metering synchronization.', 'Completed'],
            ['p1', '10 kW Residential Rooftop Solar', 'Residential', 'Private Residence', '10 kW', 'Amaravati', '/assets/hero-residential-D28_GEsT.jpg', 'High-efficiency 10 kW rooftop solar installation with smart net-metering.', 'Completed'],
            ['p2', '50 kW Commercial Warehouse Solar', 'Commercial', 'Logistics Warehouse', '50 kW', 'Vijayawada', '/assets/hero-commercial-C_m7ud18.jpg', '50 kW grid-tied solar setup cutting industrial daytime power tariffs.', 'Completed'],
            ['p3', '25 kW Hospital Solar Backup', 'Healthcare', 'Multi-Specialty Hospital', '25 kW', 'Guntur', '/assets/hero-future-Bhbvz5Ay.jpg', 'Uninterrupted healthcare power with hybrid solar & lithium battery bank.', 'Completed'],
            ['p4', '100 kW Industrial Manufacturing Solar', 'Industrial', 'Steel Processing Unit', '100 kW', 'Autonagar Industrial Area', '/assets/hero-industrial-DBI3n6Ha.jpg', 'Massive 100 kW manufacturing facility solar plant delivering peak industrial ROI.', 'Completed'],
            ['p5', '5 HP Solar Agricultural Water Pump', 'Agriculture', 'Farm Cooperative', '5 HP', 'Tenali Rural', '/assets/solar-panels-array-BYmL5U4a.jpg', 'Solar submersible borewell pump delivering continuous drip irrigation.', 'Completed'],
            ['p6', 'Commercial Solar Carport Canopy', 'Commercial', 'Corporate Tech Park', '30 kW', 'Gannavaram', '/assets/solar-carport-DLxQdB2g.jpg', 'Dual-purpose solar carport structure providing shade and clean electricity.', 'Completed']
        ];
        $pStmt = $mysqli->prepare("INSERT IGNORE INTO `projects` (`id`, `title`, `category`, `client`, `capacity`, `location`, `image`, `description`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        if ($pStmt) {
            foreach ($projects as $p) {
                $pStmt->bind_param("sssssssss", $p[0], $p[1], $p[2], $p[3], $p[4], $p[5], $p[6], $p[7], $p[8]);
                $pStmt->execute();
            }
            $pStmt->close();
        }
    }

    // Default quotations if empty
    $quotCheck = $mysqli->query("SELECT id FROM `quotations` LIMIT 1");
    if ($quotCheck && $quotCheck->num_rows === 0) {
        $q1Items = json_encode([
            ["id" => "1", "description" => "Solar PV Module (Mono PERC)", "specification" => "545W Tier-1 Bifacial", "qty" => 6, "unitPrice" => 15000, "amount" => 90000],
            ["id" => "2", "description" => "Grid-Tie Solar Inverter", "specification" => "3.3kW Single Phase IP65", "qty" => 1, "unitPrice" => 38000, "amount" => 38000],
            ["id" => "3", "description" => "Mounting Structure", "specification" => "Pre-fab Hot Dip Galvanized - 6ft", "qty" => 1, "unitPrice" => 22000, "amount" => 22000],
            ["id" => "4", "description" => "AC/DC Distribution Box & Cabling", "specification" => "SPD, MCB, 4 sq.mm Solar DC Cable", "qty" => 1, "unitPrice" => 16000, "amount" => 16000],
            ["id" => "5", "description" => "Net Metering, Liaison & Commissioning", "specification" => "APCPDCL CEIG Approval & Sync", "qty" => 1, "unitPrice" => 14000, "amount" => 14000]
        ]);
        $q1Site = json_encode([
            "housingType" => "Independent",
            "subsidyType" => "Subsidy National DBT",
            "noOfFloors" => "G+1",
            "sanctionedPhase" => "Single Phase",
            "sanctionedLoad" => "3 kW",
            "cluster" => "Vijayawada Urban",
            "discom" => "APCPDCL",
            "roofType" => "RCC",
            "structureType" => "Pre fab - 6ft",
            "noOfModules" => 6,
            "overhangPossibility" => "No",
            "overhangSide" => "",
            "amc" => "Included",
            "loadChange" => "No",
            "phaseChange" => "No",
            "nameChange" => "No",
            "paymentMode" => "Direct",
            "totalPrice" => 210000,
            "discount" => 0,
            "finalPrice" => 210000,
            "terms" => [
                "Price includes GST, transportation, and complete turnkey installation.",
                "5 Years comprehensive on-site warranty on complete system.",
                "Net-metering subsidy of ₹78,000 under PM Surya Ghar DBT scheme credited directly to bank account.",
                "Panel performance warranty: 25 years linear output guarantee.",
                "Payment terms: 20% advance booking, 60% on material delivery, 20% after installation & commissioning."
            ]
        ]);
        $escItems = $mysqli->real_escape_string($q1Items);
        $escSite = $mysqli->real_escape_string($q1Site);
        $mysqli->query("INSERT IGNORE INTO `quotations` (`id`, `quotation_no`, `date`, `valid_upto`, `customer_name`, `customer_phone`, `customer_address`, `system_capacity`, `housing_type`, `subsidy_type`, `items_json`, `site_details_json`, `subtotal`, `gst_amount`, `total_amount`, `subsidy_amount`, `from_hand`, `status`) VALUES ('quot-1', 'QT-2026-001', '2026-10-31', '2026-11-15', 'K. V. Rao', '+91 98480 12345', 'Plot 42, Gayatri Nagar, Vijayawada - 520008', '3 kW Rooftop Solar', 'Independent', 'Subsidy National DBT', '{$escItems}', '{$escSite}', 180000.00, 30000.00, 210000.00, 78000.00, 132000.00, 'Approved')");
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
