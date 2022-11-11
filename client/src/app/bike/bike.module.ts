import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BikeListComponent } from './bike-list/bike-list.component';
import { BikeDetailsComponent } from './bike-details/bike-details.component';
import { BikeInfoComponent } from './bike-info/bike-info.component'
import { BikeRoutingModule } from './bike-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
    declarations: [
        BikeListComponent,
        BikeDetailsComponent,
        BikeInfoComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FontAwesomeModule,
        BikeRoutingModule
    ]
})
export class BikeModule { }
