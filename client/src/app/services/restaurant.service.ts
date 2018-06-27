import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Restaurant } from "../models/restaurant";
import { Subject } from "rxjs";
import { environment } from "../../environments/environment";
import * as moment from 'moment';

@Injectable({
    providedIn: "root"
})
export class RestaurantService {
    restaurants = new Subject<Restaurant[]>();
    constructor(private http: HttpClient) {}

    getRestaurants(datetime: Date) {
        const datetimeStr = moment(datetime).format('YYYY-MM-DD HH:mm:ss');
        this.http.get(environment.url + `restaurants?datetime=${datetimeStr}`)
            .subscribe(
                (data: Restaurant[]) => {
                    this.restaurants.next(data);
                }
            )
    }
}
