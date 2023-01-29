import { Router } from "express";
import * as ViewsController from "../controllers/view.controller.js";

const router = Router();

router.get("/", ViewsController.getHomeView);

router.get("/products/", ViewsController.getProductsView);

router.get("/products/:productId", ViewsController.getProductDetailView);

router.get("/carts/:cartId", ViewsController.getCartView);

export default router;
