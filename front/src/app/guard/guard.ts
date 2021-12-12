import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import {TokenService} from '../services/token-service.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor( private _tokenService: TokenService,private _router: Router) { }

  canActivate(): boolean {
    if (String(this._tokenService.getUser())!="null") {
      return true;
    } else {
      this._router.navigate([''])
      return false;
    }
  }

}
