import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBenchComponent } from './create-bench/create-bench.component';
import { CreateBikeComponent } from './create-bike/create-bike.component';
import { CreateDumbbellComponent } from './create-dumbbell/create-dumbbell.component';
import { CreateRackComponent } from './create-rack/create-rack.component';
import { CreateTreadmillComponent } from './create-treadmill/create-treadmill.component';
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
        },
        {
            path: 'create/treadmill',
            component: CreateTreadmillComponent
        },
        {
            path: 'create/bike',
            component: CreateBikeComponent
        },
        {
            path: 'create/rack',
            component: CreateRackComponent
        },
        {
            path: 'create/bench',
            component: CreateBenchComponent
        },
        {
            path: 'create/dumbbell',
            component: CreateDumbbellComponent
        },
        {
            path: '**',
            redirectTo: '/admin/statistic'
        }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
