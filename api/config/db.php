<?php
// api/config/db.php

use Doctrine\DBAL\Configuration;
use Doctrine\DBAL\DriverManager;

require_once __DIR__ . '/../../vendor/autoload.php';

$config = new Configuration();
$connectionParams = [
    'dbname'   => 'phpoop-2',  
    'user'     => 'NTHY',         
    'password' => '',               
    'host'     => 'localhost',
    'driver'   => 'pdo_mysql',
];

try {
    $conn = DriverManager::getConnection($connectionParams, $config);
} catch (\Doctrine\DBAL\Exception $e) {
    die("Lỗi kết nối DB: " . $e->getMessage());
}

return $conn;
