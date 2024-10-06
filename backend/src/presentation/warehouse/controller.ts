import { Request, Response } from "express";
import { CustomError, PaginationDto, WarehouseDto } from "../../domain";
import { WarehouseService } from "../services/warehouse.service";

export class WarehouseController {
    constructor(
        private readonly warehouseService: WarehouseService
    ){}

    private handleError = (error: unknown, res: Response) => {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message})
        }

        console.log(`${error}`)
        return res.status(500).json({error: 'Internal server error'})
    }

    createWarehouse = async(req: Request, res: Response) => {
        const user = req.body.user
        const [ error, warehouseDto] = WarehouseDto.create({...req.body})
        if(error) return res.status(400).json({error})

        this.warehouseService.createWarehouse(warehouseDto!, user)
            .then(warehouse => res.status(201).json(warehouse))
            .catch(error => this.handleError(error, res))

    }

    getWarehouses = async(req: Request, res: Response) => {
        const user = req.body.user
        const { page = 1, limit = 10, search } = req.query
        const searchQuery = typeof search === 'string' ? search : undefined;

        const [ error, paginationDto ] = PaginationDto.create(+page, +limit, searchQuery)
        if(error) return res.status(400).json({error})

        this.warehouseService.getWarehouses(paginationDto!, user)
            .then(warehouse => res.status(201).json(warehouse))
            .catch(error => this.handleError(error, res))
    }

    getWarehousesById = async(req: Request, res: Response) => {
        const user = req.body.user
        const { id } = req.params;

        this.warehouseService.getWarehouseById(id!, user)
            .then(warehouse => res.status(201).json(warehouse))
            .catch(error => this.handleError(error, res))
    }

    deleteWarehouseById = async(req: Request, res: Response) => {
        const user = req.body.user
        const { id } = req.params

        this.warehouseService.deleteWarehouseById(id!, user)
            .then(warehouse => res.status(201).json(warehouse))
            .catch(error => this.handleError(error, res))
    }

    updateWarehouseById = async(req: Request, res: Response) => {
        const user = req.body.user
        const { id } = req.params
        const [error, warehouseDto ] = WarehouseDto.create(req.body)
        if(error) return res.status(400).json({error})
        
        this.warehouseService.updateWarehouseById(warehouseDto!, id!, user)
            .then(warehouse => res.status(201).json(warehouse))
            .catch(error => this.handleError(error, res))
    }

}