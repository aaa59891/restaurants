import { Injectable } from "@angular/core";
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from "@angular/router";
import { AuthService } from "../services/auth.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from "../models/user";

@Injectable()
export class SecureGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        const user = this.authService.getCurrentUser();
        const helper = new JwtHelperService();
        if(!user || helper.isTokenExpired(user.token)){
            localStorage.removeItem('user');
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}
