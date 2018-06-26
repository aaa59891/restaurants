import { AbstractService } from "./AbstractService";
import { Restaurant } from "../models/Restaurant";
import { getRepository } from "typeorm";

const SQL_OPENING_RESTAURANTS = `
SELECT * FROM restaurant
WHERE restaurant.id IN(
	SELECT DISTINCT(restaurantId) FROM opening_hours AS oh
	WHERE 1=1 
	AND oh.day = ?
	AND 
		CASE WHEN oh.openTime < oh.closeTime THEN
			oh.openTime <= ? AND oh.closeTime > ?
		ELSE 
			oh.openTime <= ? OR oh.closeTime > ? 
		END
)
`

export class RestaurantService extends AbstractService<Restaurant>{
    protected repository = getRepository(Restaurant);

    async getTotalCount(){
        return this.repository.count();
    }

    async getOpenRestaurants(time: Date){
        const day = time.getDay();
        const timeStr = time.toTimeString().slice(0, 8);
        return this.repository.query(
            SQL_OPENING_RESTAURANTS, 
            [day === 0? 7: day, timeStr, timeStr, timeStr, timeStr]);
    }
}