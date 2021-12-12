import {Component, OnInit, ViewChild} from '@angular/core';
import {InputNumber} from 'primeng/inputnumber';
import {DeleteAllPointsService} from '../main-page/main-page-service/delete-all-points.service';
import {TokenService} from '../../services/token-service.service';
import {GetPointsService} from '../main-page/main-page-service/get-points.service';
import {CheckPointService} from '../main-page/main-page-service/check-point.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {getUserName, saveUserName} from '../model/logic';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import {AuthGuard} from '../../guard/guard';

@Component({
  selector: 'app-test-verst-page',
  templateUrl: './test-verst-page.component.html',
  styleUrls: ['./test-verst-page.component.less']
})
export class TestVerstPageComponent implements OnInit {
  userName: any;
  pointX: any;
  pointY: any;
  parametrR: any;
  pointTable: any;
  errorText: any;


  constructor(private test:AuthGuard,private _dropAll: DeleteAllPointsService, private _tokenService: TokenService, private _getPointService: GetPointsService, private _checkPointService: CheckPointService, private _router: Router) {
   this.pointY=0;
  }

  ngOnInit(): void {

    this.userName = String(this._tokenService.getUser());
    this.getPoints();
  }

  public getFill(result:string):string{
    if(result=="Не попал"){
      return "red"
    }else {
      return "green";
  }}
  public getKordX(xi:number):any{
    if(this.validationR()){
      return (2 * xi) / this.parametrR * 81 + 200;
    }else {
      return null
    }
  }
  public getKordY(yI:number):any{
    if(this.validationR()){
      return -yI / this.parametrR * 2 * 82 + 200;
    }else {
      return null
    }


  }
  public clickSend(){
    if(this.validationX()){
      if(this.validationY()){
        if(this.validationR()){
          this.checkPoint(this.pointX[0],this.pointY,this.parametrR[0]);

        }
      }
    }
  }





  private checkPoint(xInput: number , yInput: number, rInput: number): void {
    this.errorText=''
    const sendData = { x: xInput, y: yInput, r: rInput, userName: this.userName};

    this._checkPointService.checkPoints(sendData).subscribe((res: any) => res,
      (err: any) =>{if (String(err._body)=="[object ProgressEvent]"){
        alert("Сервер не отвечает, повторите запрос чуть позже")
      }else {if(String(err._body)=="unAUT"){
        alert("Повторите авторизацию");
        this.clickLogout()
      }}},
    );
    setTimeout(() => this.getPoints(), 500);
  }
  public getPoints() {

    this._getPointService.getPoints().subscribe((res: any) => this.pointTable = res,
      (err: HttpErrorResponse) => console.log(err),
    )
  }
  public clickOnSVG(event: any){
    if(this.validationR()){
    let xi:any = event.offsetX ;
    let yi:any = event.offsetY;
    let ri:any = this.parametrR[0];
    xi=((xi-200) * ri / 167).toFixed(2) ;
    yi=((yi-200) * ri / 167 * -1).toFixed(2);
    if(xi>-3&&xi<5){
      if(yi>-5&&yi<3){
        this.checkPoint(xi,yi,ri);
      }else {
        this.errorText="Y выходит за ОДЗ"
      }
    }else {
      this.errorText="X выходид за ОДЗ"
    }


    }
  }

  private validationX():boolean{
  if(!(String(this.pointX)=="undefined")){
    if ((this.pointX.length==1)){
      this.errorText=""
      return true;
    }else {

      this.errorText="Х может принимать только 1 значение";
      return false;
    }

  }else {
    this.errorText="X не выбран"
    return false;
  }
  }
  public validationR():boolean{
    if(!(String(this.parametrR)=="undefined")){
      if (!(this.parametrR.length>1)){
        if(this.parametrR[0]>0){
          this.errorText=""
          return true;
        }else {
          if(!String(this.parametrR[0]=="undefined")){
            this.errorText="R может быть только положительным"
            return false;
          }else {
            this.errorText="R не выбран"
            return false;
          }

        }
      }else {
        this.errorText="R может принимать только 1 значение"
        return false;
      }

    }else {
      this.errorText="R не выбран"

      return false;
    }
  }
  private validationY(): boolean{
  if (this.pointY > -5 && this.pointY < 3){
    this.errorText = "";
    return true;
  }else {
    this.errorText="Y выходит за рамки допустимого значения"
    return false;
  }
  }
  public clickLogout(): void {
    localStorage.clear();
    this.userName=""
    this._router.navigate(['']);
    this._tokenService.signOut();
  }

  public clearPoint(): void {
    this._dropAll.dropAllPoints().subscribe((res: any) => res,
      (err: HttpErrorResponse) => console.log(err),
    );
    this.pointTable = [];

  }

}
