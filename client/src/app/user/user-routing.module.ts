import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { UserCheckoutComponent } from './user-checkout/user-checkout.component';
import { WishlistComponent } from './wishlist/wishlist.component';


const routes: Routes = [
	{
		path: '',
        canActivateChild: [AuthGuard],
		children: [
			{
				path: 'checkout',
                pathMatch: 'full',
				component: UserCheckoutComponent
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

		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UserRoutingModule { }
