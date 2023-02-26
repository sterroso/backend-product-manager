import { Router } from "express";
import * as CartController from "../controllers/cart.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", auth, CartController.getCarts);

export default router;
