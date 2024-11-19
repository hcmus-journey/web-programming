// routes/index.js
import express from "express";
import mainController from "../controllers/MainController.js";
import userRouter from "./UserRouter.js";
import shopRouter from "./ShopRouter.js";
import productRouter from "./ProductRouter.js";
import accountRouter from "./AccountRouter.js";
import cartRouter from "./CartRouter.js";

const mainRouter = express.Router();

mainRouter.get("/", mainController.showHomePage);
mainRouter.get("", mainController.showHomePage);
mainRouter.get("/about_us", mainController.showAboutUsPage);
mainRouter.get("/contact_us", mainController.showContactPage);
mainRouter.get("/privacy", mainController.showPrivacyPage);

mainRouter.use("/", userRouter);

mainRouter.use("/", shopRouter);

mainRouter.use("/", productRouter);

mainRouter.use("/", accountRouter);

mainRouter.use("/", cartRouter);

export default mainRouter;
