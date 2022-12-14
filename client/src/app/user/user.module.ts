import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCheckoutComponent } from './user-checkout/user-checkout.component';
import { UserProductCheckoutComponent } from './user-product-checkout/user-product-checkout.component';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { WishlistComponent } from './wishlist/wishlist.component';
import { WishlistProductCardComponent } from './wishlist-product-card/wishlist-product-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileComponent } from './profile/profile.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserCheckoutComponent,
    UserProductCheckoutComponent,
    UserFormComponent,
    WishlistComponent,
    WishlistProductCardComponent,
    ProfileComponent,
    UserNavComponent,
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
