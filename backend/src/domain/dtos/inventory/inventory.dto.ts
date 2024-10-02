import { Validators } from "../../../config"

export class InventoryDto{
    constructor(
        public product: number,
        public warehouse: number,
        public quantity: number
    ){}

    static create(object : {[key: string]: any}) : [string?, InventoryDto?]{

        const { product, warehouse, quantity } = object

        if(!Validators.isMongoId(product)) return ["Producto es obligatorio"]
        if(!Validators.isMongoId(warehouse)) return ["Producto es obligatorio"]
        if(!quantity) return ["Cantidad es obligatoria"]
        if(quantity < 0) return ["Cantidad debe ser superior ha 0"]
        
        return [undefined, new InventoryDto(product, warehouse, quantity)]
    }
}