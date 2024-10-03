import { WarehouseModel } from "../../data/mongo";
import { CustomError, PaginationDto, WarehouseDto } from "../../domain";

export class WarehouseService { 
    constructor(){}

    async createWarehouse( createWarehouse: WarehouseDto ){
        const existWarehouse = await WarehouseModel.findOne({name: createWarehouse.name})
        if(existWarehouse) throw CustomError.badRequest('Bodega ya registrada')

        try {
            const create = await WarehouseModel.create(createWarehouse)
            await create.save()
            return create
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    async getWarehouses( paginationDto: PaginationDto){
        const { page, limit, searchTerm } = paginationDto;

        const query = searchTerm ? {name: {$regex: searchTerm, $options: 'i'}} : {};

        try {
            
            const [ total, warehouses, allWarehouses] = await Promise.all([
                WarehouseModel.countDocuments((query)),
                WarehouseModel.find(query)
                    .skip((page -1 ) * limit)
                    .limit(limit),
                WarehouseModel.find()
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
                        address: warehouse.address
                    }
                }),
                allWarehouses: allWarehouses
            }

        } catch (error) {
              throw CustomError.internalServer(`${error}`)
        }

    }

    async getWarehouseById(warehouseId: string){
        try {
            const warehouseExist = await WarehouseModel.findById(warehouseId)
            if(!warehouseExist) throw CustomError.badRequest('Bodega no registrada')

            return warehouseExist
        } catch (error) {
            throw CustomError.internalServer(`${error}`)    
        }
    }

    async deleteWarehouseById(warehouseId: string){

        const warehouseExist = await WarehouseModel.findById(warehouseId)
        if(!warehouseExist) throw CustomError.badRequest('Bodega no registrada')

        try {
            
            await Promise.all([
                warehouseExist.deleteOne(),
                warehouseExist.save()
            ])

            return `Bodega eliminada`
        } catch (error) {
            throw CustomError.internalServer(`${error}`)    
        }
    }

    async updateWarehouseById(warehouseDto: WarehouseDto, warehouseId: string  ){
        const warehouseExist = await WarehouseModel.findById(warehouseId)
        if(!warehouseExist) throw CustomError.badRequest('Bodega no registrada')

        try {
            
            const updateWarehouse = await WarehouseModel.findOneAndUpdate({_id: warehouseId}, warehouseDto, {new: true})

            if (!updateWarehouse) {throw CustomError.badRequest('Actualización fallida, bodega no encontrado')}

            return updateWarehouse
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

}