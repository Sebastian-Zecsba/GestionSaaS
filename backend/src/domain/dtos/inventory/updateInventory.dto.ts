export class UpdateInventoryDto {
    constructor(
        public quantity: number
    ){}

    static create(object : {[key: string]: any}) : [string?, UpdateInventoryDto?]{
        const { quantity } = object;

        if (!quantity) return ["Cantidad es obligatoria"];
        if (quantity < 0) return ["Cantidad debe ser superior a 0"];
        
        return [undefined, new UpdateInventoryDto(quantity)];
    }
}
