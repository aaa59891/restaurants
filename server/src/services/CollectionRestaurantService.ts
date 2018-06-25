import { AbstractService } from "./AbstractService";
import { CollectionRestaurant } from "../models/CollectionRestaurant";
import { getRepository } from "typeorm";

export class CollectionRestaurantService extends AbstractService<CollectionRestaurant>{
    protected repository = getRepository(CollectionRestaurant);

    async getCollectionRestByColId(id: number){
        return this.repository
            .createQueryBuilder('cr')
            .leftJoinAndSelect('cr.restaurant', 'restaurant')
            .where('cr.collectionId = :id', {id})
            .getMany();
    }
}