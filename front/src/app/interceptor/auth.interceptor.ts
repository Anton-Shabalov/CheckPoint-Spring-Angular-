import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import {TokenService} from "../services/token-service.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _tokenService: TokenService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    let authRequest = request;
    const token = this._tokenService.getToken();
    if (token != null) {
      authRequest = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)})
    }
    return next.handle(authRequest);
  }
}
