import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import * as UserController from "../controllers/user.controller.js";
import * as CartController from "../controllers/cart.controller.js";

const route = Router();

route.get("/", auth, UserController.getUsers);

route.get("/:userId", auth, UserController.getUser);

route.get("/:userId/cart", auth, CartController.getCartByUserId);

route.post("/", auth, UserController.createUser);

route.put("/:userId", auth, UserController.updateUser);

route.delete("/:userId", auth, UserController.deleteUser);

route.post("/login", UserController.getUserByEmail);

export default route;
