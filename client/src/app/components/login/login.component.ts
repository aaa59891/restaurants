import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService, LoginError, SignupError } from "../../services/auth.service";
import { NgForm } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { User } from "../../models/user";
import { Router } from "@angular/router";
import { AutoUnsubscribe } from "../../shared/autoUnsubscribe";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent extends AutoUnsubscribe implements OnInit {
    protected subscriptions = [];
    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        super();
    }
    @ViewChild('form') form: NgForm;
    ngOnInit() {
        this.subscriptions.push(
            this.authService.email.subscribe(
                (email) => email? this.router.navigate(['/']): null
            )
        );
    }

    onLogin(){
        this.authService.login(this.form.value)
            .subscribe(
                (res: User) => {
                    this.loginSignupSuccess(res);
                },
                (err: HttpErrorResponse) => {
                    switch(err.error){
                        case LoginError.EmailNotExist:
                            alert('This email does not exist, please sign up it first.');
                            break;
                        case LoginError.WrongPassword:
                            alert('Password is incorrect!');
                            break;
                        default:
                            alert('Unknow error.')
                            break;
                    }
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
                    console.log(err.error);
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
        this.authService.email.next(user.email);
        this.authService.userId.next(user.id);
    }
}
