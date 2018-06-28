import { App } from "../App";

export class SocketHelper{
    static emit(userId: number, event: string, payload: any){
        console.log('emit: ', `${userId}_${event}`);
        App.io.emit(`${userId}_${event}`, payload);
    }
}

export enum EmitEvents{
    AddCollectionRestaurant = 'addCollectionRestaurant'
}