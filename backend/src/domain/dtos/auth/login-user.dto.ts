import { regularExps } from "../../../config";

export class LoginUserDto { 
    private constructor(
        public email: string,
        public password: string
    ){}

    static login(object: {[key:string]:any}) : [string?, LoginUserDto?] {
        const { email, password } = object;

        if(!email ) return ['Email es obligatorio']
        if(!regularExps.email.test(email)) return ['Email invalido']
        if(!password ) return ['Contraseña es obligatoria']
        if( password.length < 6 ) return ['Contraseña debe tener al menos 6 caracteres']

        return [undefined, new LoginUserDto(email, password)]
    }

}