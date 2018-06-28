import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
  constructor(
      private authService: AuthService
  ) {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
 
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', this.authService.token || '')
    });
 
    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}