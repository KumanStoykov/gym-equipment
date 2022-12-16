import { Component, Input, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/interfaces';

@Component({
    selector: 'app-user-order-card',
    templateUrl: './user-order-card.component.html',
    styleUrls: ['./user-order-card.component.scss']
})
export class UserOrderCardComponent implements OnInit {
    @Input() order!: IOrder;

    constructor() { }

    ngOnInit(): void {
    }

}
