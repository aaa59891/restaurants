import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService, LoginError, SignupError } from "../../services/auth.service";
import { NgForm } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { User } from "../../models/user";
import { Router } from "@angular/router";
import { DestroyHelper } from "../../shared/destroyHelper";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent extends DestroyHelper implements OnInit {
    protected subscriptions = [];
    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        super();
    }
    @ViewChild('form') form: NgForm;
    ngOnInit() {
        if(this.authService.getCurrentUser()){
            this.router.navigate(['/']);
        }
    }

    onLogin(){
        this.authService.login(this.form.value)
            .subscribe(
                (res: User) => {
                    this.loginSignupSuccess(res);
                },
                (err: HttpErrorResponse) => {
                    alert('Email does not exist or password is incorrect.');
                }
            )
    }

    onSignup(){
        this.authService.signup(this.form.value)
            .subscribe(
                (res: User) => {
                    this.loginSignupSuccess(res);
                },
                (err: HttpErrorResponse) => {
                    console.error(err.error);
                    switch(err.error){
                        case SignupError.EmailExists:
                            alert(err.error);
                            break;
                        default:
                            alert('Unknow error.');
                            break;
                    }
                }
            )
    }

    private loginSignupSuccess(user: User){
        this.router.navigate(['/']);
    }
}
