import { Validators } from "../../../config";

export class ProductDto{ 

    private constructor(
        public name: string,
        public description: string,
        public price: number,
        public category: number,
        public user: number
    ){}

    static create ( object : {[key:string]:any}) : [string?, ProductDto?] {

        const { name, description, price, category, user } = object;

        if(!name) return ["Nombre es obligatorio"]
        if(!description) return ["Descripción es obligatorio"]
        if(!price) return ["Precio es obligatorio"]
        if(price < 0) return ["Precio debe ser mayor a 0"]
        if(!Validators.isMongoId(category)) return ["Category es obligatorio"]
        if(!Validators.isMongoId(user)) return ["Usuario es obligatorio"]

        return [ undefined, new ProductDto(name, description, price, category, user)]

     }

}