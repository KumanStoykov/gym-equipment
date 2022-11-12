import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCheckoutComponent } from './user-checkout/user-checkout.component';
import { UserProductCheckoutComponent } from './user-product-checkout/user-product-checkout.component';
import { UserFormCheckoutComponent } from './user-form-checkout/user-form-checkout.component';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [
    UserCheckoutComponent,
    UserProductCheckoutComponent,
    UserFormCheckoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
