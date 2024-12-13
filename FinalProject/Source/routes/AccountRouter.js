import express from "express";
import accountController from "../controllers/AccountController.js";
import PassportConfig from "../config/PassportConfig.js";

const router = express.Router();
const passportConfig = new PassportConfig();

router.get("/account", passportConfig.verifyRole(["USER"]), accountController.showAccountPage);

router.get("/profile", passportConfig.verifyRole(["USER"]), accountController.showProfilePage);

export default router;