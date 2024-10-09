import { Router } from "express";
import { WarehouseController } from "./controller";
import { WarehouseService } from "../services/warehouse.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";


export class WarehouseRoutes {
    static get routes(): Router {

        const router = Router();
        const warehouseService = new WarehouseService()
        const warehouseController = new WarehouseController(warehouseService)

        router.post('/', [AuthMiddleware.validateJWT], warehouseController.createWarehouse)
        router.get('/', [AuthMiddleware.validateJWT], warehouseController.getWarehouses)
        router.get('/:id', [AuthMiddleware.validateJWT], warehouseController.getWarehousesById)
        router.delete('/:id', [AuthMiddleware.validateJWT], warehouseController.deleteWarehouseById)
        router.delete('/deleteDefinitely/:id', [AuthMiddleware.validateJWT], warehouseController.deleteDefinitelyWarehouseById)
        router.put('/:id', [AuthMiddleware.validateJWT], warehouseController.updateWarehouseById)
        router.put('/restore/:id', [AuthMiddleware.validateJWT], warehouseController.restoreWarehouseById)

        return router
    }
}