const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

// Register
router.get("/user/register", userController.showRegisterPage);
router.post("/user/register", userController.registerUser);

// Login
router.get("/user/login", userController.showLoginPage);
router.post("/user/login", userController.loginUser);

module.exports = router;
