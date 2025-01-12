// routes/index.js
import express from "express";
import mainController from "../controllers/MainController.js";
import adminController from "../controllers/AdminController.js";
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

mainRouter.get("/about_us", passportConfig.verifyRole(["USER"]), mainController.showAboutUsPage);
mainRouter.get("/contact_us", passportConfig.verifyRole(["USER"]), mainController.showContactPage);
mainRouter.get("/privacy", passportConfig.verifyRole(["USER"]), mainController.showPrivacyPage);
mainRouter.get("/", passportConfig.verifyRole(["USER", "ADMIN"]), (req, res, next) => {
  if (req.user && req.user.user_role === "ADMIN") {
    return adminController.showDashboard(req, res, next);
  }
  return mainController.showHomePage(req, res, next);
});

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
