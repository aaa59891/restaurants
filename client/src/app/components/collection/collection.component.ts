import { Component, OnInit } from "@angular/core";
import { AutoUnsubscribe } from "../../shared/autoUnsubscribe";
import { AuthService } from "../../services/auth.service";
import { CollectionService } from "../../services/collection.service";
import { Collection } from "../../models/collection";

@Component({
    selector: "app-collection",
    templateUrl: "./collection.component.html",
    styleUrls: ["./collection.component.css"]
})
export class CollectionComponent extends AutoUnsubscribe implements OnInit {
    protected subscriptions = [];
    name: string;
    constructor(
        private authService: AuthService,
        private colService: CollectionService
    ) {
        super();
    }

    ngOnInit() {
    }

    onAddCollection(){
        const col = new Collection();
        col.name = this.name;
        col.user = {id: this.authService.userId};
        this.colService.addCollection(col);
    }
}
