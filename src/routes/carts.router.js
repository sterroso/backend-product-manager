import { Router } from "express";
import * as CartController from "../controllers/cart.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", auth, CartController.getCarts);

router.get("/:cartId", auth, CartController.getCartById);

router.post("/", auth, CartController.createCart);

router.post("/:cartId/products/:productId", auth, CartController.addCartItem);

router.put("/:cid", auth, CartController.updateCart);

router.put("/:cartId/products/:productId", auth, CartController.updateCartItem);

router.delete("/:cartId", auth, CartController.clearCartItems);

router.delete("/:cartId/products/:productId", auth, CartController.deleteCartItem);

export default router;
