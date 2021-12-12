import { map } from 'rxjs/operators';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { getUserName } from '../../model/logic';
import { TokenService } from "../../../services/token-service.service";
import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DeleteAllPointsService {
  private username: any;

  constructor(private _http: Http, private _tokenService: TokenService) {}

  public dropAllPoints() {
    this.username = getUserName() ? getUserName() : this._tokenService.getUser();

    return this._http.delete(`http://localhost:21232/Table/${this.username}`).pipe(
      map(res => res,
        (error: any) => this.handleError(error)
      )
    );
  };

  public handleError(err: any) {
    return Observable.throw(err || 'ERROR 500');
  }
}
