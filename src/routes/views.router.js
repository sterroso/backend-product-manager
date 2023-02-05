import { Router } from "express";
import * as ViewsController from "../controllers/view.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", ViewsController.getHomeView);

router.get("/signup", ViewsController.userSignup);

router.get("/login", ViewsController.userLogin);

router.get("/logout", ViewsController.userLogout);

router.get("/products/", ViewsController.getProductsView);

router.get("/products/:productId", ViewsController.getProductDetailView);

router.get("/carts/:cartId", auth, ViewsController.getCartView);

router.get(
  "/carts/:cartId/products/:productId",
  auth,
  ViewsController.addCartItem
);

export default router;
