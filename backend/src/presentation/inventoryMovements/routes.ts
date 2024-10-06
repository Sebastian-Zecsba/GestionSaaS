import { Router } from "express";
import { InventoryMovementsController } from "./controller";
import { InventoryMovementsService } from "../services/inventoryMovements.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class InventoryMovementsRoutes {
    static get routes(): Router {
        const router = Router();
        const inventoryMovenetsService = new InventoryMovementsService();
        const inventoryMovementsController = new InventoryMovementsController(inventoryMovenetsService);

        router.post("/", [AuthMiddleware.validateJWT], inventoryMovementsController.createInventoryMovements);
        router.get("/", [AuthMiddleware.validateJWT], inventoryMovementsController.getInventoryMovements);

        return router;
    }
}