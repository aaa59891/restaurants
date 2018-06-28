import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Collection } from "../models/collection";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment";
import { Subject } from "rxjs";

export enum CollectionErr{
    NameDuplicate = 'This name is duplicate'
}
@Injectable({
    providedIn: "root"
})
export class CollectionService {
    currentCollectionId: number;
    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    addCollection(col: Collection){
        return this.http.post(environment.apiUrl + 'collection', col);
    }

    getCollection(){
        return this.http.get(environment.apiUrl + `collection/${this.authService.userId}`);
    }

    shareWithFriend(email: string){
        const payload = {email, userId: this.authService.userId};
        return this.http.post(environment.apiUrl + 'mailToFriend', payload);
    }
}
