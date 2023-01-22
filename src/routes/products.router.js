import { Router } from "express";
import * as ProductController from "../controllers/product.controller.js";

const router = Router();

router.get("/", ProductController.getProducts);

router.get("/:productId", ProductController.getProduct);

router.post("/", ProductController.createProduct);

router.put("/:productId", ProductController.updateProduct);

router.delete("/:productId", ProductController.deleteProduct);

export default router;
