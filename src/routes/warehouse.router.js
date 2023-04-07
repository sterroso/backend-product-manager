import { Router } from "express";
import * as WarehouseController from "../controllers/warehouse.controller.js";

const router = Router();

router.get("/", WarehouseController.getAllWarehouses);

router.get("/:warehouseId", WarehouseController.getWarehouseById);

router.post("/", WarehouseController.createWarehouse);

router.put("/:warehouseId", WarehouseController.updateWarehouseById);

router.delete("/:warehouseId", WarehouseController.deleteWarehouseById);

export default router;
