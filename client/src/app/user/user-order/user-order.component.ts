import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { IOrder } from 'src/app/shared/interfaces';

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
        private adminService: AdminService,
    ) { }

    ngOnInit(): void {
        this.isLoading = true;
        this.adminService.getAllOrders().subscribe({
            next: data => {
                this.isLoading = false;
                this.orders = data.orders;
                this.count = data.ordersCount;
                console.log(data)
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
