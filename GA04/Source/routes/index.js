// routes/index.js
const express = require("express");
const router = express.Router();
const homeController = require("../controllers/HomeController");

// Import các route con
const userRoutes = require("./UserRoutes");
const forUsRoutes = require("./ForUsRoutes");

// Gán các route con vào router chính
router.use("/", userRoutes);

router.use("/", forUsRoutes);

router.get("", homeController.showHomePage);

module.exports = router;
