import { Component, OnInit } from "@angular/core";
import { CollectionService } from "../../services/collection.service";
import { Collection } from "../../models/collection";
import { AutoUnsubscribe } from "../../shared/autoUnsubscribe";

@Component({
    selector: "app-collection-restaurant-list",
    templateUrl: "./collection-restaurant-list.component.html",
    styleUrls: ["./collection-restaurant-list.component.css"]
})
export class CollectionRestaurantListComponent extends AutoUnsubscribe implements OnInit {
    protected subscriptions = [];
    collections: Collection[] = [];
    constructor(private colService: CollectionService) {
        super();
    }

    ngOnInit() {
        this.subscriptions.push(
            this.colService.collectionAddSub.subscribe(
                (col) => {
                    this.collections.push(col);
                }
            )
        )
        this.colService.getCollection().subscribe(
            (data: Collection[]) => this.collections = data
        );
    }
}
