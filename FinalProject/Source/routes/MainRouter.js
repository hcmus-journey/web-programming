// routes/index.js
import express from "express";
import mainController from "../controllers/MainController.js";
import adminRouter from "./AdminRouter.js";
import userRouter from "./UserRouter.js";
import shopRouter from "./ShopRouter.js";
import productRouter from "./ProductRouter.js";
import accountRouter from "./AccountRouter.js";
import cartRouter from "./CartRouter.js";
import orderRouter from "./OrderRouter.js";
import PassportConfig from "../config/PassportConfig.js";

const mainRouter = express.Router();

const passportConfig = new PassportConfig();

mainRouter.get("/", mainController.showHomePage);
mainRouter.get("/about_us", mainController.showAboutUsPage);
mainRouter.get("/contact_us", mainController.showContactPage);
mainRouter.get("/privacy", mainController.showPrivacyPage);

// Routes for authenticated users
mainRouter.use("/", [
  userRouter,
  shopRouter,
  productRouter,
  accountRouter,
  orderRouter,
  cartRouter,
]);

mainRouter.use("/admin", passportConfig.verifyRole(["ADMIN"]), adminRouter);

export default mainRouter;
