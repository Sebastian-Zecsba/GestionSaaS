import { WarehouseModel } from "../../data/mongo";
import { CustomError, PaginationDto, UserEntity, WarehouseDto } from "../../domain";

export class WarehouseService { 
    constructor(){}

    async createWarehouse( createWarehouse: WarehouseDto, user: UserEntity ){

        const existWarehouse = await WarehouseModel.findOne({ name: createWarehouse.name, isDeletedDefinitely: false, user: user.id });
        if(existWarehouse) throw CustomError.badRequest('Bodega ya existe')

        try {
            const create = new WarehouseModel({
                ...createWarehouse,
                user: user.id
            })

            await create.save()
            return create
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    async getWarehouses( paginationDto: PaginationDto, user: UserEntity){
        const { page, limit, searchTerm } = paginationDto;

        const query = {
            user: user.id, 
            isDeletedDefinitely: false, 
            ...(searchTerm && { name: { $regex: searchTerm, $options: 'i' } })
        };

        try {
            
            const [ total, warehouses, allWarehouses] = await Promise.all([
                WarehouseModel.countDocuments({isDeleted: false, user: user.id}),
                WarehouseModel.find(query)
                    .skip((page -1 ) * limit)
                    .limit(limit),
                WarehouseModel.find({user: user.id})
            ])

            return {
                page: page,
                limit: limit,
                total: total,
                next: `/warehouses?page=${(page + 1)}&limit=${limit}${searchTerm ? `&search=${searchTerm}` : ''}`,
                prev:  (page - 1 > 0) ? `/warehouses?page=${(page - 1)}&limit=${limit}${searchTerm ? `&search=${searchTerm}` : ''}` : null,
                warehouses: warehouses.map(warehouse => {
                    return {
                        id: warehouse.id,
                        name: warehouse.name,
                        address: warehouse.address,
                        isDeleted: warehouse.isDeleted
                    }
                }),
                allWarehouses: allWarehouses
            }

        } catch (error) {
              throw CustomError.internalServer(`${error}`)
        }

    }

    async getWarehouseById(warehouseId: string, user: UserEntity){
        try {
            const warehouseExist = await WarehouseModel.findOne({ _id: warehouseId, user: user.id });
            if(!warehouseExist) throw CustomError.badRequest('Bodega no registrada')

            return warehouseExist
        } catch (error) {
            throw CustomError.internalServer(`${error}`)    
        }
    }

    async deleteWarehouseById(warehouseId: string, user: UserEntity){

        const warehouseExist = await WarehouseModel.findOne({ _id: warehouseId, user: user.id });
        if(!warehouseExist) throw CustomError.badRequest('Bodega no registrada')

        try {
            
            const result = await WarehouseModel.findOneAndUpdate({_id: warehouseId}, { isDeleted: true}, {new: true})
            
            return result
        } catch (error) {
            throw CustomError.internalServer(`${error}`)    
        }
    }

    async deleteDefinitelyWarehouseById(warehouseId: string, user: UserEntity){

        const warehouseExist = await WarehouseModel.findOne({ _id: warehouseId, user: user.id });
        if(!warehouseExist) throw CustomError.badRequest('Bodega no registrada')

        try {
            
            const result = await WarehouseModel.findOneAndUpdate({_id: warehouseId}, { isDeletedDefinitely: true}, {new: true})
            
            return result
        } catch (error) {
            throw CustomError.internalServer(`${error}`)    
        }
    }

    async restoreWarehouseById(warehouseId: string, user: UserEntity){
        const warehouseExist = await WarehouseModel.findOne({ _id: warehouseId, user: user.id });
        if(!warehouseExist) throw CustomError.badRequest('Bodega no registrada')

        try {
            
            const result = await WarehouseModel.findOneAndUpdate({_id: warehouseId}, { isDeleted: false}, {new: true})
            
            return result
        } catch (error) {
            throw CustomError.internalServer(`${error}`)    
        }
    }

    async updateWarehouseById(warehouseDto: WarehouseDto, warehouseId: string, user: UserEntity  ){
        const warehouseExist = await WarehouseModel.findOne({ _id: warehouseId, user: user.id });
        if(!warehouseExist) throw CustomError.badRequest('Bodega no registrada')

        try {
            
            const updateWarehouse = await WarehouseModel.findOneAndUpdate({_id: warehouseId, user: user.id}, warehouseDto, {new: true})

            if (!updateWarehouse) {throw CustomError.badRequest('Actualización fallida, bodega no encontrado')}

            return updateWarehouse
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

}