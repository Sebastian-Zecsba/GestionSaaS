import { Response, Request } from "express"
import { CustomError, PaginationDto } from "../../domain"
import { ProductService } from "../services/product.service"
import { ProductDto } from "../../domain/dtos/product/product.dto"

export class ProductController { 
    constructor(
        private readonly productService: ProductService
    ){}

    private handleError = (error: unknown, res: Response) => {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message})
        }

        console.log(`${error}`)
        return res.status(500).json({error: 'Internal server error'})
    }

    createProduct = async(req: Request, res: Response) => { 
        const [error, productDto] = ProductDto.create({...req.body, user: req.body.user.id})
        if(error) return res.status(400).json({error})

        this.productService.createProduct(productDto!, req.body.user)
            .then((product) => res.status(201).json(product))
            .catch(error => this.handleError(error, res))
    }

    getProduct = async(req: Request, res: Response) => {
        const { page = 1, limit = 10, search} = req.query;
        const searchQuery = typeof search === 'string' ? search : undefined;

        const [ error, paginationDto] = PaginationDto.create(+page, +limit, searchQuery || '')
        if(error) return res.status(400).json({error})

        this.productService.getProducts(paginationDto!)
            .then((products) => res.status(201).json(products))
            .catch(error => this.handleError(error, res))
    }

    getProductById = async(req: Request, res: Response) => {
        const { id } = req.params;

        this.productService.getProductById(id!)
            .then((products) => res.status(201).json(products))
            .catch(error => this.handleError(error, res))
    }

    deleteProductById = async(req: Request, res: Response) => {
        const { id } = req.params

        this.productService.deleteProduct(id!)
            .then((products) => res.status(201).json(products))
            .catch(error => this.handleError(error, res))
    }

    updateProduct = async(req: Request, res: Response) => {
        const { id } = req.params;

        const [error, productDto] = ProductDto.create({...req.body, user: req.body.user.id})
        if(error) return res.status(400).json({error})

        this.productService.updateProduct(productDto!, id!)
            .then((product) => res.status(201).json(product))
            .catch(error => this.handleError(error, res))
    }

}