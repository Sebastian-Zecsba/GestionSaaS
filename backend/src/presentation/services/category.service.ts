import { CategoryModel } from "../../data/mongo";
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
        
        const { page, limit } = paginationDto;

        try {
            const [ total, categories ] = await Promise.all([
                CategoryModel.countDocuments(),
                CategoryModel.find()
                    .skip((page - 1) * limit)
                    .limit(limit)
            ])
        
        return {
            page: page,
            limit: limit,
            total: total,
            next: `/api/categories?page=${(page + 1)}&limit=${limit}`,
            prev:  (page - 1 > 0) ? `/api/categories?page=${(page - 1)}&limit=${limit}` : null,
            categories: categories.map(category => {
                return { 
                    id: category.id,
                    name: category.name,
                    description: category.description
                }
            })
        }

        } catch (error) {
            throw CustomError.internalServer(`${error}`)            
        }
    }

}