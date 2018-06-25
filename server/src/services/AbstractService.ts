import { Repository, DeepPartial, ObjectLiteral } from "typeorm";

export abstract class AbstractService<Entity extends ObjectLiteral>{
    protected abstract repository: Repository<Entity>;

    async save<T extends DeepPartial<Entity>>(model: T){
        return this.repository.save(model);
    }

    async deleteById(id: number){
        return this.repository.delete(id);
    }
}