<?php

namespace App\Controllers;

use App\Models\Auth;

class AuthController
{
    private $userModel;

    public function __construct($db)
    {
        $this->userModel = new Auth($db);
    }

    // Xử lý đăng nhập
    public function login($data)
    {


        // Kiểm tra dữ liệu đầu vào
        if (!isset($data['email']) || !isset($data['password'])) {
            return ['status' => 'error', 'message' => 'Thiếu email hoặc mật khẩu'];
        }

        $user = $this->userModel->getUserByEmail($data['email']);

        if ($user && password_verify($data['password'], $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['type'] = $user['type'];
            $_SESSION['user'] = $user;
            return [
                'status'  => 'success',
                'message' => 'Đăng nhập thành công',
                'type'    => $user['type']
            ];
        }

        return ['status' => 'error', 'message' => 'Email hoặc mật khẩu không đúng'];
    }

    public function register($data)
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['email']) || !isset($data['password'])) {
            return ['status' => 'error', 'message' => 'Thiếu email hoặc mật khẩu'];
        }

        if ($this->userModel->getUserByEmail($data['email'])) {
            return ['status' => 'error', 'message' => 'Email đã tồn tại'];
        }
        
        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        $data['type'] = 'client';
        // $data['name'] = 'client';
        $data['created_at'] = date("Y-m-d");
        $data['updated_at'] = date("Y-m-d");

        $this->userModel->insert($data);
        
        return ['status' => 'success', 'message' => 'Đăng ký thành công'];
    }
}
