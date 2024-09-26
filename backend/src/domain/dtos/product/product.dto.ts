import { Validators } from "../../../config";

export class ProductDto{ 

    private constructor(
        public name: string,
        public description: string,
        public price: number,
        public stock: number,
        public category: number,
        public user: number
    ){}

    static create ( object : {[key:string]:any}) : [string?, ProductDto?] {

        const { name, description, price, stock, category, user } = object;

        if(!name) return ["name is required"]
        if(!description) return ["description is required"]
        if(!price) return ["price is required"]
        if(!stock) return ["stock is required"]
        if(!Validators.isMongoId(category)) return ["category is required"]
        if(!Validators.isMongoId(user)) return ["user is required"]

        return [ undefined, new ProductDto(name, description, price, stock, category, user)]

     }

}