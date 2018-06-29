import { AbstractController } from "./AbstractController";
import { CollectionRestaurantService } from "../services/CollectionRestaurantService";
import { Request, Response, NextFunction } from "express";
import { Errors } from "../shared/Error";
import { SocketHelper, EmitEvents } from "../shared/SocketHelper";

export class CollectionRestaurantController extends AbstractController{
    constructor(private crService: CollectionRestaurantService){
        super();
    }

    async addCollRestaurant(req: Request, res: Response, next: NextFunction){
        try {
            const userId = res.locals.userId;
            const result = await this.crService.save(req.body);
            SocketHelper.emit(userId, EmitEvents.AddCollectionRestaurant, result);
            res.send(result);
        } catch (error) {
            console.error(error);
            res.status(500).send();
        }
    }

    async getCollRestaurants(req: Request, res: Response, next: NextFunction){
        try {
            const result = await this.crService.getCollectionRestByColId(this.getNumberParameter(req, 'id'));
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

    async deleteCr(req: Request, res: Response, next: NextFunction){
        try {
            const userId = res.locals.userId;
            const id = this.getNumberParameter(req, 'id');
            await this.crService.deleteById(id);
            SocketHelper.emit(userId, EmitEvents.DeleteCollectionRestaurant, id);
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

    async updateCr(req: Request, res: Response, next: NextFunction){
        try {
            const userId = res.locals.userId;
            const result = await this.crService.updateCollectionRestaurantName(req.body);
            SocketHelper.emit(userId, EmitEvents.UpdateCollectionRestaurantName, req.body);
            res.send(result);
        } catch (error) {
            console.error(error);
            res.status(500).send();
        }
    }
}