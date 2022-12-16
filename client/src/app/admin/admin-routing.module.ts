import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminPromotionComponent } from './admin-promotion/admin-promotion.component';
import { CreateBenchComponent } from './create/create-bench/create-bench.component';
import { CreateBikeComponent } from './create/create-bike/create-bike.component';
import { CreateDumbbellComponent } from './create/create-dumbbell/create-dumbbell.component';
import { CreateRackComponent } from './create/create-rack/create-rack.component';
import { CreateTreadmillComponent } from './create/create-treadmill/create-treadmill.component';
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
            path: 'edit/treadmill/:id',
            component: CreateTreadmillComponent
        },
        {
            path: 'edit/bike/:id',
            component: CreateBikeComponent
        },
        {
            path: 'edit/rack/:id',
            component: CreateRackComponent
        },
        {
            path: 'edit/bench/:id',
            component: CreateBenchComponent
        },
        {
            path: 'edit/dumbbell/:id',
            component: CreateDumbbellComponent
        },
        {
            path: 'promotion',
            component: AdminPromotionComponent
        },
        {
            path: 'orders',
            component: AdminOrderComponent
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
