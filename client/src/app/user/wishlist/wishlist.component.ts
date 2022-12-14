import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';


import { IUser } from 'src/app/shared/interfaces';
import * as authSelectors from '../../+store/authStore/selector';
import { IAuthState } from 'src/app/+store/authStore/reducers';


@Component({
	selector: 'app-wishlist',
	templateUrl: './wishlist.component.html',
	styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

	heroTitle: string = 'WISHLIST';

    pageTitle: string = 'WATCHED ITEMS'
	page: number = 1;
	count: number = 0;
	isLoading: boolean = false;
	error: string = '';

    user$: Observable<IUser | null> = this.store.select(authSelectors.selectUser);


	constructor(
       private store: Store<IAuthState>,
    ) { }

	ngOnInit(): void {
	}

	onCloseNot(): void {
		this.error = '';
	}

}
