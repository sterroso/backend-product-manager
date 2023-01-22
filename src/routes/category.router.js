import { Router } from "express";
import * as CategoryController from "../controllers/category.controller.js";

const route = Router();

route.get("/", CategoryController.getCategories);

route.get("/:categoryId", CategoryController.getCategory);

route.post("/", CategoryController.createCategory);

route.put("/:categoryId", CategoryController.updateCategory);

route.delete("/:categoryId", CategoryController.deleteCategory);

export default route;
