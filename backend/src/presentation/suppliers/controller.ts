import { Request, Response } from "express";
import { CustomError, PaginationDto } from "../../domain";
import { SupplierService } from "../services/supplier.service";
import { SupplierDto } from "../../domain/dtos/supplier/supplier.dto";

export class SupllierController {

    constructor(
        private readonly supplierService: SupplierService
    ){}

    private handleError = (error: unknown, res: Response) => {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message})
        }

        console.log(`${error}`)
        return res.status(500).json({error: 'Internal server error'})
    }

    createSupplier = (req: Request, res: Response) => {
        const user = req.body.user
        const [ error, supplierDto] = SupplierDto.create(req.body)
        if(error) return res.status(400).json({error})

        this.supplierService.createSupplier(supplierDto!, user!)
            .then(supplier => res.json({supplier}))
            .catch(error => this.handleError(error, res))
    }

    getSuppliers = (req: Request, res: Response) => {
        const user = req.body.user
        const { page = 1, limit = 10, search } = req.query
        const searchQuery = typeof search === 'string' ? search : undefined;
        const [ error, paginationDto] = PaginationDto.create(+page, +limit, searchQuery);
        if(error) return res.status(400).json({error})

        this.supplierService.getSupplier(paginationDto!, user!)
            .then(supplier => res.json(supplier))
            .catch(error => this.handleError(error, res))
    }

    getSupplierById = (req: Request, res: Response) => {
        const user = req.body.user
        const { id } = req.params;

        this.supplierService.getSupplierById(id!, user!)
            .then(supplier => res.json(supplier))
            .catch(error => this.handleError(error, res))
    }

    deleteSupplierById = (req: Request, res: Response) => {
        const user = req.body.user
        const { id } = req.params

        this.supplierService.deleteSupplierById(id!, user!)
            .then(supplier => res.json(supplier))
            .catch(error => this.handleError(error, res))
    }

    deleteDefinitelySupplierById = (req: Request, res: Response) => {
        const user = req.body.user
        const { id } = req.params

        this.supplierService.deleteDefinitelySupplierById(id!, user!)
            .then(supplier => res.json(supplier))
            .catch(error => this.handleError(error, res))
    }

    restoreSupplierById = (req: Request, res: Response) => {
        const user = req.body.user
        const { id } = req.params

        this.supplierService.restoreSupplierById(id!, user!)
            .then(supplier => res.json(supplier))
            .catch(error => this.handleError(error, res))
    }

    updateSupplierById = (req: Request, res: Response) => {
        const user = req.body.user
        const { id } = req.params
        const [error, supplierDto ] = SupplierDto.create(req.body)
        if(error) return res.status(400).json({error})
        
        this.supplierService.updateSupplierById(supplierDto!, id!, user!)
            .then(supplier => res.json(supplier))
            .catch(error => this.handleError(error, res))
    }

}