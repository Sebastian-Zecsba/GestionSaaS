import { Router } from "express";
import { InventoryController } from "./controller";
import { InventoryService } from "../services/inventory.service";

export class InventoryRoutes {
    static get routes(): Router{ 
        const router = Router()
        const inventoryService = new  InventoryService()
        const inventoryController = new InventoryController(inventoryService)

        router.post('/', inventoryController.createInventory)
        router.get('/', inventoryController.getInventories)
        router.get('/:id', inventoryController.getInventoryById)
        router.delete('/:id', inventoryController.deleteInventoryById)
        router.put('/:id', inventoryController.updateInventoryById)

        return router
    }
}