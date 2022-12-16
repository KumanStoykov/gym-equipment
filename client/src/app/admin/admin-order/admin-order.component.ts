import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/interfaces';
import { AdminService } from '../admin.service';

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
