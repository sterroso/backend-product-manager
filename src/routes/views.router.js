import { Router } from "express";
import * as ViewsController from "../controllers/view.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", ViewsController.getHomeView);

router.get("/signup", ViewsController.getUserSignupView);

router.get("/wellcome", ViewsController.getNewUserWellcomeView);

router.get("/login", ViewsController.getUserLoginView);

router.get("/githublogin", ViewsController.getGithubLoginView);

router.get("/products/", auth, ViewsController.getProductsView);

router.get("/products/:productId", auth, ViewsController.getProductDetailView);

router.get("/logout", auth, ViewsController.userLogout);

router.get("/user/:userId/profile", auth, ViewsController.getUserProfileView);

router.get("/user/:userId/cart/:cartId", auth, ViewsController.getUserCartView);

export default router;
