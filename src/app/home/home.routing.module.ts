import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home.component';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {LoginGuard} from '../core/auth/login.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        component: SigninComponent,
        data: {
          title: 'LeafPic - Sign In'
        }
      },
      {
        path: 'signup',
        component: SignupComponent,
        data: {
          title: 'LeafPic - Sign Up'
        }
      },
    ]
  }
];

@NgModule({
  //utilizado forChild pois este router vai ser chamado pelo app.routing.module.ts

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}

