import {NextFunction, Request, Response} from "express";
import { UserService, UserErrors } from "../services/UserService";

export class UserController {

    constructor(private userService: UserService){}

    async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.userService.signUp(req.body)
            res.send(result);
        } catch (e) {
            switch (e) {
                case UserErrors.EmailExist:
                    res.status(401).send(e);
                    break;
                default:
                    res.status(500).send();
                    break;
            }
        }
    }

    async signIn(req: Request, res: Response, next: NextFunction){
        try {
            await this.userService.singIn(req.body);
            res.send();
        } catch (e) {
            switch(e){
                case UserErrors.UserNotFound:
                case UserErrors.WrongPassword:
                    res.status(401).send(e);
                    break;
                default:
                    res.status(500).send();
                    break;
            }
        }   
    }

}