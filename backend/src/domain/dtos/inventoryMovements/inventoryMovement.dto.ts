import { Validators } from "../../../config";

export class InventoryMovementsDto {
    constructor(
        public product: number,
        public warehouse: number,
        public movement_type: string,
        public quantity: number
    ){}

    static create(object: {[key: string]: any}) : [string?, InventoryMovementsDto?]{

        const { product, warehouse, movement_type, quantity, createdAt } = object;

        if(!Validators.isMongoId(product)) return ['Producto es obligatorio']
        if(!Validators.isMongoId(warehouse)) return ['Bodega es obligatoria']
        if(!movement_type) return ['Tipo de movimiento no es valido']
        if(!quantity) return ['Agrega un cantidad']

        return [undefined, new InventoryMovementsDto(product, warehouse, movement_type, quantity)]

    }

}