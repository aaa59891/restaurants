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
    currentRestaurantIds = new Subject<number[]>();
    constructor(private http: HttpClient) {}

    getCollectionRestaurants(collectionId: number) {
        return this.http.get(environment.url + `collection_restaurant_list/${collectionId}`);
    }

    addCollectionRestaurant(collectionRestaurant: CollectionRestaurant){
        return this.http.post(environment.url + 'collection_restaurant', collectionRestaurant);
    }
}
