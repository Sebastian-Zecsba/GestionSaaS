import { Sign } from "crypto";

export class SupplierDto {

    private constructor(
        public name: string,
        public phone: string,
        public email: string,
        public address: string
    ){}

    static create(object: {[key: string]: any}) : [string?, SupplierDto?] {
        const { name, phone, email, address } = object

        if(!name) return ['Name is required']
        if(!phone) return ['Phone is required']
        if(!email) return ['Email is required']
        if(!address) return ['Address is required']

        return [undefined, new SupplierDto(name, phone, email, address)]

    }

}