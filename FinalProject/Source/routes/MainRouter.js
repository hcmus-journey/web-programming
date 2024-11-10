// routes/index.js
const express = require("express");
const mainRouter = express.Router();
const mainController = require("../controllers/MainController");

mainRouter.get("/", mainController.showHomePage);
mainRouter.get("", mainController.showHomePage);
mainRouter.get("/product", mainController.showProductPage);
mainRouter.get("/cart", mainController.showCartPage);
mainRouter.get("/checkout", mainController.showCheckoutPage);
mainRouter.get("/about_us", mainController.showAboutUsPage);
mainRouter.get("/contact_us", mainController.showContactPage);
mainRouter.get("/shop", mainController.showShopPage);
mainRouter.get("/login", mainController.showLoginPage);
mainRouter.get("/register", mainController.showRegisterPage);
mainRouter.get("/account", mainController.showAccountPage);
mainRouter.get("/profile", mainController.showProfilePage);
mainRouter.get("/privacy", mainController.showPrivacyPage);
module.exports = mainRouter;
