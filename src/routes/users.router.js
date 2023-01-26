import { Router } from "express";
import * as UserController from "../controllers/user.controller.js";

const route = Router();

route.get("/", UserController.getUsers);

route.get("/:userId", UserController.getUser);

route.post("/", UserController.createUser);

route.put("/:userId", UserController.updateUser);

route.delete("/:userId", UserController.deleteUser);

export default route;
