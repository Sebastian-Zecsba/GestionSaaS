import { CategoryModel, ProductModel } from "../../data/mongo";
import { CategoryDto, CategoryEntity, CustomError, PaginationDto, UserEntity } from "../../domain";

export class CategoryService{ 

    constructor(){}

    async createCategoty(createCategory: CategoryDto, user: UserEntity){

        const existCategory = await CategoryModel.findOne({name: createCategory.name})
        if(existCategory) throw CustomError.badRequest('Category already exist')
        
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

    async getCategories(paginationDto: PaginationDto){
        
        const { page, limit, searchTerm } = paginationDto;

        const query = searchTerm ? { name: { $regex: searchTerm, $options: 'i' } } : {};

        try {
            const [ total, categories, allCategories ] = await Promise.all([
                CategoryModel.countDocuments(query),
                CategoryModel.find(query)
                    .skip((page - 1) * limit)
                    .limit(limit),
                CategoryModel.find()
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
                    description: category.description
                }
            }),
            allCategories: allCategories
        }

        } catch (error) {
            throw CustomError.internalServer(`${error}`)            
        }
    }

    async getCategoryByid(categoryId: string){
        try {
            const existCategory = await CategoryModel.findById(categoryId)
            if(!existCategory) throw CustomError.badRequest('Category not found')

            const { id, name, description } = CategoryEntity.fromObject(existCategory)
            
            return { id, name, description }

        } catch (error) {
            throw CustomError.internalServer(`${error}`)            
        }
    }

    async deleteCategory(categoryId: string){

        const existCategory = await CategoryModel.findById(categoryId)
        if(!existCategory) throw CustomError.badRequest('Category already exist')

            try {
                await Promise.all([
                    existCategory.deleteOne(),
                    existCategory.save(),
                    ProductModel.updateMany({ category: categoryId }, { $unset: { category: "" } })
                ])

                return `Category has been deleted`
            } catch (error) {
                throw CustomError.internalServer(`${error}`)            
            }
    }

    async updatedCategory(categoryDto: CategoryDto, categoryId: string){
        
        const existCategory = await CategoryModel.findById(categoryId)
        if(!existCategory) throw CustomError.badRequest('Category already exist')

        try {
            const updateCategory = await CategoryModel.findOneAndUpdate({_id: categoryId}, categoryDto, {new: true})
            if (!updateCategory) {
                throw CustomError.badRequest('Update failed, product not found');
            }

            const { id, name, description } = CategoryEntity.fromObject(updateCategory)

            return { id, name, description }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)            
        }
    }   

}