import express from "express";
import accountController from "../controllers/AccountController.js";
import PassportConfig from "../config/PassportConfig.js";
import upload from "../middlewares/upload.js";

const router = express.Router();
const passportConfig = new PassportConfig();

router.get("/account", passportConfig.verifyRole(["USER"]), accountController.showAccountPage);

router.put("/account", upload.single("image"), accountController.updateProfile);

export default router;