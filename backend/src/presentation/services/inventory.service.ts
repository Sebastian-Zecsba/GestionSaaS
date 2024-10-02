import { InventoryModel } from "../../data/mongo";
import { CustomError, InventoryDto, PaginationDto, UpdateInventoryDto } from "../../domain";

export class InventoryService{

    constructor(){}

    async createInventory(inventoryDto: InventoryDto){

        const { product, warehouse } = inventoryDto;

        const existInventory = await InventoryModel.findOne({ product, warehouse });

        if (existInventory) {
            const updatedQuantoty = await InventoryModel.findByIdAndUpdate({_id: existInventory._id}, { quantity: existInventory.quantity + inventoryDto.quantity  }, {new: true})
            if(!updatedQuantoty) throw CustomError.badRequest('Error al crear y/o actualizar el inventario')
            await updatedQuantoty.save()

            return updatedQuantoty
        }
        
        try {
            const createInvetory = await InventoryModel.create(inventoryDto)
            await createInvetory.save()
            return createInvetory
        } catch (error) {
            throw CustomError.badRequest(`${error}`)   
        }

    }

    async getInventory(paginationDto: PaginationDto){
        const { page, limit, searchTerm } = paginationDto;

        const query = searchTerm ? { name: { $regex: searchTerm, $options: 'i' } } : {};

        try {
            const [ total, inventories ] = await Promise.all([
                InventoryModel.countDocuments(query),
                InventoryModel.find(query)
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .populate('warehouse')
                    .populate('product')
            ])

            return {
                page: page,
                limit: limit,
                total: total,
                next: `/inventories?page=${(page + 1)}&limit=${limit}${searchTerm ? `&search=${searchTerm}` : ''}`,
                prev:  (page - 1 > 0) ? `/inventories?page=${(page - 1)}&limit=${limit}${searchTerm ? `&search=${searchTerm}` : ''}` : null,
                inventories: inventories.map(inventory => {
                    return { 
                        id: inventory.id,
                        product: inventory.product,
                        warehouse: inventory.warehouse,
                        quantity: inventory.quantity
                    }
                })
            }

        } catch (error) {
            throw CustomError.badRequest(`${error}`)
        }

    }

    async getInvetoryById(inventoryId: string){

        try {
            const inventoryExist = await InventoryModel.findById(inventoryId)
                .populate('warehouse')
                .populate('product')
            if(!inventoryExist) throw CustomError.badRequest('No se encontro Inventario')

            return inventoryExist
        } catch (error) {
            throw CustomError.badRequest(`${error}`)
        }

    }

    async deleteInventoryById(inventoryId: string){

        const inventoryExist = await InventoryModel.findById(inventoryId)
        if(!inventoryExist) throw CustomError.badRequest('No se encontro Inventario')

        try {
            await Promise.all([
                inventoryExist.deleteOne(),
                inventoryExist.save()
            ])

            return `Inventario eliminado`
        } catch (error) {
            throw CustomError.badRequest(`${error}`)
        }
    }

    async updateInventoryById(updateInventoryDto: UpdateInventoryDto, inventoryId: string) {

        const inventoryExist = await InventoryModel.findById(inventoryId);
        if (!inventoryExist) throw CustomError.badRequest('No se encontró Inventario');
        
        try {
            const updateInventory = await InventoryModel.findByIdAndUpdate(
                { _id: inventoryId },
                updateInventoryDto, 
                { new: true }
            );
    
            if (!updateInventory) {
                throw CustomError.badRequest('Actualización fallida, inventario no encontrado');
            }
    
            return updateInventory;
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
    

}