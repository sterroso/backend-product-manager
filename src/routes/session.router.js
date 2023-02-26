import { Router } from "express";
import * as SessionController from "../controllers/session.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/current", auth, SessionController.getCurrentSession);

export default router;
