import { Router } from "express";
import * as CategoryController from "../controllers/category.controller.js";
import auth from "../middlewares/auth.middleware.js";

const route = Router();

route.get("/", CategoryController.getCategories);

route.get("/:categoryId", CategoryController.getCategory);

route.post("/", CategoryController.createCategory);

route.put("/:categoryId", auth, CategoryController.updateCategory);

route.delete("/:categoryId", auth, CategoryController.deleteCategory);

export default route;
