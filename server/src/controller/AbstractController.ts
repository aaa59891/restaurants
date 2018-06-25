import { Request } from "express";
import { Errors } from "../shared/Error";

export abstract class AbstractController{
    protected getNumberParameter(req: Request, parameterName: string){
        const param = parseInt(req.params[parameterName]);
        if(!Number.isInteger(param)){
            throw Errors.InvalidParam;
        }
        return param;
    }
}