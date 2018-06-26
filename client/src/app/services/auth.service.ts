import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Subject } from "rxjs";

export enum LoginError{
    EmailNotExist = 'The email does not exist.',
    WrongPassword = 'Password is incorrect!'
}

export enum SignupError{
    EmailExists = 'The email already exists.'
}

@Injectable({
    providedIn: "root"
})
export class AuthService {
    email = new Subject<String>();
    userId = new Subject<number>();
    constructor(private http: HttpClient) {}

    login(user: User){
        return this.http.post(environment.url + 'signin', user)
    }

    signup(user: User){
        return this.http.post(environment.url + 'signup', user);
    }
}
