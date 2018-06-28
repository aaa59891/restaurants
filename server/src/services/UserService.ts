import { getRepository } from "typeorm";
import { User } from "../models/User";
import { AbstractService } from "./AbstractService";
import * as bcrypt from 'bcrypt';
import { config } from "../conf/config";
import { JwtHelper } from "../shared/JwtHelper";

export enum UserErrors{
    EmailExist = 'The email already exists.',
    UserNotFound = 'The email does not exist.',
    WrongPassword = 'Password is incorrect!'
}

export class UserService extends AbstractService<User>{
    protected repository = getRepository(User);
    
    async signUp(user: User){
        const dbUser = await this.repository.findOne({ email: user.email });
        if(dbUser){
            throw UserErrors.EmailExist;
        }
        user.password = bcrypt.hashSync(user.password, config.bcrypt.salt || 10);
        await this.save(user);
        const token = JwtHelper.createJwt({userId: user.id});
        const res = {...user, token}
        delete res.password;
        return res;
    }

    async singIn(user: User){
        const dbUser = await this.repository.findOne({email: user.email});
        if(!dbUser){
            throw UserErrors.UserNotFound;
        }
        if(!bcrypt.compareSync(user.password, dbUser.password)){
            throw UserErrors.WrongPassword;
        }
        const token = JwtHelper.createJwt({userId: dbUser.id});
        const res = {...dbUser, token};
        delete res.password;
        return res;
    }
}