import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';


import { IUser } from 'src/app/shared/interfaces';
import * as authSelectors from '../../+store/authStore/selector';
import { IAuthState } from 'src/app/+store/authStore/reducers';
import { Observable } from 'rxjs';
@Component({
	selector: 'app-user-checkout',
	templateUrl: './user-checkout.component.html',
	styleUrls: ['./user-checkout.component.scss']
})
export class UserCheckoutComponent implements OnInit {

	heroTitle: string = 'CHECKOUT';
	pageTitle: string = 'MAKE PAYMENT';

	user$: Observable<IUser | null> = this.store.select(authSelectors.selectUser);


	constructor(
		private store: Store<IAuthState>,

	) { }

	ngOnInit(): void {
	}

}
