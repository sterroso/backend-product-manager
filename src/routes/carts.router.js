import { Router } from "express";
import * as CartController from "../controllers/cart.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", CartController.getCarts);

router.get("/:cartId", CartController.getCartById);

router.post("/:cartId/products/:productId", CartController.addCartItem);

router.put("/:cartId", CartController.updateCart);

router.put("/:cartId/products/:productId", CartController.updateCartItem);

router.delete("/:cartId", CartController.clearCartItems);

router.delete("/:cartId/products/:productId", CartController.deleteCartItem);

export default router;
