import { SupplierModel } from "../../data/mongo";
import { CustomError, PaginationDto, UserEntity } from "../../domain";
import { SupplierDto } from "../../domain/dtos/supplier/supplier.dto";

export class SupplierService {

    constructor(){}

    async createSupplier(supplierDto: SupplierDto, user: UserEntity){

        const existSupplier = await SupplierModel.findOne({name: supplierDto.name, user: user.id, isDeletedDefinitely: false});
        if(existSupplier) throw Error('Proveedor existente')
            
        try {
            
            const createSupplier = new SupplierModel({
                ...supplierDto,
                user: user.id
            })

            await createSupplier.save()

            return createSupplier

        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }

    async getSupplier(paginationDto: PaginationDto, user: UserEntity){
        const { page, limit, searchTerm } = paginationDto;

        const query = {
            user: user.id, 
            isDeletedDefinitely: false, 
            ...(searchTerm && { name: { $regex: searchTerm, $options: 'i' } })
        };

        try {
            
            const [ total, suppliers, allSuppliers] = await Promise.all([
                SupplierModel.countDocuments({isDeleted: false, user: user.id}),
                SupplierModel.find(query)
                    .skip((page -1 ) * limit)
                    .limit(limit),
                SupplierModel.find({user: user.id})
            ])


            return {
                page: page,
                limit: limit,
                total: total,
                next: `/suppliers?page=${(page + 1)}&limit=${limit}${searchTerm ? `&search=${searchTerm}` : ''}`,
                prev:  (page - 1 > 0) ? `/suppliers?page=${(page - 1)}&limit=${limit}${searchTerm ? `&search=${searchTerm}` : ''}` : null,
                suppliers: suppliers.map(supplier => {
                    return {
                        id: supplier.id,
                        name: supplier.name,
                        phone: supplier.phone,
                        email: supplier.email,
                        address: supplier.address,
                        isDeleted: supplier.isDeleted,
                        isDeletedDefinitely: supplier.isDeletedDefinitely
                    }
                }),
                allSuppliers: allSuppliers
            }

        } catch (error) {
              throw CustomError.internalServer(`${error}`)
        }
    }

    async getSupplierById(supplierId: string, user: UserEntity){
        try {
            const supplierExist = await SupplierModel.findOne({ _id: supplierId, user: user.id });
            if(!supplierExist) throw CustomError.badRequest('Proveedor no registrado')

            return supplierExist
        } catch (error) {
            throw CustomError.internalServer(`${error}`)    
        } 
    }

    async deleteSupplierById(supplierId: string, user: UserEntity){

        const supplierExist = await SupplierModel.findOne({ _id: supplierId, user: user.id });
        if(!supplierExist) throw CustomError.badRequest('Proveedor no registrado')

        try {
            
            const result = await SupplierModel.findOneAndUpdate({_id: supplierId}, { isDeleted: true}, {new: true})
            
            return result
        } catch (error) {
            throw CustomError.internalServer(`${error}`)    
        }
    }

    async deleteDefinitelySupplierById(supplierId: string, user: UserEntity){

        const supplierExist = await SupplierModel.findOne({ _id: supplierId, user: user.id });
        if(!supplierExist) throw CustomError.badRequest('Proveedor no registrado')

        try {
            
            const result = await SupplierModel.findOneAndUpdate({_id: supplierId}, { isDeletedDefinitely: true}, {new: true})
            
            return result
        } catch (error) {
            throw CustomError.internalServer(`${error}`)    
        }
    }

    async restoreSupplierById(supplierId: string, user: UserEntity){
        const supplierExist = await SupplierModel.findOne({ _id: supplierId, user: user.id });
        if(!supplierExist) throw CustomError.badRequest('Proveedor no registrado')

        try {
            
            const result = await SupplierModel.findOneAndUpdate({_id: supplierId}, { isDeleted: false}, {new: true})
            
            return result
        } catch (error) {
            throw CustomError.internalServer(`${error}`)    
        }
    }

    async updateSupplierById(supplierDto: SupplierDto, supplierId: string, user: UserEntity  ){
        const supplierExist = await SupplierModel.findOne({ _id: supplierId, user: user.id });
        if(!supplierExist) throw CustomError.badRequest('Proveedor no registrado')

        try {
            
            const updateSupplier = await SupplierModel.findOneAndUpdate({_id: supplierId, user: user.id}, supplierDto, {new: true})

            if (!updateSupplier) {throw CustomError.badRequest('Actualización fallida, proveedor no encontrado')}

            return updateSupplier
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

}