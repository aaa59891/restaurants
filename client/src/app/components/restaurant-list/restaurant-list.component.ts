import { Component, OnInit } from "@angular/core";
import { AutoUnsubscribe } from "../../shared/autoUnsubscribe";
import { RestaurantService } from "../../services/restaurant.service";
import { Restaurant } from "../../models/restaurant";

@Component({
    selector: "app-restaurant-list",
    templateUrl: "./restaurant-list.component.html",
    styleUrls: ["./restaurant-list.component.css"]
})
export class RestaurantListComponent extends AutoUnsubscribe implements OnInit {
    protected subscriptions = [];
    restaurants: Restaurant[];
    constructor(
        private restaurantService: RestaurantService
    ) {
        super();
    }

    ngOnInit() {
        this.subscriptions.push(
            this.restaurantService.restaurants.subscribe(
                (restaurant) => this.restaurants = restaurant
            )
        );
    }
}
