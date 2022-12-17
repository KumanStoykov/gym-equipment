import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/shared/interfaces';
import { UserService } from '../user.service';

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
    error: string = '';

    constructor(
        private userService: UserService,
        private router: Router
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
                this.error = err.error.message;
                this.isLoading = false;
            }
        })

    }

    onCloseNot(): void {
        this.error = '';
    }
}
