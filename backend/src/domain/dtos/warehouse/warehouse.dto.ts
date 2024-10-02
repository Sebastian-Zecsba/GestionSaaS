export class WarehouseDto{

    private constructor(
        public name: string
    ){}

    static create ( object : {[key:string]:any}) : [string?, WarehouseDto?] {
        const { name } = object;

        if(!name) return ["Name is required"]

        return [ undefined, new WarehouseDto(name)]
    }
}