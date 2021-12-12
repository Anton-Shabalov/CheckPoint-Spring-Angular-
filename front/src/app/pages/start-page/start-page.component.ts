import { Component, OnInit } from '@angular/core';
// import { StartPageService } from './start-page-service/start-page.service';
import {Router} from "@angular/router";
// import {Start} from '../registration-page/registration-page-service/registration.service';
import {StartPageService} from './start-page-service/start-page.service';
import {getUserName, saveUserName} from '../model/logic';
import {TokenService} from '../../services/token-service.service';
import {GetPointsService} from '../main-page/main-page-service/get-points.service';
import {timeout} from 'rxjs/operators';
import {AuthGuard} from '../../guard/guard';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.less']
})
export class StartPageComponent implements OnInit {
  btnIn = 'Войти';
  btnRegi = 'Зарегистрироваться';
  visibalStartinfo = true;
  visibalReg = false;
  visibalIn = false;
  usernameR: any;
  username: any;
  password: any;
  passwordR: any;
  error: string;
  console: any;



  constructor(private _service : StartPageService, private router: Router,private _tokenService: TokenService,private _getPointServer: GetPointsService) {
   this.usernameR = '';
   this.username = '';
   this.password = '';
   this.passwordR = '';
   this.error = '';
  }

  ngOnInit(): void {


  }

  offStartInfo(){
    this.visibalStartinfo = false;
    this.visibalReg = false;
    this.visibalIn = false;
    this.usernameR = '';
    this.username = '';
    this.password = '';
    this.passwordR = '';
    this.error = '';
  }
  startReg(){
    this.offStartInfo();
    this.visibalReg = true;

  }
  startIn(){
    this.offStartInfo();
    this.visibalIn = true;

  }
  backInfo(){
    this.offStartInfo();
    this.visibalStartinfo = true;

  }
  entrance(){

  }
  // tslint:disable-next-line:typedef


  public register(username: string, password: string): any {
    this.error='';

    if(!this.validation(username,password)){
    }else{
      this.sendNewUser({username, password});
      setTimeout(() => {
        if(String(this.error)=="undefined"){
          this.auth(username, password);}else {
          console.log(this.error.length);
        }
        }, 2000);}
  }

  public sendNewUser(obj: any): any {
    this._service.addNewUser(obj).subscribe(
      (res: any) => {
        console.log(res, 'res');
      },
      (err: any) => {
        if(err._body=="[object ProgressEvent]"){
          alert("Сервер не отвечвет, повторите попытку чуть позже")
        }else {
          this.error = err._body;
        }
      },
    );
  }



  public cleanInputValue(): void {
    this.usernameR = '';
    this.passwordR = '';
    this.username = '';
    this.password = '';
  }

  public auth(username: string, password: string): any {
    if(!this.validation(username,password)){
    }else{
      this.authorization({username, password});
    }


  }
  public getMainPage() {
    setTimeout(() => this.router.navigate(["/main"]), 1000);
  }



  public authorization(obj: any): any {
    this._service.authUser(obj).subscribe(
      (res: any) => {

        saveUserName(this.username);
        if(!(this.usernameR=="undefined")){
          saveUserName(this.usernameR);
        }
        this._tokenService.saveToken(res.token);
        this._tokenService.saveUser(obj.username);
        this.cleanInputValue();
        this.getMainPage();
      },
      (err: any) => {
        if(err._body=="[object ProgressEvent]"){
          alert("Сервер не отвечвет, повторите попытку чуть позже")
        }else {
          this.error = err._body;
          this.cleanInputValue();
        }
      },
    );
  }
  private  validation(username:string, password:string): boolean{
    let flag = 1;
    if(username.length>=4){
      if(password.length>=4){
        this.error='';

      }else {
        flag=0;
        this.error='Password должен быть длинее 4 символов';
      }

    }else {
      flag=0;
      this.error='Username должен быть длинее 4 символов';
    }
    if (flag==1){
      return true;
    }else {
      return false;
    }



  }
}
