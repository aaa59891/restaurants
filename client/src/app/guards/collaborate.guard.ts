import { Injectable } from "@angular/core";
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from "@angular/router";
import { AuthService } from "../services/auth.service";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class CollaborateGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        const helper = new JwtHelperService();
        const token = route.queryParams["token"];
        const isExpired = helper.isTokenExpired(token);
        const decode = helper.decodeToken(token);
        const userId = decode['userId'];
        if(!userId || isExpired){
            if(isExpired){
                alert('Token has expired.');
            }
            this.router.navigate(['/login']);
            return false;
        }
        this.authService.userId = userId;
        return true;
    }
}
