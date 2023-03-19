import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import * as UserController from "../controllers/user.controller.js";
import * as CartController from "../controllers/cart.controller.js";

const route = Router();

route.get("/", UserController.getUsers);

route.get("/:userId", UserController.getUser);

route.post("/", UserController.createUser);

route.put("/:userId", UserController.updateUser);

route.delete("/:userId", auth, UserController.deleteUser);

route.get("/:userId/cart", auth, CartController.getCartByUserId);

route.post("/:userId/cart", auth, CartController.createCart);

route.put("/:userId/cart", auth, CartController.updateCart);

route.post("/:userId/cart/:productId", auth, CartController.addCartItem);

route.put("/:userId/cart/:productId", auth, CartController.updateCartItem);

route.delete("/:userId/cart", auth, CartController.clearCartItems);

route.delete("/:userId/cart/:productId", auth, CartController.deleteCartItem);

export default route;
