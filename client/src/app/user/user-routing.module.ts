import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { UserOrderComponent } from './user-order/user-order.component';
import { WishlistComponent } from './wishlist/wishlist.component';


const routes: Routes = [
	{
		path: '',
        canActivateChild: [AuthGuard],
		children: [
			{
				path: 'cart',
                pathMatch: 'full',
				component: UserCartComponent
			},
			{
				path: 'wishlist',
                pathMatch: 'full',
				component: WishlistComponent
			},
            {
				path: ':id',
				component: ProfileComponent
			},
            {
				path: ':id/orders',
				component: UserOrderComponent
			},

		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UserRoutingModule { }
