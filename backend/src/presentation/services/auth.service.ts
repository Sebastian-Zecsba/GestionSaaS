import { bcryptAdapter, JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongo";
import { CustomError } from "../../domain/errors/custom.error";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";

export class AuthService { 

    constructor(){}

    public async registerUser(registerUserDto: RegisterUserDto) { 
        const existUser = await UserModel.findOne({email: registerUserDto.email})
        if(existUser) throw CustomError.badRequest('Email already exist')

        try {
            
            const user = new UserModel(registerUserDto)

            user.password = bcryptAdapter.hash(registerUserDto.password)

            await user.save()

            const { password, ...userEntity} = UserEntity.fromObject(user);

            return {user: userEntity}

        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }

    public async loginUser(loginUserDto: LoginUserDto) { 
        const findByEmail = await UserModel.findOne({email: loginUserDto.email})
        if(!findByEmail) throw CustomError.badRequest('Email already exist')

        const isMatch = bcryptAdapter.compare(loginUserDto.password, findByEmail.password)
        if(!isMatch) throw CustomError.badRequest('Password is not valid')

        const { password, ...userEntity} = UserEntity.fromObject(findByEmail)
        
        const token = await JwtAdapter.generateToken({id: findByEmail.id})
        if(!token) throw CustomError.internalServer('Error while creating JWT')

        return {user: userEntity, token: token}
    }

}