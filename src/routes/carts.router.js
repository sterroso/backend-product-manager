import { Router } from "express";
import * as CartController from "../controllers/cart.controller.js";

const router = Router();

router.get("/", CartController.getCarts);

router.get("/:cartId", CartController.getCart);

router.post("/", CartController.createCart);

router.post("/:cartId/products/:productId", CartController.addCartItem);

router.put("/:cid", CartController.updateCart);

router.put("/:cartId/products/:productId", CartController.updateCartItem);

router.delete("/:cartId", CartController.clearCartItems);

router.delete("/:cartId/products/:productId", CartController.deleteCartItem);

export default router;
