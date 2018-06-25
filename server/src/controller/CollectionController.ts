import { CollectionService } from "../services/CollectionService";
import { Request, Response, NextFunction } from "express";
import { AbstractController } from "./AbstractController";
import { Errors } from "../shared/Error";

export class CollcetionController extends AbstractController{
    constructor(private collectionService: CollectionService){
        super()
    }

    async addCollection(req: Request, res: Response, next: NextFunction){
        try {

            const result = await this.collectionService.save(req.body);
            res.send(result);
        } catch (error) {
            res.status(500).send();
        }
    }

    async getCollection(req: Request, res: Response, next: NextFunction){
        try {
            const result = await this.collectionService.getCollectionByUserId(this.getNumberParameter(req, 'id'));
            res.send(result);
        } catch (error) {
            switch (error) {
                case Errors.InvalidParam:
                    res.status(401).send(error);
                    break;
                default:
                    res.status(500).send();
                    break;
            }
        }
    }

    async deleteCollection(req: Request, res: Response, next: NextFunction){
        try {
            await this.collectionService.deleteById(this.getNumberParameter(req, 'id'));
            res.send();
        } catch (error) {
            switch (error) {
                case Errors.InvalidParam:
                    res.status(401).send(error);
                    break;
                default:
                    res.status(500).send();
                    break;
            }
        }
    }
}