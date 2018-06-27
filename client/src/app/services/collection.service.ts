import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Collection } from "../models/collection";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment";
import { Subject } from "rxjs";

enum CollectionErr{
    NameDuplicate = 'This name is duplicate'
}
@Injectable({
    providedIn: "root"
})
export class CollectionService {
    collectionAddSub = new Subject<Collection>();
    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    addCollection(col: Collection){
        this.http.post(environment.url + 'collection', col)
            .subscribe(
                (res) => {
                    this.collectionAddSub.next(res as Collection);
                },
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

    getCollection(){
        return this.http.get(environment.url + `collection/${this.authService.userId}`);
    }
}
