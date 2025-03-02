<?php

use App\Controllers\AdminController;
$router->mount('/admin',function() use ($router){

    $router->get('/',AdminController::class ."@index");
});