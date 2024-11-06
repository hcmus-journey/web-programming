const express = require("express");
const router = express.Router();
const forUsController = require("../controllers/ForUsController");

// About Us
router.get("/about_us", forUsController.showAboutUs);

// Contact Us
router.get("/contact_us", forUsController.showContactUs);

module.exports = router;
