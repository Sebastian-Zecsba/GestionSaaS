import { regularExps } from "../../../config";

export class RegisterUserDto { 
    private constructor(
        public name: string,
        public email: string,
        public password: string
    ){}

    static create(object: {[key:string]:any}) : [string?, RegisterUserDto?]{
        const { name, email, password} = object;

        if(!name ) return ['Nombre es obligatorio']
        if(!email ) return ['Correo es obligatorio']
        if(!regularExps.email.test(email)) return ['Email invalido']
        if(!password ) return ['Contraseña es obligatoria']
        if( password.length < 6 ) return ['Contraseña debe tener al menos 6 caracteres']

        return [undefined, new RegisterUserDto(name, email, password)]

    }

}