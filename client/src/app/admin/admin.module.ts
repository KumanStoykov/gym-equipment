import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartSalesProductsComponent } from './chart-sales-products/chart-sales-products.component';
import { AdminRoutingModule } from './admin-routing.module';
import { StatisticComponent } from './statistic/statistic.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { ChartSalesVolumeComponent } from './chart-sales-volume/chart-sales-volume.component';
import { CreateTreadmillComponent } from './create/create-treadmill/create-treadmill.component';
import { CreateBikeComponent } from './create/create-bike/create-bike.component';
import { FormsModule } from '@angular/forms';
import { CreateRackComponent } from './create/create-rack/create-rack.component';
import { CreateBenchComponent } from './create/create-bench/create-bench.component';
import { CreateDumbbellComponent } from './create/create-dumbbell/create-dumbbell.component';
import { AdminProductCardComponent } from './admin-product-card/admin-product-card.component';
import { AdminPromotionComponent } from './admin-promotion/admin-promotion.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminOrderCardComponent } from './admin-order-card/admin-order-card.component';



@NgModule({
    declarations: [
        DashboardComponent,
        ChartSalesProductsComponent,
        StatisticComponent,
        AdminNavComponent,
        ChartSalesVolumeComponent,
        CreateTreadmillComponent,
        CreateBikeComponent,
        CreateRackComponent,
        CreateBenchComponent,
        CreateDumbbellComponent,
        AdminProductCardComponent,
        AdminPromotionComponent,
        AdminOrderComponent,
        AdminOrderCardComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        AdminRoutingModule
    ]
})
export class AdminModule { }
