import { InventoryModel, ProductModel } from "../../data/mongo";
import { CustomError, InventoryDto, PaginationDto, UpdateInventoryDto, UserEntity } from "../../domain";

export class InventoryService{

    constructor(){}

    async createInventory(inventoryDto: InventoryDto, user: UserEntity){

        const { product, warehouse } = inventoryDto;

        const existInventory = await InventoryModel.findOne({ product, warehouse });

        if (existInventory) {
            const updatedQuantoty = await InventoryModel.findByIdAndUpdate({_id: existInventory._id}, { quantity: existInventory.quantity + inventoryDto.quantity  }, {new: true})
            if(!updatedQuantoty) throw CustomError.badRequest('Error al crear y/o actualizar el inventario')
            await updatedQuantoty.save()

            return updatedQuantoty
        }
        
        try {
            const createInvetory = new InventoryModel({
                ...inventoryDto,
                user: user
            })

            await createInvetory.save()

            return createInvetory
        } catch (error) {
            throw CustomError.badRequest(`${error}`)   
        }

    }

    async getInventory(paginationDto: PaginationDto, user: UserEntity) {
        const { page, limit, searchTerm } = paginationDto;
    
        let productQuery = {};

        productQuery = searchTerm ? { name: { $regex: searchTerm, $options: 'i' }, user: user.id,  isDeleted: false  } : {user: user.id,  isDeleted: false };
    
        try {
            const matchingProducts = await ProductModel.find(productQuery).select('_id');
    
            const productIds = matchingProducts.map(product => product._id);
    
            const query = {
                product: productIds.length > 0 ? { $in: productIds } : { $exists: true },
                user: user.id
            };
    
            const [total, inventories] = await Promise.all([
                InventoryModel.countDocuments(query),
                InventoryModel.find(query)
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .populate('warehouse')
                    .populate('product')
            ]);
    
            return {
                page,
                limit,
                total,
                next: `/inventories?page=${(page + 1)}&limit=${limit}${searchTerm ? `&search=${searchTerm}` : ''}`,
                prev: (page - 1 > 0) ? `/inventories?page=${(page - 1)}&limit=${limit}${searchTerm ? `&search=${searchTerm}` : ''}` : null,
                inventories: inventories.map(inventory => ({
                    id: inventory.id,
                    product: inventory.product,
                    warehouse: inventory.warehouse,
                    quantity: inventory.quantity,
                    isDeleted: inventory.isDeleted
                }))
            };
        } catch (error) {
            throw CustomError.badRequest(`${error}`);
        }
    }
    
    

    async getInvetoryById(inventoryId: string, user: UserEntity){

        try {
            const inventoryExist = await InventoryModel.findOne({ _id: inventoryId, user: user.id })
                .populate('warehouse')
                .populate('product')
            if(!inventoryExist) throw CustomError.badRequest('No se encontro Inventario')

            return inventoryExist
        } catch (error) {
            throw CustomError.badRequest(`${error}`)
        }

    }

    async deleteInventoryById(inventoryId: string, user: UserEntity){

        const inventoryExist = await InventoryModel.findOne({ _id: inventoryId, user: user.id })
        if(!inventoryExist) throw CustomError.badRequest('No se encontro Inventario')

        try {
            const result = await InventoryModel.findOneAndUpdate({_id: inventoryId}, { isDeleted: true}, {new: true})
            
            return result
        } catch (error) {
            throw CustomError.badRequest(`${error}`)
        }
    }

    async updateInventoryById(updateInventoryDto: UpdateInventoryDto, inventoryId: string, user: UserEntity) {

        const inventoryExist = await InventoryModel.findOne({ _id: inventoryId, user: user.id })
        if (!inventoryExist) throw CustomError.badRequest('No se encontró Inventario');
        
        try {
            const updateInventory = await InventoryModel.findByIdAndUpdate(
                { _id: inventoryId, user: user.id },
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