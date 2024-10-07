import { Request, Response } from "express";
import { CategoryDto, CustomError, PaginationDto } from "../../domain";
import { CategoryService } from "../services/category.service";

export class CategoryController { 

    constructor(
        private readonly categoryService: CategoryService
    ){}

    private handleError = (error: unknown, res: Response) => {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message})
        }

        console.log(`${error}`)
        return res.status(500).json({error: 'Internal server error'})
    }

    createCategory = (req: Request, res: Response) => {
        const user = req.body.user
        const [error , categoryDto] = CategoryDto.create(req.body)
        if(error) return res.status(400).json({error})

        this.categoryService.createCategoty(categoryDto!, user)
            .then((category) => res.json(category))
            .catch(error => this.handleError(error, res))
    }

    getCategories = (req: Request, res: Response) => {
        const { page = 1, limit = 10, search } = req.query;
        const user = req.body.user

        const searchQuery = typeof search === 'string' ? search : undefined;

        const [error , paginationDto] = PaginationDto.create(+page, +limit, searchQuery || '')
        if(error) return res.status(400).json({error})

        this.categoryService.getCategories(paginationDto!, user!)
            .then((category) => res.json(category))
            .catch(error => this.handleError(error, res))
    }

    getCategoryById = (req: Request, res: Response ) => {
        const { id } = req.params;
        const user = req.body.user

        this.categoryService.getCategoryByid(id!, user!)
            .then((category) => res.json(category))
            .catch(error => this.handleError(error, res))
    }

    deleteCategoryById = (req: Request, res: Response) => {
        const { id } = req.params
        const user = req.body.user

        this.categoryService.deleteCategory(id!, user!)
            .then((category) => res.json(category))
            .catch(error => this.handleError(error, res))
    }

    updatedCategoryById = (req: Request, res: Response) => {
        const { id } = req.params
        const user = req.body.user

        const [ error, categoryDto ] = CategoryDto.create(req.body)
        if(error) return res.status(400).json({error})

        this.categoryService.updatedCategory(categoryDto!, id!, user!)
            .then((category) => res.json(category))
            .catch(error => this.handleError(error, res))
    }

}