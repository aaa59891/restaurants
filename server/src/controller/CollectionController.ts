import { CollectionService } from "../services/CollectionService";
import { Request, Response, NextFunction } from "express";
import { AbstractController } from "./AbstractController";
import { Errors } from "../shared/Error";
import { QueryFailedError } from "typeorm";
import { SocketHelper, EmitEvents } from "../shared/SocketHelper";

export class CollcetionController extends AbstractController{
    constructor(private collectionService: CollectionService){
        super()
    }

    async addCollection(req: Request, res: Response, next: NextFunction){
        try {
            const userId = res.locals.userId;
            const result = await this.collectionService.save(req.body);
            SocketHelper.emit(userId, EmitEvents.AddCollection, result);
            res.send(result);
        } catch (error) {
            console.error(error);
            if(
                error instanceof QueryFailedError 
                &&
                (<QueryFailedError>error).message.indexOf('Duplicate') !== -1
            ){
                res.status(400).send('This name is duplicate');
                return;
            }
            res.status(500).send();
        }
    }

    async getCollection(req: Request, res: Response, next: NextFunction){
        try {
            const userId = res.locals.userId;
            const result = await this.collectionService.getCollectionByUserId(userId);
            res.send(result);
        } catch (error) {
            console.error(error);
            switch (error) {
                case Errors.InvalidParam:
                    res.status(400).send(error);
                    break;
                default:
                    res.status(500).send();
                    break;
            }
        }
    }

    async updateName(req: Request, res: Response, next: NextFunction){
        try {
            const userId = res.locals.userId;
            await this.collectionService.updateCollectionName(req.body);
            SocketHelper.emit(userId, EmitEvents.UpdateCollectionName, req.body);
            res.send(req.body);
        } catch (error) {
            console.log(error);
            res.status(500).send();
        }
    }

    async deleteCollection(req: Request, res: Response, next: NextFunction){
        try {
            const userId = res.locals.userId;
            const id = this.getNumberParameter(req, 'id');
            await this.collectionService.deleteById(id);
            SocketHelper.emit(userId, EmitEvents.DeleteCollection, id);
            res.send();
        } catch (error) {
            console.error(error);
            switch (error) {
                case Errors.InvalidParam:
                    res.status(400).send(error);
                    break;
                default:
                    res.status(500).send();
                    break;
            }
        }
    }
}