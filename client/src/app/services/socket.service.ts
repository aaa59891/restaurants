import { Injectable, NgZone } from "@angular/core";
import * as socketIo from "socket.io-client";
import { environment } from "../../environments/environment";
import { AuthService } from "./auth.service";
import { CollectionRestaurant } from "../models/collectionRestaurant";
import { CollectionRestaurantService } from "./collection-restaurant.service";

@Injectable({
    providedIn: "root"
})
export class SocketService {
    io: SocketIOClient.Socket;
    private userId: number;
    constructor(
        private collectionRestaurantService: CollectionRestaurantService,
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
    }

    resetAllEvent(){
        this.io.removeAllListeners();
    }
    
    private onAddCollectionRestaurant(){
        const addCollectionRestaurantEvent = `${this.userId}_addCollectionRestaurant`;
        console.log(addCollectionRestaurantEvent);
        this.io.on(addCollectionRestaurantEvent, (data: CollectionRestaurant) => {
            this.zone.run(() => {
                this.collectionRestaurantService.addCollectionRestaurantSub.next(data);
            })
        });
        
    }
}
