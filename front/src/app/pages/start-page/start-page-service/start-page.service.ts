import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import {any} from 'codelyzer/util/function';
import {TokenService} from '../../../services/token-service.service';


@Injectable({
  providedIn: 'root'
})
export class StartPageService {

  constructor(private _http: Http,private _tokenService: TokenService) { }

  public authUser(obj: any): any {
    return this._http.post('http://localhost:21232/login', obj).pipe(
      map(res => res.json(),
        (err: any) => {
          this.handleError(err);
        }
      ),
    );
  }

  public addNewUser(obj: any): any {
    console.log(any());
    return this._http.post('http://localhost:21232/register', obj).pipe(
      map(res => res.json(),
        (err: any) => {
          this.handleError(err);
        }
      ),
    );
  }

  handleError(err: any): any {
    return Observable.throw(err || 'Error 500');
  }

  isLoggedIn() {
    return this._tokenService.getToken() !== null;
  }

  getUser() {
    return this._tokenService.getUser();
  }

  logOut() {
    this._tokenService.signOut();
  }


}
