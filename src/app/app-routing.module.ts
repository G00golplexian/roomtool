import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { PasswordResetComponent } from './public/password-reset/password-reset.component';
import { RegisterComponent } from './public/register/register.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [AuthGuard],
    component: LoginComponent,
  },
  {
    path: 'register',
    canActivate: [AuthGuard],
    component: RegisterComponent,
  },
  {
    path: 'password-reset',
    canActivate: [AuthGuard],
    component: PasswordResetComponent,
  },
  {
    path: 'private', 
    loadChildren: () => import('./private/private.module').then(m => m.PrivateModule),
    canLoad: [AuthGuard]
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
