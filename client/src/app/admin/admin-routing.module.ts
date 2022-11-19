import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticComponent } from './statistic/statistic.component';



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'statistic'
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
        {
            path: 'statistic',
            component: StatisticComponent
        }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
