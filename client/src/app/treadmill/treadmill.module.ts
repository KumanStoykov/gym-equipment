import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreadmillListComponent } from './treadmill-list/treadmill-list.component';
import { SharedModule } from '../shared/shared.module';
import { TreadmillRoutingModule } from './treadmill-routing.module';
import { TreadmillDetailsComponent } from './treadmill-details/treadmill-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TreadmillInfoComponent } from './treadmill-info/treadmill-info.component';



@NgModule({
  declarations: [
    TreadmillListComponent,
    TreadmillDetailsComponent,
    TreadmillInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    TreadmillRoutingModule
  ],

})
export class TreadmillModule { }
