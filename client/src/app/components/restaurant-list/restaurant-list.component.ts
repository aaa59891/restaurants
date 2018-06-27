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
    restaurants: Restaurant[];
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
                (restaurant) => this.restaurants = restaurant
            ),
            this.collectionRestaurantService.currentRestaurantIds.subscribe(
                (ids) => this.restaurants.forEach((rest) => rest.isExist = ids.indexOf(rest.id) !== -1)
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
                    this.collectionRestaurantService.addCollectionRestaurantSub.next(res);
                }
            )
    }
}
