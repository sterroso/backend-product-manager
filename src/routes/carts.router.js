import { Router } from "express";
import * as CartController from "../controllers/cart.controller.js";

const router = Router();

router.get("/", CartController.getCarts);

router.get("/:cartId", CartController.getCart);

router.post("/", CartController.createCart);

router.post("/:cartId/products/:productId", CartController.addCartItem);

router.delete("/:cartId", CartController.deleteCart);

export default router;
