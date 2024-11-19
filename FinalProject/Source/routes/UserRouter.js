import express from "express";
import userController from "../controllers/UserController.js";

const router = express.Router();

router.get("/login", userController.showLoginPage);

router.get("/register", userController.showRegisterPage);

router.get("/logout", userController.logoutUser);

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);
  
export default router;

