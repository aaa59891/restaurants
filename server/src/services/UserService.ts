import { getRepository } from "typeorm";
import { User } from "../models/User";
import { AbstractService } from "./AbstractService";
import * as bcrypt from 'bcrypt';
import { config } from "../conf/config";

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
        return this.save(user);
    }

    async singIn(user: User){
        const dbUser = await this.repository.findOne({email: user.email});
        if(!dbUser){
            throw UserErrors.UserNotFound;
        }
        if(!bcrypt.compareSync(user.password, dbUser.password)){
            throw UserErrors.WrongPassword;
        }
        return true;
    }
}