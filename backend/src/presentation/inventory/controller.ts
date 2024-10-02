import { Request, Response } from "express";
import { CustomError, InventoryDto, PaginationDto, UpdateInventoryDto } from "../../domain";
import { InventoryService } from "../services/inventory.service";

export class InventoryController {

    constructor(
        private readonly inventoryService : InventoryService
    ){}

    private handleError = (error: unknown, res: Response) => {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message})
        }

        console.log(`${error}`)
        return res.status(500).json({error: 'Internal server error'})
    }

    createInventory = (req: Request, res: Response) => {
        const [error , inventoryDto] = InventoryDto.create(req.body)
        if(error) return res.status(400).json({error})

        this.inventoryService.createInventory(inventoryDto!)
            .then((inventory) => res.json(inventory))
            .catch(error => this.handleError(error, res))
    }
    
    getInventories = (req: Request, res: Response) => {
        const { page = 1, limit = 10, searchTerm } = req.query
        const searchQuery = typeof searchTerm === 'string' ? searchTerm : undefined;

        const [ error, paginationDto] = PaginationDto.create(+page, +limit, searchQuery)
        if(error) return res.status(400).json({error})

        this.inventoryService.getInventory(paginationDto!)
            .then((inventory) => res.json(inventory))
            .catch(error => this.handleError(error, res))
    }

    getInventoryById = (req: Request, res: Response) => {
        const { id } = req.params

        this.inventoryService.getInvetoryById(id!)
            .then((inventory) => res.json(inventory))
            .catch(error => this.handleError(error, res))
    }

    deleteInventoryById = (req: Request, res: Response) => {
        const { id } = req.params

        this.inventoryService.deleteInventoryById(id!)
            .then((inventory) => res.json(inventory))
            .catch(error => this.handleError(error, res))
    }

    updateInventoryById = (req: Request, res: Response) => {
        const { id } = req.params
        const [error, updateInventoryDto ] = UpdateInventoryDto.create(req.body)
        if(error) return res.status(400).json({error})

        this.inventoryService.updateInventoryById(updateInventoryDto!, id!)
            .then((inventory) => res.json(inventory))
            .catch(error => this.handleError(error, res))
    }

}