import { Request, Response } from "express";
import { CustomError, InventoryMovementsDto, PaginationDto } from "../../domain";
import { InventoryMovementsService } from "../services/inventoryMovements.service";

export class InventoryMovementsController {

    constructor(
        private readonly inventoryService : InventoryMovementsService
    ){}

    private handleError = (error: unknown, res: Response) => {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message})
        }

        console.log(`${error}`)
        return res.status(500).json({error: 'Internal server error'})
    }

    createInventoryMovements = (req: Request, res: Response) => {
        const [error, inventoryMovementsDto] = InventoryMovementsDto.create(req.body)
        if(error) return res.status(400).json({error})
            
        this.inventoryService.createInventoryMovements(inventoryMovementsDto!, req.body.user!)
            .then((inventoryMovements) => res.json(inventoryMovements))
            .catch(error => this.handleError(error, res))
    }

    getInventoryMovements = (req: Request, res: Response) => {
        const user = req.body.user
        const { page = 1, limit = 10, search} = req.query
        const searchQuery = typeof search === 'string' ? search : undefined;
        const [ error, paginationDto] = PaginationDto.create(+page, +limit, searchQuery)
        if(error) return res.status(400).json({error})

        this.inventoryService.getInventoryMovements(paginationDto!, user!)
            .then((inventoryMovements) => res.json(inventoryMovements))
            .catch(error => this.handleError(error, res))

    }


}