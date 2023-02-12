import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import * as UserController from "../controllers/user.controller.js";
import * as CartController from "../controllers/cart.controller.js";

const route = Router();

route.get("/", UserController.getUsers);

route.get("/:userId", UserController.getUser);

route.get("/:userId/cart", auth, CartController.getCartByUserId);

route.post("/:userId/cart", auth, CartController.createCart);

route.post("/", UserController.createUser);

route.put("/:userId", UserController.updateUser);

route.delete("/:userId", auth, UserController.deleteUser);

export default route;
