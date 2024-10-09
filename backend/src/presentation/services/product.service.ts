import { CategoryModel, ProductModel } from "../../data/mongo";
import { CustomError, PaginationDto, ProductEntity, UserEntity, ProductDto } from "../../domain";

export class ProductService {

    constructor(){}

    async createProduct(productDto: ProductDto, user: UserEntity){

        const productExist = await ProductModel.findOne({sku: productDto.sku, user: user.id});
        if(productExist) throw CustomError.badRequest(`Codigo SKU existente: ${productDto.sku}`)

        try {
            const product = new ProductModel({
                ...productDto,
                user: user.id
            })
            
            await product.save()

            return product
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    async getProducts(paginationDto: PaginationDto, user: UserEntity){
        const { page, limit, searchTerm } = paginationDto;

        const query = {
            user: user.id, 
            isDeletedDefinitely: false, 
            ...(searchTerm && { name: { $regex: searchTerm, $options: 'i' } })
        };

        try {
            const [ total, products, allProducts] = await Promise.all([
                ProductModel.countDocuments({isDeleted: false, user: user.id}),
                ProductModel.find(query)
                    .skip((page-1) * limit)
                    .limit(limit)
                    .populate('category'),
                ProductModel.find({user: user.id})
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
                        category: product.category,
                        isDeleted: product.isDeleted,
                        sku: product.sku
                    }
                }),
                allProducts: allProducts
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    async getProductById(productId: string, user: UserEntity){

        try {    
            const findProductById = await ProductModel.findOne({ _id: productId, user: user.id });
            if(!findProductById) throw CustomError.badRequest('Producto no encontrado')

            const { id, name, description, price, category, isDeleted, sku } = ProductEntity.fromObject(findProductById)
            return { id, name, description, price, category, isDeleted, sku }

        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }

    async deleteProduct(productId: string, user: UserEntity){
        const findProductById = await ProductModel.findOne({ _id: productId, user: user.id });
        if(!findProductById) throw CustomError.badRequest('Producto no encontrado')

        try {
            
            const result = await ProductModel.findOneAndUpdate({_id: productId}, { isDeleted: true}, {new: true})
            
            return result

        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    async deleteDefinitelyProduct(productId: string, user: UserEntity){
        const findProductById = await ProductModel.findOne({ _id: productId, user: user.id });
        if(!findProductById) throw CustomError.badRequest('Producto no encontrado')
            try {
                const result = await ProductModel.findOneAndUpdate({_id: productId}, { isDeletedDefinitely: true}, {new: true})
                return result
            } catch (error) {
                throw CustomError.internalServer(`${error}`)
            }
    }

    async restoreProduct(productId: string, user: UserEntity){
        const findProductById = await ProductModel.findOne({ _id: productId, user: user.id });
        if(!findProductById) throw CustomError.badRequest('Producto no encontrado')

        try { 
            const result = await ProductModel.findOneAndUpdate({_id: productId}, { isDeleted: false}, {new: true})
            
            return result
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    async updateProduct(productDto: ProductDto, productId: string, user: UserEntity){
        const findProductById = await ProductModel.findOne({ _id: productId, user: user.id });
        if(!findProductById) throw CustomError.badRequest('Producto no encontrado')

        if (productDto.category) {
            const categoryExists = await CategoryModel.findById(productDto.category);
            if (!categoryExists) throw CustomError.badRequest('La categoría no existe');
        }

        try {
            const updateProduct = await ProductModel.findOneAndUpdate({_id: productId, user: user.id}, productDto, {new: true} )
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

