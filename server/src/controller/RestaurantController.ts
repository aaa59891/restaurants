import { Request, Response, NextFunction } from "express";
import { RestaurantService } from "../services/RestaurantService";

export class RestaurantController{
    constructor(private restaurantService: RestaurantService){}
    async getRestaurants(req: Request, res: Response, next: NextFunction){
        try{
            const datetime = new Date(req.query['datetime']);
            const restaurant = await this.restaurantService.getOpenRestaurants(datetime);
            res.send(restaurant);
        }catch(error){
            console.error(error);
            res.status(500).send();
        }
        
    }
}