import { Injectable, NgZone } from "@angular/core";
import * as socketIo from "socket.io-client";
import { environment } from "../../environments/environment";
import { AuthService } from "./auth.service";
import { CollectionRestaurant } from "../models/collectionRestaurant";
import { CollectionRestaurantService } from "./collection-restaurant.service";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class SocketService {
    io: SocketIOClient.Socket;
    deleteCollectionRestaurantSub = new Subject<number>();
    addCollectionRestaurantSub = new Subject<CollectionRestaurant>();
    updateCollectionRestaurantNameSub = new Subject<CollectionRestaurant>();
    private userId: number;
    constructor(
        private zone: NgZone
    ) {
        this.io = socketIo(environment.socketUrl);
        this.io.on("connect", () => {
            console.log("check 2", this.io.connected);
        });
    }

    initSocketListen(userId: number){
        this.userId = userId;
        this.onAddCollectionRestaurant();
        this.onDeleteCollectionRestaurant();
        this.onUpdateCollectionRestaurantName();
    }

    resetAllEvent(){
        this.io.removeAllListeners();
    }
    
    private onAddCollectionRestaurant(){
        const addCollectionRestaurantEvent = `${this.userId}_addCollectionRestaurant`;
        console.log(addCollectionRestaurantEvent);
        this.io.on(addCollectionRestaurantEvent, (data: CollectionRestaurant) => {
            this.zone.run(() => {
                this.addCollectionRestaurantSub.next(data);
            })
        });
    }

    private onDeleteCollectionRestaurant(){
        this.io.on(`${this.userId}_deleteCollectionRestaurant`, (id) => {
            this.zone.run(() => {
                this.deleteCollectionRestaurantSub.next(id);
            });
        });
    }

    private onUpdateCollectionRestaurantName(){
        this.io.on(`${this.userId}_updateCOllectionRestaurantName`, (newRest: CollectionRestaurant) => {
            this.zone.run(() => {
                console.log(newRest);
                this.updateCollectionRestaurantNameSub.next(newRest);
            });
        })
    }
}
