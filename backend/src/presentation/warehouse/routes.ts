import { Router } from "express";
import { WarehouseController } from "./controller";
import { WarehouseService } from "../services/warehouse.service";


export class WarehouseRoutes {
    static get routes(): Router {

        const router = Router();
        const warehouseService = new WarehouseService()
        const warehouseController = new WarehouseController(warehouseService)

        router.post('/', warehouseController.createWarehouse)
        router.get('/', warehouseController.getWarehouses)
        router.get('/:id', warehouseController.getWarehousesById)
        router.delete('/:id', warehouseController.deleteWarehouseById)
        router.put('/:id', warehouseController.updateWarehouseById)

        return router
    }
}