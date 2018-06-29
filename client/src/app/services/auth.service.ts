import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { tap } from 'rxjs/operators';
import { SocketService } from "./socket.service";
import { Router } from "@angular/router";
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
        private socketService: SocketService,
        private router: Router
    ) {}

    login(user: User){
        return this.http.post(environment.apiUrl + 'signin', user)
            .pipe(
                tap( (res: User) => {
                    this.setUser(res);
                    this.storeCurrentUser(res);
                    this.initAllSocket();
                })
            )
    }

    signup(user: User){
        return this.http.post(environment.apiUrl + 'signup', user)
            .pipe(
                tap( (res:User) => {
                    this.setUser(res)
                    this.storeCurrentUser(res);
                    this.initAllSocket();
                })
            )
    }

    logout(){
        this.email = '';
        this.userId = 0;
        this.token = '';
        localStorage.removeItem('user');
        this.socketService.resetAllEvent();
        this.router.navigate(['/login']);
    }

    getCurrentUser(){
        const userStr = localStorage.getItem('user');
        if(!userStr){
            return null;
        }
        try {
            const user: User = JSON.parse(userStr);
            this.setUser(user);
            return user;
        } catch (error) {
            return null;
        }
    }

    setUser(user: User){
        this.userId = user.id;
        this.email = user.email;
        this.token = user.token;
    }

    initAllSocket(){
        this.socketService.resetAllEvent();
        this.socketService.initSocketListen(this.userId);
    }

    private storeCurrentUser(user: User){
        const temp = {...user, password: null};
        localStorage.setItem('user', JSON.stringify(temp));
    }
}
