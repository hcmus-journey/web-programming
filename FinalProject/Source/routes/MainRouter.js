// routes/index.js
import express from "express";
import mainController from "../controllers/MainController.js";
import userRouter from "./UserRouter.js";

const mainRouter = express.Router();

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

mainRouter.use("/", userRouter);

export default mainRouter;
