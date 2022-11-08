import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from '../privates/faq/faq.component';
import { ReportComponent } from '../privates/report/report.component';
import { ReportsComponent } from '../privates/reports/reports.component';
import { UserComponent } from '../privates/user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrivateComponent } from './private.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },  
      {
        path: 'users',
        component: UsersComponent
      },  
      {
        path: 'user/:id',
        component: UserComponent
      },  
      {
        path: 'reports',
        component: ReportsComponent
      },  
      {
        path: 'report',
        component: ReportComponent
      },  
      {
        path: 'faq',
        component: FaqComponent
      },  
      {
        path: '**',
        pathMatch: "full",
        redirectTo: 'dashboard'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
