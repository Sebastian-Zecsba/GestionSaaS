import { Router } from "express";
import { SupplierService } from "../services/supplier.service";
import { SupllierController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class SupplierRoutes {
    static get routes(): Router {
        const router = Router();
        const supplierService = new SupplierService()
        const supplierController = new SupllierController(supplierService)

        router.post('/', [AuthMiddleware.validateJWT], supplierController.createSupplier)
        router.get('/', [AuthMiddleware.validateJWT], supplierController.getSuppliers)
        router.get('/:id', [AuthMiddleware.validateJWT], supplierController.getSupplierById)
        router.delete('/:id', [AuthMiddleware.validateJWT], supplierController.deleteSupplierById)
        router.delete('/:id/definitely', [AuthMiddleware.validateJWT], supplierController.deleteDefinitelySupplierById)
        router.post('/:id/restore', [AuthMiddleware.validateJWT], supplierController.restoreSupplierById)
        router.put('/:id', [AuthMiddleware.validateJWT], supplierController.updateSupplierById)


        return router
    }
}