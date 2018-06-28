import { Component, OnInit, NgZone } from "@angular/core";
import { DestroyHelper } from "../../shared/destroyHelper";
import { RestaurantService } from "../../services/restaurant.service";
import { Restaurant } from "../../models/restaurant";
import { CollectionService } from "../../services/collection.service";
import { CollectionRestaurant } from "../../models/collectionRestaurant";
import { CollectionRestaurantService } from "../../services/collection-restaurant.service";
import { AuthService } from "../../services/auth.service";
import { SocketService } from "../../services/socket.service";

@Component({
    selector: "app-restaurant-list",
    templateUrl: "./restaurant-list.component.html",
    styleUrls: ["./restaurant-list.component.css"]
})
export class RestaurantListComponent extends DestroyHelper implements OnInit {
    protected subscriptions = [];
    restaurants: Restaurant[] = [];
    constructor(
        public restaurantService: RestaurantService,
        private collectionService: CollectionService,
        private collectionRestaurantService: CollectionRestaurantService,
        private socketService: SocketService
    ) {
        super();
    }

    ngOnInit() {
        this.subscriptions.push(
            this.restaurantService.restaurantsSub.subscribe(
                (restaurants) => {
                    const ids = this.collectionRestaurantService.collectionRestaurants.map((res) => res.restaurant.id);
                    this.checkRestaurants(restaurants, ids);
                    this.restaurants = restaurants;
                }
            ),
            this.collectionRestaurantService.currentRestaurantIdsSub.subscribe(
                (ids) => {
                    this.checkRestaurants(this.restaurants, ids)
                }
            ),
            this.socketService.addCollectionRestaurantSub.subscribe(
                (data) => {
                    if(data.collection.id !== this.collectionService.currentCollectionId){
                        return;
                    }
                    this.restaurants.forEach((rest) => {
                        if(rest.id === data.restaurant.id){
                            rest.isExist = true;
                            return;
                        }
                    })
                }
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
        this.collectionRestaurantService.addCollectionRestaurant(collectionRestaurant);
    }

    private checkRestaurants(restaurants: Restaurant[], ids: number[]){
        restaurants.forEach((rest) => rest.isExist = ids.indexOf(rest.id) !== -1)
    }
}
