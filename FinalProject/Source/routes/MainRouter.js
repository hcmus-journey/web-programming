// routes/index.js
import express from "express";
import mainController from "../controllers/MainController.js";
import userRouter from "./UserRouter.js";
import shopRouter from "./ShopRouter.js";
import productRouter from "./ProductRouter.js";
import accountRouter from "./AccountRouter.js";
import cartRouter from "./CartRouter.js";
import PassportConfig from "../config/PassportConfig.js";
import AdminController from "../controllers/AdminController.js";

const mainRouter = express.Router();

const passportConfig = new PassportConfig();

mainRouter.get("/", passportConfig.verifyRole(['USER']), mainController.showHomePage);
mainRouter.get("", passportConfig.verifyRole(['USER']), mainController.showHomePage);
mainRouter.get("/about_us", passportConfig.verifyRole(['USER']), mainController.showAboutUsPage);
mainRouter.get("/contact_us", passportConfig.verifyRole(['USER']), mainController.showContactPage);
mainRouter.get("/privacy", passportConfig.verifyRole(['USER']), mainController.showPrivacyPage);
mainRouter.get("/admin", passportConfig.verifyRole(['ADMIN']), AdminController.showAdminPage);

mainRouter.use("/", userRouter);

mainRouter.use("/", passportConfig.verifyRole(['USER']), shopRouter);

mainRouter.use("/", passportConfig.verifyRole(['USER']), productRouter);

mainRouter.use("/", passportConfig.verifyRole(['USER']), accountRouter);

mainRouter.use("/", passportConfig.verifyRole(['USER']), cartRouter);

export default mainRouter;
