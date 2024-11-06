// routes/index.js
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/HomeController');


// Import các route con
const userRoutes = require('./UserRoutes');

// Gán các route con vào router chính
router.use('/', userRoutes);

router.get('', homeController.showHomePage);

module.exports = router;
