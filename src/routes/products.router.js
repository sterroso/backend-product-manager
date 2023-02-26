import { Router } from "express";
import * as ProductController from "../controllers/product.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", ProductController.getProducts);

router.get("/:productId", ProductController.getProduct);

router.post("/", auth, ProductController.createProduct);

router.put("/:productId", auth, ProductController.updateProduct);

router.delete("/:productId", auth, ProductController.deleteProduct);

export default router;
