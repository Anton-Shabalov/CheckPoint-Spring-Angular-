import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CheckPointService} from './pages/main-page/main-page-service/check-point.service';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { GetPointsService } from "./pages/main-page/main-page-service/get-points.service";
import {TokenService} from "./services/token-service.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import {AuthGuard} from "./guard/guard";
import {LoggedInAuthGuard} from "./guard/logged-in.guard";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import { StartPageComponent } from './pages/start-page/start-page.component';
import { TestVerstPageComponent } from './pages/main-page/test-verst-page.component';
import {CheckboxModule} from 'primeng/checkbox';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    StartPageComponent,
    TestVerstPageComponent,
  ],
  imports: [
    CheckboxModule,
    InputNumberModule,
      HttpModule,
      FormsModule,
      ButtonModule,
      BrowserModule,
      InputTextModule,
      AppRoutingModule,
      InputNumberModule,
      ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },
      AuthGuard,
      LoggedInAuthGuard,
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
