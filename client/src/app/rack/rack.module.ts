import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RackDetailsComponent } from './rack-details/rack-details.component';
import { RackInfoComponent } from './rack-info/rack-info.component';
import { RackListComponent } from './rack-list/rack-list.component';
import { SharedModule } from '../shared/shared.module';
import { RackRoutingModule } from './rack-routing.module';



@NgModule({
  declarations: [
    RackDetailsComponent,
    RackInfoComponent,
    RackListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RackRoutingModule
  ]
})
export class RackModule { }
