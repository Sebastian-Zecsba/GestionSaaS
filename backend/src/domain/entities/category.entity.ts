import { CustomError } from "../errors/custom.error";

export class CategoryEntity { 

    constructor(
        public id: string,
        public name: string,
        public description: string,
        public isDeleted: boolean
    ){}

    static fromObject(object: {[key:string]:any}){
        const { id, _id, name, description, isDeleted } = object;

        if(!_id && !id) {
            throw CustomError.badRequest('Missing id')
        }

        if(!name) throw CustomError.badRequest('Missing name')
        if(!description) throw CustomError.badRequest('Missing description')

        return new CategoryEntity(_id || id, name, description, isDeleted)
    }

}