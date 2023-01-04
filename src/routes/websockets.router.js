import { Router } from "express";
import ProductManager from "../ProductManager.js";
import Product from "../Product.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("realTimeProducts", { title: "Productos en tiempo real" });
});

export default router;
