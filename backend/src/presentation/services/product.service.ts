import { ProductModel } from "../../data/mongo";
import { CustomError, PaginationDto, ProductEntity, UserEntity } from "../../domain";
import { ProductDto } from "../../domain/dtos/product/product.dto";

export class ProductService {

    constructor(){}

    async createProduct(productDto: ProductDto, user: UserEntity){

        const productExist = await ProductModel.findOne({name: productDto.name});
        if(productExist) throw CustomError.badRequest('Category already exist')

        try {
            const product = await ProductModel.create(productDto)
            
            await product.save()

            return product
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    async getProducts(paginationDto: PaginationDto){
        const { page, limit } = paginationDto;

        try {
            const [ total, products] = await Promise.all([
                ProductModel.countDocuments(),
                ProductModel.find()
                    .skip((page-1) * limit)
                    .limit(limit)
            ])

            return {
                page: page,
                limit: limit,
                total: total,
                next:  `/api/categories?page=${(page + 1)}&limit=${limit}`,
                prev:  (page - 1 > 0) ? `/api/categories?page=${(page - 1)}&limit=${limit}` : null,
                products: products.map(product => {
                    return {
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        stock: product.stock,
                    }
                })
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    async deleteProduct(categoryId: string){
        const findProductById = await ProductModel.findById(categoryId)
        if(!findProductById) throw CustomError.badRequest('Product not found')

        try {
            
            await Promise.all([
                findProductById.deleteOne(),
                findProductById.save()
            ])

            return  `Product with id no matter has been deleted`

        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    async updateProduct(productDto: ProductDto, idProduct: string){
        const findProductById = await ProductModel.findById(idProduct)
        if(!findProductById) throw CustomError.badRequest('Product not found')

        try {
            const updateProduct = await ProductModel.findOneAndUpdate({_id: idProduct}, productDto, {new: true} ).populate('user').populate('category')
            if (!updateProduct) {
                throw CustomError.badRequest('Update failed, product not found');
            }
            const productEntity = ProductEntity.fromObject(updateProduct)
            return productEntity
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }

}

