<?php

use App\Controllers\UserController;

$router->get('/',UserController::class ."@index");