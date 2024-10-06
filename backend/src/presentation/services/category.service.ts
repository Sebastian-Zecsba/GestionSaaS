import { CategoryModel, ProductModel } from "../../data/mongo";
import { CategoryDto, CategoryEntity, CustomError, PaginationDto, UserEntity } from "../../domain";

export class CategoryService{ 

    constructor(){}

    async createCategoty(createCategory: CategoryDto, user: UserEntity){
        
        try {
            
            const category = new CategoryModel({
                ...createCategory,
                user: user.id
            })

            await category.save()

            const { name , description } = CategoryEntity.fromObject(category)

            return { name, description }

        } catch (error) {
            throw CustomError.internalServer(`${error}`)   
        }
    }

    async getCategories(paginationDto: PaginationDto, user: UserEntity){
        
        const { page, limit, searchTerm } = paginationDto;

        const query = searchTerm ? { name: { $regex: searchTerm, $options: 'i' }, user: user.id } : { user: user.id };

        try {
            const [ total, categories, allCategories ] = await Promise.all([
                CategoryModel.countDocuments(query),
                CategoryModel.find(query)
                    .skip((page - 1) * limit)
                    .limit(limit),
                CategoryModel.find({user: user.id})
            ])
        
        return {
            page: page,
            limit: limit,
            total: total,
            next: `/categories?page=${(page + 1)}&limit=${limit}${searchTerm ? `&search=${searchTerm}` : ''}`,
            prev:  (page - 1 > 0) ? `/categories?page=${(page - 1)}&limit=${limit}${searchTerm ? `&search=${searchTerm}` : ''}` : null,
            categories: categories.map(category => {
                return { 
                    id: category.id,
                    name: category.name,
                    description: category.description,
                    isDeleted: category.isDeleted,
                    user: category.user
                }
            }),
            allCategories: allCategories
        }

        } catch (error) {
            throw CustomError.internalServer(`${error}`)            
        }
    }

    async getCategoryByid(categoryId: string, user: UserEntity) {
        try {
            const existCategory = await CategoryModel.findOne({ _id: categoryId, user: user.id });
            if (!existCategory) throw CustomError.badRequest('Categoria no encontrada o no tienes acceso');
    
            const { id, name, description } = CategoryEntity.fromObject(existCategory);
            
            return { id, name, description };
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
    

    async deleteCategory(categoryId: string, user: UserEntity){

        const existCategory = await CategoryModel.findOne({ _id: categoryId, user: user.id });
        if(!existCategory) throw CustomError.badRequest('Categoria no encontrada')

            try {
                const result = await CategoryModel.findOneAndUpdate({_id: categoryId}, {isDeleted: true}, { new: true})

                return result
            } catch (error) {
                throw CustomError.internalServer(`${error}`)            
            }
    }

    async updatedCategory(categoryDto: CategoryDto, categoryId: string, user: UserEntity){
        
        const existCategory = await CategoryModel.findOne({ _id: categoryId, user: user.id });
        if(!existCategory) throw CustomError.badRequest('Categoria no encontrada')

        try {
            const updateCategory = await CategoryModel.findOneAndUpdate(
                {_id: categoryId, user: user.id}, 
                categoryDto, 
                {new: true})

            if (!updateCategory) {
                throw CustomError.badRequest('Error al actualizar');
            }

            const { id, name, description } = CategoryEntity.fromObject(updateCategory)

            return { id, name, description }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)            
        }
    }   

}