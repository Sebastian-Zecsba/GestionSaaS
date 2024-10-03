export class WarehouseDto{

    private constructor(
        public name: string,
        public address: string
    ){}

    static create ( object : {[key:string]:any}) : [string?, WarehouseDto?] {
        const { name, address } = object;

        if(!name) return ["Name is required"]
        if(!address) return ["Address is required"]

        return [ undefined, new WarehouseDto(name, address)]
    }
}