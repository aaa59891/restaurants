import { Component, OnInit, Input } from "@angular/core";
import { CollectionRestaurant } from "../../models/collectionRestaurant";
import { CollectionRestaurantService } from "../../services/collection-restaurant.service";

@Component({
    selector: "app-collection-restaurant-item",
    templateUrl: "./collection-restaurant-item.component.html",
    styleUrls: ["./collection-restaurant-item.component.css"]
})
export class CollectionRestaurantItemComponent implements OnInit {
    @Input('restaurant') restaurant: CollectionRestaurant;
    newName: string;
    isEdit: boolean;
    constructor(private collectionResaurantService: CollectionRestaurantService) {}

    ngOnInit() {
        this.newName = this.restaurant.name;
    }

    onUpdateName(){
        if(this.newName === this.restaurant.name){
            this.isEdit = false;
            return;
        }
        const restTemp = {...this.restaurant};
        restTemp.name = this.newName;
        this.collectionResaurantService.updateCollectionRestaurant(restTemp)
            .subscribe(
                (_) => {
                    this.isEdit = false;
                    this.restaurant.name = this.newName;
                }
            )
    }
}
