import { AbstractService } from "./AbstractService";
import { getRepository } from "typeorm";
import { Collection } from "../models/Collection";

export class CollectionService extends AbstractService<Collection>{
    protected repository = getRepository(Collection);

    async getCollectionByUserId(id: number){
        return this.repository.find({user: {id: id}});
    }

    async updateCollectionName(collection: Collection){
        return this.repository.createQueryBuilder()
        .update(Collection)
        .set({name: collection.name})
        .where('id = :id', {id: collection.id})
        .execute();
    }
}