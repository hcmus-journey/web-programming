import express from "express";
import userController from "../controllers/UserController.js";

import PassportConfig from "../config/PassportConfig.js";

const router = express.Router();

router.get("/login", userController.showLoginPage);

router.get("/register", userController.showRegisterPage);

router.get("/logout", userController.logoutUser);

router.get("/change-password", userController.showChangePasswordPage);

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.put("/change-password", userController.changePassword);
  
export default router;

