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
    restaurantsSub = new Subject<Restaurant[]>();
    constructor(private http: HttpClient) {}

    getRestaurants(datetime: Date) {
        const datetimeStr = moment(datetime).format('YYYY-MM-DD HH:mm:ss');
        this.http.get(environment.apiUrl + `restaurants?datetime=${datetimeStr}`)
            .subscribe(
                (data: Restaurant[]) => {
                    this.restaurantsSub.next(data);
                }
            )
    }
}
