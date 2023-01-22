import { Router } from "express";
import * as MessagesController from "../controllers/message.controller.js";

const router = Router();

router.get("/", MessagesController.getMessages);

router.get("/:messageId", MessagesController.getMessage);

router.post("/", MessagesController.createMessage);

router.delete("/:messageId", MessagesController.deleteMessage);

export default router;
