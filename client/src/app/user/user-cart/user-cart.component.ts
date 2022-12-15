import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';


import { IUser } from 'src/app/shared/interfaces';
import * as authSelectors from '../../+store/selectors';
import { IAuthState } from 'src/app/+store/reducers';
import { Observable } from 'rxjs';
@Component({
	selector: 'app-user-cart',
	templateUrl: './user-cart.component.html',
	styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit {

	heroTitle: string = 'CART';
	pageTitle: string = 'CHECKOUT';

	user$: Observable<IUser | null> = this.store.select(authSelectors.selectUser);


	constructor(
		private store: Store<IAuthState>,

	) { }

	ngOnInit(): void {
	}

}
