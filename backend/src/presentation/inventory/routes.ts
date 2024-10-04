import { Router } from "express";
import { InventoryController } from "./controller";
import { InventoryService } from "../services/inventory.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class InventoryRoutes {
    static get routes(): Router{ 
        const router = Router()
        const inventoryService = new  InventoryService()
        const inventoryController = new InventoryController(inventoryService)

        router.post('/', [AuthMiddleware.validateJWT], inventoryController.createInventory)
        router.get('/', [AuthMiddleware.validateJWT], inventoryController.getInventories)
        router.get('/:id', [AuthMiddleware.validateJWT], inventoryController.getInventoryById)
        router.delete('/:id', [AuthMiddleware.validateJWT], inventoryController.deleteInventoryById)
        router.put('/:id', [AuthMiddleware.validateJWT], inventoryController.updateInventoryById)

        return router
    }
}