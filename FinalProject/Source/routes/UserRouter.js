import express from "express";
import userController from "../controllers/UserController.js";

import PassportConfig from "../config/PassportConfig.js";

const router = express.Router();
const passportConfig = new PassportConfig();

router.get("/login", userController.showLoginPage);

router.get("/register", userController.showRegisterPage);

router.get("/logout", userController.logoutUser);

router.get("/change-password", passportConfig.verifyRole(["ADMIN", "USER"]), userController.showChangePasswordPage);

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.put("/change-password", passportConfig.verifyRole(["ADMIN", "USER"]), userController.changePassword);
  
export default router;

