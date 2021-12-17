import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckPointService {

  // tslint:disable-next-line:variable-name
  constructor(private _http: Http) {
  }

  // tslint:disable-next-line:typedef
  public checkPoints(data: any) {
    return this._http.post('http://localhost:21232/checkPoint', data).pipe(
      map(res => res.json(),
        (err: any) => this.handleError(err)
      )
    );
  }

  // tslint:disable-next-line:typedef
  public handleError(err: any) {
    Observable.throw(err || 'ERROR 500');
  }
}
