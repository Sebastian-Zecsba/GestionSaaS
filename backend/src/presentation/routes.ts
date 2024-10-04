import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { CategoryRoutes } from './category/routes';
import { ProductRoutes } from './product/routes';
import { WarehouseRoutes } from './warehouse/routes';
import { InventoryRoutes } from './inventory/routes';
import { InventoryMovementsRoutes } from './inventoryMovements/routes';


export class AppRoutes {
  static get routes(): Router {

    const router = Router();

    router.use('/api/auth', AuthRoutes.routes)    
    router.use('/api/categories', CategoryRoutes.routes)    
    router.use('/api/products', ProductRoutes.routes)
    router.use('/api/warehouses', WarehouseRoutes.routes)
    router.use('/api/inventories', InventoryRoutes.routes)
    router.use('/api/movements', InventoryMovementsRoutes.routes)

    return router;
  }
}

