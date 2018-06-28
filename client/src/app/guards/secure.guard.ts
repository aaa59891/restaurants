import { Injectable } from "@angular/core";
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class SecureGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        if(!this.authService.email){
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}
