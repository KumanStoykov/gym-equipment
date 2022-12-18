import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAuthState } from 'src/app/+store/reducers';
import { IOrder } from 'src/app/shared/interfaces';
import { AdminService } from '../admin.service';
import * as authActions from '../../+store/actions';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent implements OnInit {

    orders: IOrder[] = [];
    page: number = 1;
    count: number = 0;
    isLoading: boolean = false;

    constructor(
        private adminService: AdminService,
        private store: Store<IAuthState>
    ) { }

    ngOnInit(): void {
        this.isLoading = true;
        this.adminService.getAllOrders().subscribe({
            next: data => {
                this.isLoading = false;
                this.orders = data.orders;
                this.count = data.ordersCount;
            },
            error: err => {
                this.isLoading = false;
                this.store.dispatch(authActions.add_message({typeMsg: 'error', text: err.error.message}));

            }
        })

    }
}
