import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { AutoUnsubscribe } from "../../shared/autoUnsubscribe";
import { Router } from "@angular/router";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
    constructor(
        public authService: AuthService,
        private router: Router

    ) {}

    ngOnInit() {}

    onLogout(){
        this.authService.email = '';
        this.authService.userId = 0;
        this.router.navigate(['/login']);
    }
}
