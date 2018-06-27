import { Component, OnInit } from "@angular/core";
import { AutoUnsubscribe } from "../../shared/autoUnsubscribe";
import { RestaurantService } from "../../services/restaurant.service";
import { Restaurant } from "../../models/restaurant";
import { CollectionService } from "../../services/collection.service";
import { CollectionRestaurant } from "../../models/collectionRestaurant";
import { CollectionRestaurantService } from "../../services/collection-restaurant.service";

@Component({
    selector: "app-restaurant-list",
    templateUrl: "./restaurant-list.component.html",
    styleUrls: ["./restaurant-list.component.css"]
})
export class RestaurantListComponent extends AutoUnsubscribe implements OnInit {
    protected subscriptions = [];
    restaurants: Restaurant[] = [];
    constructor(
        private restaurantService: RestaurantService,
        private collectionService: CollectionService,
        private collectionRestaurantService: CollectionRestaurantService
    ) {
        super();
    }

    ngOnInit() {
        this.subscriptions.push(
            this.restaurantService.restaurants.subscribe(
                (restaurant) => {
                    this.checkRestaurants(restaurant, this.collectionRestaurantService.currentRestaurantIds);
                    this.restaurants = restaurant;
                }
            ),
            this.collectionRestaurantService.currentRestaurantIdsSub.subscribe(
                (ids) => this.checkRestaurants(this.restaurants, ids)
            )
        );
    }

    onAddToCollection(restaurant: Restaurant){
        if(!this.collectionService.currentCollectionId){
            alert('Please select a collection first!');
            return;
        }
        const collectionRestaurant = new CollectionRestaurant();
        collectionRestaurant.restaurant = {...restaurant};
        collectionRestaurant.name = restaurant.name;
        collectionRestaurant.collection = {id: this.collectionService.currentCollectionId};
        this.collectionRestaurantService.addCollectionRestaurant(collectionRestaurant)
            .subscribe(
                (res: CollectionRestaurant) => {
                    restaurant.isExist = true;
                    console.log(res);
                    this.collectionRestaurantService.addCollectionRestaurantSub.next(res);
                }
            )
    }

    private checkRestaurants(restaurants: Restaurant[], ids: number[]){
        restaurants.forEach((rest) => rest.isExist = ids.indexOf(rest.id) !== -1)
    }
}
