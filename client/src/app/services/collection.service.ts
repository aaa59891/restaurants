import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Collection } from "../models/collection";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment";

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
        return this.http.get(environment.apiUrl + 'collection');
    }

    shareWithFriend(email: string){
        const payload = {email, userId: this.authService.userId};
        return this.http.post(environment.apiUrl + 'mailToFriend', payload);
    }

    deleteCollection(id: number){
        return this.http.delete(environment.apiUrl + `collection/${id}`);
    }

    updateCollectionName(collection: Collection){
        return this.http.put(environment.apiUrl + 'collection', collection);
    }
}
