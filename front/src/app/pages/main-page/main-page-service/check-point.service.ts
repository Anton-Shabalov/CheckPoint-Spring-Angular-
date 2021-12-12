import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckPointService {

  constructor(private _http: Http) {
  }

  public checkPoints(data: any) {
    return this._http.post('http://localhost:21232/checkPoint', data).pipe(
      map(res => res.json(),
        (err: any) => this.handleError(err)
      )
    );
  }

  public handleError(err: any) {
    Observable.throw(err || 'ERROR 500')
  }
}
