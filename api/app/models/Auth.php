<?php
namespace App\Models;

class Auth {
    private $conn;
    private $table = 'users';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getUserByEmail($email) {
        $qb = $this->conn->createQueryBuilder();
        $qb->select('*')
           ->from($this->table)
           ->where('email = :email')
           ->setParameter('email', $email);  // Sửa lỗi chính tả ở đây
        return $this->conn->fetchAssociative($qb->getSQL(), $qb->getParameters());
    }

    public function insert($data) {
        return $this->conn->insert($this->table, $data);
    }
}
