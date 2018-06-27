import { Repository, DeepPartial, ObjectLiteral } from "typeorm";

export abstract class AbstractService<Entity extends ObjectLiteral>{
    protected abstract repository: Repository<Entity>;

    async create<T extends DeepPartial<Entity>>(model: T){
        return this.repository.create(model);
    }

    async deleteById(id: number){
        return this.repository.delete(id);
    }
    
}