import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { IOrder } from 'src/app/shared/interfaces';
import { UserService } from '../user.service';
import * as authActions from '../../+store/actions';
import { IAuthState } from 'src/app/+store/reducers';
@Component({
    selector: 'app-user-order',
    templateUrl: './user-order.component.html',
    styleUrls: ['./user-order.component.scss']
})
export class UserOrderComponent implements OnInit {
    heroTitle: string = 'ORDERS';

    orders: IOrder[] = [];
    page: number = 1;
    count: number = 0;
    isLoading: boolean = false;

    constructor(
        private userService: UserService,
        private router: Router,
        private store: Store<IAuthState>,

    ) { }

    ngOnInit(): void {
        const userId = this.router.url.split('/')[2]

        this.isLoading = true;
        this.userService.getUserOrders(userId).subscribe({
            next: data => {
                this.isLoading = false;
                this.orders = data.orders;
                this.count = data.ordersCount;
            },
            error: err => {
                this.store.dispatch(authActions.add_message({typeMsg: 'error', text: err.error.message || 'Something went wrong, Please try again later.'}));
                this.isLoading = false;
            }
        })

    }
}
