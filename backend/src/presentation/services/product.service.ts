import { CategoryModel, ProductModel } from "../../data/mongo";
import { CustomError, PaginationDto, ProductEntity, UserEntity, ProductDto } from "../../domain";

export class ProductService {

    constructor(){}

    async createProduct(productDto: ProductDto, user: UserEntity){

        const productExist = await ProductModel.findOne({name: productDto.name});
        if(productExist) throw CustomError.badRequest('Este roducto ya existe')

        try {
            const product = await ProductModel.create(productDto)
            
            await product.save()

            return product
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    async getProducts(paginationDto: PaginationDto){
        const { page, limit, searchTerm } = paginationDto;

        const query = searchTerm ? { name: { $regex: searchTerm, $options: 'i' } } : {};

        try {
            const [ total, products] = await Promise.all([
                ProductModel.countDocuments(query),
                ProductModel.find(query)
                    .skip((page-1) * limit)
                    .limit(limit)
                    .populate('category')
            ])

            return {
                page: page,
                limit: limit,
                total: total,
                next: `/products?page=${(page + 1)}&limit=${limit}${searchTerm ? `&search=${searchTerm}` : ''}`,
                prev:  (page - 1 > 0) ? `/products?page=${(page - 1)}&limit=${limit}${searchTerm ? `&search=${searchTerm}` : ''}` : null,
                products: products.map(product => {
                    return {
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        category: product.category ? product.category : null
                    }
                })
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    async getProductById(productId: string){

        try {    
            const findProductById = await ProductModel.findById(productId)
            if(!findProductById) throw CustomError.badRequest('Producto no encontrado')

            const { id, name, description, price, category } = ProductEntity.fromObject(findProductById)
            return { id, name, description, price, category: category ? category : null }

        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }

    async deleteProduct(productId: string){
        const findProductById = await ProductModel.findById(productId)
        if(!findProductById) throw CustomError.badRequest('Producto no encontrado')

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

    async updateProduct(productDto: ProductDto, productId: string){
        const findProductById = await ProductModel.findById(productId)
        if(!findProductById) throw CustomError.badRequest('Producto no encontrado')

        if (productDto.category) {
            const categoryExists = await CategoryModel.findById(productDto.category);
            if (!categoryExists) throw CustomError.badRequest('La categoría no existe');
        }

        try {
            const updateProduct = await ProductModel.findOneAndUpdate({_id: productId}, productDto, {new: true} )
                .populate('user')
                .populate('category')

            if (!updateProduct) {throw CustomError.badRequest('Actualización fallida, producto no encontrado')}

            const productEntity = ProductEntity.fromObject(updateProduct)
            return productEntity
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }

}

