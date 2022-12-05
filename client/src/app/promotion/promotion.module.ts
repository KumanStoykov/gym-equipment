import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionListComponent } from './promotion-list/promotion-list.component';
import { PromotionRoutingModule } from './promotion-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PromotionListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PromotionRoutingModule
  ]
})
export class PromotionModule { }
