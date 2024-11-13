import express from "express";
import userController from "../controllers/UserController.js";

const router = express.Router();

router.get("/login", userController.showLoginPage);

router.get("/register", userController.showRegisterPage);

router.post("/register", userController.registerUser);

// POST request for login
//router.post("/login", userController.loginUser);

export default router;

