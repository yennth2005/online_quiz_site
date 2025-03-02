<?php

use Bramus\Router\Router;
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
$router = new Router();

require  'auth.php';
require  'user.php';
require  'admin.php';

$router->run();