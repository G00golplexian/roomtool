import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { PasswordResetComponent } from './public/password-reset/password-reset.component';
import { RegisterComponent } from './public/register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent,
  },
  {
    path: 'private', 
    loadChildren: () => import('./private/private.module').then(m => m.PrivateModule)
  },
  {
    path: '**',
    redirectTo: "login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
