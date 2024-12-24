import express from "express";
import adminController from "../controllers/AdminController.js";

const router = express.Router();

router.get("/dashboard", adminController.showProfilePage);

router.get("/users", adminController.showUserListPage);

router.put("/dashboard", adminController.updateProfile);



export default router;