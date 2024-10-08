import { Router } from "express";
import { CategoryController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { CategoryService } from "../services/category.service";

export class CategoryRoutes { 
    static get routes(): Router {

        const router = Router()
        const categoryService = new CategoryService()
        const controller = new CategoryController(categoryService)

        router.post('/', [AuthMiddleware.validateJWT], controller.createCategory)
        router.get('/', [AuthMiddleware.validateJWT], controller.getCategories)
        
        router.get('/:id', [AuthMiddleware.validateJWT], controller.getCategoryById)
        router.delete('/:id', [AuthMiddleware.validateJWT], controller.deleteCategoryById)
        router.delete('/deleteDefinitely/:id', [AuthMiddleware.validateJWT], controller.deleteDefinitelyCategory)
        router.put('/:id', [AuthMiddleware.validateJWT], controller.updatedCategoryById)
        router.put('/restore/:id', [AuthMiddleware.validateJWT], controller.restoreCategory)


        return router
    }
}