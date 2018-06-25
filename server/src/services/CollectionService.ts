import { AbstractService } from "./AbstractService";
import { getRepository } from "typeorm";
import { Collection } from "../models/Collection";

export class CollectionService extends AbstractService<Collection>{
    protected repository = getRepository(Collection);

}