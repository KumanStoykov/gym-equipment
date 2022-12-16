import { Component, Input, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-admin-order-card',
  templateUrl: './admin-order-card.component.html',
  styleUrls: ['./admin-order-card.component.scss']
})
export class AdminOrderCardComponent implements OnInit {
    @Input() order!: IOrder;
    constructor() {
    }

    ngOnInit(): void {

    }

}
