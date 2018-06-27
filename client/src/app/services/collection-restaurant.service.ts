import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { CollectionRestaurant } from "../models/collectionRestaurant";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class CollectionRestaurantService {
    addCollectionRestaurantSub = new Subject<CollectionRestaurant>();
    currentRestaurantIdsSub = new Subject<number[]>();
    currentRestaurantIds: number[] = [];
    constructor(private http: HttpClient) {
        this.currentRestaurantIdsSub.subscribe((ids) => this.currentRestaurantIds = ids);
    }

    getCollectionRestaurants(collectionId: number) {
        return this.http.get(environment.url + `collection_restaurant_list/${collectionId}`);
    }

    addCollectionRestaurant(collectionRestaurant: CollectionRestaurant){
        return this.http.post(environment.url + 'collection_restaurant', collectionRestaurant);
    }

    updateCollectionRestaurant(collectionRestaurant: CollectionRestaurant){
        return this.http.put(environment.url + 'collection_restaurant', collectionRestaurant);
    }
}
