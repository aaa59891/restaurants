import { Component, OnInit } from "@angular/core";
import { CollectionService } from "../../services/collection.service";
import { Collection } from "../../models/collection";
import { AutoUnsubscribe } from "../../shared/autoUnsubscribe";
import { CollectionRestaurantService } from "../../services/collection-restaurant.service";
import { CollectionRestaurant } from "../../models/collectionRestaurant";

@Component({
    selector: "app-collection-restaurant-list",
    templateUrl: "./collection-restaurant-list.component.html",
    styleUrls: ["./collection-restaurant-list.component.css"]
})
export class CollectionRestaurantListComponent extends AutoUnsubscribe implements OnInit {
    protected subscriptions = [];
    collections: Collection[] = [];
    collectionRestaurants: CollectionRestaurant[] = [];
    constructor(
        private collectionService: CollectionService,
        private collectionRestaurantService: CollectionRestaurantService
    ) {
        super();
    }

    ngOnInit() {
        this.subscriptions.push(
            this.collectionService.collectionAddSub.subscribe(
                (col) => {
                    this.collections.push(col);
                }
            ),
            this.collectionRestaurantService.addCollectionRestaurantSub.subscribe(
                (restaurant) => this.collectionRestaurants.push(restaurant)
            ),
            this.collectionRestaurantService.deleteRestaurantSub.subscribe(
                (id) => {
                    this.collectionRestaurants = this.collectionRestaurants.filter((res) => res.id !== id);
                    this.sendCurrentRestaurantIds();
                }
            )
        )
        this.collectionService.getCollection().subscribe(
            (data: Collection[]) => this.collections = data
        );
    }

    onChangeCollection(collectionId: string){
        if(!collectionId){
            this.collectionRestaurants = [];
            this.collectionRestaurantService.currentRestaurantIdsSub.next([]);
            return;
        }
        const id = parseInt(collectionId);
        this.collectionService.currentCollectionId =  id;
        this.collectionRestaurantService.getCollectionRestaurants(id)
            .subscribe(
                (res: CollectionRestaurant[]) =>{
                    this.collectionRestaurants = res;
                    this.sendCurrentRestaurantIds();
                } 
            )
    }

    private sendCurrentRestaurantIds(){
        this.collectionRestaurantService.currentRestaurantIdsSub.next(
            this.collectionRestaurants.map((res) => res.restaurant.id)
        );
    }
}
