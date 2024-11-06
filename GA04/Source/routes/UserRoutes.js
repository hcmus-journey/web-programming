// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route GET để hiển thị trang đăng ký
router.get('/register', userController.showRegisterPage);

// Route POST để xử lý form đăng ký
router.post('/register', userController.registerUser);

// Route GET để hiển thị trang đăng nhập
router.get('/login', userController.showLoginPage);

// Route POST để xử lý form đăng nhập
router.post('/login', userController.loginUser);

module.exports = router;
