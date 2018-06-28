import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { tap } from 'rxjs/operators';
import { SocketService } from "./socket.service";
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
    email: string;
    userId: number;
    token: string;
    constructor(
        private http: HttpClient,
        private socketService: SocketService
    ) {}

    login(user: User){
        return this.http.post(environment.apiUrl + 'signin', user)
            .pipe(
                tap(res => {
                    this.token = res['token'];
                    this.email = res['email'];
                    this.userId = res['id'];
                    this.initAllSocket();
                })
            )
    }

    signup(user: User){
        return this.http.post(environment.apiUrl + 'signup', user)
            .pipe(
                tap(res => {
                    this.token = res['token'];
                    this.email = res['email'];
                    this.userId = res['id'];
                    this.initAllSocket();
                })
            )
    }

    initAllSocket(){
        this.socketService.resetAllEvent();
        this.socketService.initSocketListen(this.userId);
    }
}
