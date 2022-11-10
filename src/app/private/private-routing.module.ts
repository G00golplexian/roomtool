import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from './faq/faq.component';
import { ReportComponent } from '../private/report/report.component';
import { ReportsComponent } from '../private/reports/reports.component';
import { UserComponent } from '../private/user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrivateComponent } from './private.component';
import { UsersComponent } from './users/users.component';
import { ReportCreateComponent } from './report-create/report-create.component';

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
        path: 'report/:id',
        component: ReportComponent
      },
      {
        path: 'report-create',
        component: ReportCreateComponent
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
