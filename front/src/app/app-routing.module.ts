import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartPageComponent } from './pages/start-page/start-page.component';
import {AuthGuard} from "./guard/guard";
import {TestVerstPageComponent} from './pages/main-page/test-verst-page.component';
import {LoggedInAuthGuard} from './guard/logged-in.guard';

const routes: Routes = [
  { path: '', component: StartPageComponent,canActivate: [LoggedInAuthGuard] },
  { path: 'main', component: TestVerstPageComponent, canActivate: [AuthGuard] },
  { path: '**', component: StartPageComponent,canActivate: [LoggedInAuthGuard]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ StartPageComponent,TestVerstPageComponent];
