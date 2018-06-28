import { Injectable, NgZone } from "@angular/core";
import * as socketIo from "socket.io-client";
import { environment } from "../../environments/environment";
import { AuthService } from "./auth.service";
import { CollectionRestaurant } from "../models/collectionRestaurant";
import { CollectionRestaurantService } from "./collection-restaurant.service";
import { Subject } from "rxjs";
import { Collection } from "../models/collection";

@Injectable({
    providedIn: "root"
})
export class SocketService {
    io: SocketIOClient.Socket;
    deleteCollectionRestaurantSub = new Subject<number>();
    addCollectionRestaurantSub = new Subject<CollectionRestaurant>();
    updateCollectionRestaurantNameSub = new Subject<CollectionRestaurant>();
    addCollectionSub = new Subject<Collection>();
    deleteCollectionSub = new Subject<number>();
    updateCollectionNameSub = new Subject<Collection>();

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
        this.onAddCollection();
        this.onDeleteCollection();
        this.onUpdateCollectionName();
    }

    resetAllEvent(){
        this.io.removeAllListeners();
    }
    
    private onAddCollectionRestaurant(){
        const addCollectionRestaurantEvent = `${this.userId}_addCollectionRestaurant`;
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

    private onAddCollection(){
        this.io.on(`${this.userId}_addCollection`, (collection: Collection) => {
            this.zone.run(() => {
                this.addCollectionSub.next(collection);
            });
        })
    }

    private onDeleteCollection(){
        this.io.on(`${this.userId}_deleteCollection`, (id) => {
            this.zone.run(() => {
                this.deleteCollectionSub.next(id);
            })
        })
    }

    private onUpdateCollectionName(){
        this.io.on(`${this.userId}_upateCollectionName`, (collection: Collection) => {
            this.zone.run(() => {
                this.updateCollectionNameSub.next(collection);
            })
        })
    }
}
