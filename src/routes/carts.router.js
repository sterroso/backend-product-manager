import { Router } from "express";
import * as CartController from "../controllers/cart.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", CartController.getCarts);

router.get("/:cartId", CartController.getCartById);

router.post("/:cartId/products/:productId", auth, CartController.addCartItem);

router.put("/:cartId", auth, CartController.updateCart);

router.put("/:cartId/products/:productId", auth, CartController.updateCartItem);

router.delete("/:cartId", auth, CartController.clearCartItems);

router.delete(
  "/:cartId/products/:productId",
  auth,
  CartController.deleteCartItem
);

export default router;
