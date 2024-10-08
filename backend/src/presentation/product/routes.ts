import { Router } from "express";
import { ProductController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ProductService } from "../services/product.service";

export class ProductRoutes { 
    static get routes() : Router {

        const router = Router();

        const productService = new ProductService();
        const controller = new ProductController(productService);

        router.post('/', [AuthMiddleware.validateJWT], controller.createProduct)
        router.get('/', [AuthMiddleware.validateJWT], controller.getProduct)
        router.get('/:id', [AuthMiddleware.validateJWT], controller.getProductById)
        router.delete('/:id', [AuthMiddleware.validateJWT], controller.deleteProductById)
        router.delete('/deleteDefinitely/:id', [AuthMiddleware.validateJWT], controller.deleteDefinitelyProduct)
        router.put('/:id', [AuthMiddleware.validateJWT], controller.updateProduct)
        router.put('/restore/:id', [AuthMiddleware.validateJWT], controller.restoreProductById)

        return router
    }
    

}