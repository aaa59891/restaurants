import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Collection } from "../models/collection";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: "root"
})
export class CollectionService {
    constructor(
        private http: HttpClient,
    ) {}

    addCollection(col: Collection){
        this.http.post(environment.url + 'collection', col)
            .subscribe(
                (res) => {
                    console.log(res);
                },
                (err) => console.error(err)
            )
    }
}
