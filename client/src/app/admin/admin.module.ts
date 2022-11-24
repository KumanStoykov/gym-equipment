import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartProductsComponent } from './chart-products/chart-products.component';
import { AdminRoutingModule } from './admin-routing.module';
import { StatisticComponent } from './statistic/statistic.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { SalesVolumeComponent } from './sales-volume/sales-volume.component';
import { CreateStrengthComponent } from './create-strength/create-strength.component';
import { CreateTreadmillComponent } from './create-treadmill/create-treadmill.component';
import { CreateBikeComponent } from './create-bike/create-bike.component';
import { FormsModule } from '@angular/forms';
import { CreateRackComponent } from './create-rack/create-rack.component';
import { CreateBenchComponent } from './create-bench/create-bench.component';
import { CreateDumbbellComponent } from './create-dumbbell/create-dumbbell.component';



@NgModule({
    declarations: [
        DashboardComponent,
        ChartProductsComponent,
        StatisticComponent,
        AdminNavComponent,
        SalesVolumeComponent,
        CreateStrengthComponent,
        CreateTreadmillComponent,
        CreateBikeComponent,
        CreateRackComponent,
        CreateBenchComponent,
        CreateDumbbellComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        AdminRoutingModule
    ]
})
export class AdminModule { }
