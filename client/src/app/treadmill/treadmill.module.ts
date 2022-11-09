import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreadmillCatalogComponent } from './treadmill-catalog/treadmill-catalog.component';
import { SharedModule } from '../shared/shared.module';
import { TreadmillRoutingModule } from './treadmill-routing.module';



@NgModule({
  declarations: [
    TreadmillCatalogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TreadmillRoutingModule
  ],

})
export class TreadmillModule { }
