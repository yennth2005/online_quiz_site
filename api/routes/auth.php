<?php
// api/routes/auth.php

use App\Controllers\AuthController;
use Bramus\Router\Router;

// require_once __DIR__ . '/../controllers/AuthController.php';
$conn = require_once __DIR__ . '/../config/db.php';

$authController = new AuthController($conn);

$router->mount('/api', function() use ($router, $authController) {
    // Đăng ký
    $router->post('/register', function() use ($authController) {
        header("Content-Type: application/json");
        $data = json_decode(file_get_contents("php://input"), true);
        echo json_encode($authController->register($data));
        exit;
    });

    // Đăng nhập
    $router->post('/login', function() use ($authController) {
        header("Content-Type: application/json");
        $data = json_decode(file_get_contents("php://input"), true);
        echo json_encode($authController->login($data));
        exit;
    });
    //đăng xuất
    $router->get('/logout',function(){
        unset($_SESSION['user']);
        header("Location: /");

    });
    //authen
    $router->before('GET|POST', '/admin/.*', function() {
        if (!isset($_SESSION['type']) || $_SESSION['type'] !== 'admin') {
            header("Location: /index.html");
            exit;
        }
    });
    
});
    