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
        if(this.authService.email){
            this.router.navigate(['/']);
        }
        this.authService.login({email: 'chong@email.com', password: '1qaz2wsx'})
            .subscribe((res: User) => this.loginSignupSuccess(res));
    }

    onLogin(){
        this.authService.login(this.form.value)
            .subscribe(
                (res: User) => {
                    this.loginSignupSuccess(res);
                },
                (err: HttpErrorResponse) => {
                    console.log(err);
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
        this.router.navigate(['/']);
    }
}
