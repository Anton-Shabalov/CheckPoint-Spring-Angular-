import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import {TokenService} from '../services/token-service.service';

@Injectable()
export class LoggedInAuthGuard implements CanActivate {

  constructor(private _tokenService: TokenService, private _router: Router) { }

  canActivate(): boolean {
    if (String(this._tokenService.getUser())!="null") {
      this._router.navigate(['/main'])
      return false
    } else {
      return true
    }
  }
}
