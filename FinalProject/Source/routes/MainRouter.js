// routes/index.js
import express from "express";
import mainController from "../controllers/MainController.js";
import userRouter from "./UserRouter.js";
import shopRouter from "./ShopRouter.js";
import productRouter from "./ProductRouter.js";
import adminRouter from "./AdminRouter.js";

const mainRouter = express.Router();

mainRouter.get("/", mainController.showHomePage);
mainRouter.get("", mainController.showHomePage);
mainRouter.get("/cart", mainController.showCartPage);
mainRouter.get("/checkout", mainController.showCheckoutPage);
mainRouter.get("/about_us", mainController.showAboutUsPage);
mainRouter.get("/contact_us", mainController.showContactPage);
mainRouter.get("/account", mainController.showAccountPage);
mainRouter.get("/profile", mainController.showProfilePage);
mainRouter.get("/privacy", mainController.showPrivacyPage);

mainRouter.use("/", userRouter);

mainRouter.use("/", shopRouter);

mainRouter.use("/", productRouter);

mainRouter.use("/", adminRouter);

export default mainRouter;
