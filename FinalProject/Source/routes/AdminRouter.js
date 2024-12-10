import express from "express";
import adminController from "../controllers/AdminController.js";

const router = express.Router();

router.get("/dashboard", adminController.showProfilePage);

export default router;