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
        router.delete('/:id', [AuthMiddleware.validateJWT], controller.deleteProductById)
        router.put('/:id', [AuthMiddleware.validateJWT], controller.updateProduct)

        return router
    }
    

}