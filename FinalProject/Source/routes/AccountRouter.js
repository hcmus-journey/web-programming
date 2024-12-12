import express from "express";
import accountController from "../controllers/AccountController.js";

const router = express.Router();

router.get("/account", accountController.showAccountPage);

router.get("/profile", accountController.showProfilePage);

export default router;