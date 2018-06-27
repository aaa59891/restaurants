import { AbstractController } from "./AbstractController";
import { CollectionRestaurantService } from "../services/CollectionRestaurantService";
import { Request, Response, NextFunction } from "express";
import { Errors } from "../shared/Error";

export class CollectionRestaurantController extends AbstractController{
    constructor(private crService: CollectionRestaurantService){
        super();
    }

    async addCollRestaurant(req: Request, res: Response, next: NextFunction){
        try {
            const result = await this.crService.create(req.body);
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
                    res.status(401).send(error);
                    break;
                default:
                    res.status(500).send();
                    break;
            }
        }
    }

    async deleteCr(req: Request, res: Response, next: NextFunction){
        try {
            await this.crService.deleteById(this.getNumberParameter(req, 'id'))
            res.send();
        } catch (error) {
            console.error(error);
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

    async updateCr(req: Request, res: Response, next: NextFunction){
        try {
            const result = await this.crService.updateCollectionRestaurantName(req.body)
            res.send(result);
        } catch (error) {
            console.error(error);
            res.status(500).send();
        }
    }
}