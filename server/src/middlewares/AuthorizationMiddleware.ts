import { Request, Response, NextFunction } from "express";
import { JwtHelper } from "../shared/JwtHelper";

export class AuthorizationMiddleware{
    static async checkJwt(req: Request, res: Response, next: NextFunction){
        try {
            const token = req.headers['authorization'];
            const payload: any = await JwtHelper.decodeAndVarifyJwt(token);
            res.locals.userId = payload.userId;
            next();
        } catch (error) {
            console.log(error);
            res.status(401).send('Token is invalid.');
        }
    }
}