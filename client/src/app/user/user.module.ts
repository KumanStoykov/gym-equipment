import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCartComponent } from './user-cart/user-cart.component';
import { CheckoutProductCardComponent } from './checkout-product-card/checkout-product-card.component';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { WishlistComponent } from './wishlist/wishlist.component';
import { WishlistProductCardComponent } from './wishlist-product-card/wishlist-product-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileComponent } from './profile/profile.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserOrderComponent } from './user-order/user-order.component';
import { UserOrderCardComponent } from './user-order-card/user-order-card.component';



@NgModule({
  declarations: [
    UserCartComponent,
    CheckoutProductCardComponent,
    UserFormComponent,
    WishlistComponent,
    WishlistProductCardComponent,
    ProfileComponent,
    UserNavComponent,
    UserOrderComponent,
    UserOrderCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    UserRoutingModule
  ]
})
export class UserModule { }
