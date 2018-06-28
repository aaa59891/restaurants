import { App } from "../App";

export class SocketHelper{
    static emit(userId: number, event: string, payload: any){
        App.io.emit(`${userId}_${event}`, payload);
    }
}

export enum EmitEvents{
    AddCollectionRestaurant = 'addCollectionRestaurant',
    DeleteCollectionRestaurant = 'deleteCollectionRestaurant',
    UpdateCollectionRestaurantName = 'updateCOllectionRestaurantName',
    AddCollection = 'addCollection',
    DeleteCollection = 'deleteCollection',
    UpdateCollectionName = 'upateCollectionName'
}