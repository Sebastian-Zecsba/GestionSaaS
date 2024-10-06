import { CustomError } from "../errors/custom.error";

export class ProductEntity {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public price: number,
        public category: string,
        public user: string,
        public isDeleted: boolean
    ){}

    static fromObject(object: {[key:string]:any}){

        const { id, _id, name, description, price, category, user, isDeleted } = object;

        if(!_id && !id) {
            throw CustomError.badRequest('Missing id')
        }
        
        if (!name) throw CustomError.badRequest('Name is required');
        if (!description) throw CustomError.badRequest('Description is required');
        if (price == null) throw CustomError.badRequest('Price is required');

        return new ProductEntity(_id || id, name, description, price, category, user, isDeleted);

     }
}