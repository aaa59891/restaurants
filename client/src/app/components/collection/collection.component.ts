import { Component, OnInit } from "@angular/core";
import { DestroyHelper } from "../../shared/destroyHelper";
import { AuthService } from "../../services/auth.service";
import { CollectionService, CollectionErr } from "../../services/collection.service";
import { Collection } from "../../models/collection";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: "app-collection",
    templateUrl: "./collection.component.html",
    styleUrls: ["./collection.component.css"]
})
export class CollectionComponent extends DestroyHelper implements OnInit {
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
        this.colService.addCollection(col)
            .subscribe(
                (_) => {},
                (err: HttpErrorResponse) => {
                    console.log(err.error);
                    switch(err.error){
                        case CollectionErr.NameDuplicate:
                            alert(err.error);
                        break;
                        default:
                            alert('Server error.');
                            break;
                    }
                }
            )
    }
}
