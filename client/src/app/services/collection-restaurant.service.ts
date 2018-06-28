import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { CollectionRestaurant } from "../models/collectionRestaurant";
import { Subject } from "rxjs";
import { SocketService } from "./socket.service";

@Injectable({
    providedIn: "root"
})
export class CollectionRestaurantService {
    currentRestaurantIdsSub = new Subject<number[]>();
    currentCollectionId: number;
    collectionRestaurants: CollectionRestaurant[] = [];

    constructor(
        private http: HttpClient,
        private socketService: SocketService
    ) {
        this.socketService.addCollectionRestaurantSub.subscribe((rest) => {
            if(rest.collection.id === this.currentCollectionId){
                this.collectionRestaurants.push(rest);
            }
        });

        this.socketService.deleteCollectionRestaurantSub.subscribe((id) => {
            this.collectionRestaurants = this.collectionRestaurants.filter((rest) => rest.id !== id)
        });

        this.socketService.updateCollectionRestaurantNameSub.subscribe((newRest) => {
            if(newRest.collection.id !== this.currentCollectionId){
                return;
            }
            this.collectionRestaurants.forEach((rest) => {
                if(rest.id === newRest.id){
                    rest.name = newRest.name;
                    return;
                }
            })
        })
    }
    
    getCollectionRestaurants(collectionId: number) {
        if(!collectionId){
            this.currentCollectionId = 0;
            this.collectionRestaurants = [];
            this.sendNewRestaurantIds();
            return;
        }
        this.http.get(environment.apiUrl + `collection_restaurant_list/${collectionId}`)
            .subscribe((res: CollectionRestaurant[]) => {
                this.currentCollectionId = collectionId;
                this.collectionRestaurants = res
                this.sendNewRestaurantIds();
            });
    }

    addCollectionRestaurant(collectionRestaurant: CollectionRestaurant){
        this.http.post(environment.apiUrl + 'collection_restaurant', collectionRestaurant)
            .subscribe()
    }

    updateCollectionRestaurant(collectionRestaurant: CollectionRestaurant){
        return this.http.put(environment.apiUrl + 'collection_restaurant', collectionRestaurant);
    }

    deleteCollectionRestaurant(restaurantId: number){
        return this.http.delete(environment.apiUrl + `collection_restaurant/${restaurantId}`);
    }

    private sendNewRestaurantIds(){
        this.currentRestaurantIdsSub.next(this.collectionRestaurants.map((res) => res.restaurant.id));
    }
}
