import { Component, OnInit } from "@angular/core";
import { IDatePickerConfig } from "ng2-date-picker";
import { RestaurantService } from "../../services/restaurant.service";
import * as moment from 'moment';
@Component({
    selector: "app-restaurant-search-form",
    templateUrl: "./restaurant-search-form.component.html",
    styleUrls: ["./restaurant-search-form.component.css"]
})
export class RestaurantSearchFormComponent implements OnInit {
    datetime;
    pickerConfig: IDatePickerConfig = {
        format: 'YYYY-MM-DD HH:mm',
        showTwentyFourHours: true
    };
    constructor(
        private restaurantService: RestaurantService
    ) {}

    ngOnInit() {}

    onSearch(){
        this.restaurantService.getRestaurants(moment(this.datetime, this.pickerConfig.format).toDate());
    }
}
