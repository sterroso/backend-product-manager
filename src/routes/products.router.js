import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import * as ProductController from "../controllers/product.controller.js";

const router = Router();

router.get("/", ProductController.getAllProducts);

router.get("/:productId", ProductController.getProductById);

router.post("/", auth, ProductController.createProduct);

router.post(
  "/:productId/categories/:categoryId",
  auth,
  ProductController.addCategoryToProduct
);

router.put("/:productId", auth, ProductController.updateProductById);

router.put(
  "/:productId/categories/",
  auth,
  ProductController.updateProductCategories
);

router.delete("/:productId", auth, ProductController.deleteProductById);

router.delete(
  "/:productId/categories/:categoryId",
  auth,
  ProductController.removeCategoryFromProduct
);

export default router;
