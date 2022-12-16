import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IProduct } from 'src/app/shared/interfaces';

@Component({
    selector: 'app-checkout-product-card',
    templateUrl: './checkout-product-card.component.html',
    styleUrls: ['./checkout-product-card.component.scss']
})
export class CheckoutProductCardComponent implements OnInit {

    @Input() product!: IProduct;
    @Output('removeHandler') removeHandler: EventEmitter<boolean> = new EventEmitter(true);
    @Output('increaseHandler') increaseHandler: EventEmitter<boolean> = new EventEmitter(true);
    @Output('decreaseHandler') decreaseHandler: EventEmitter<boolean> = new EventEmitter(true);

    hasPromo: boolean = false;

    constructor(
    ) { }

    ngOnInit(): void {
        this.hasPromo = this.product.promoPrice > 0;
    }

    onClickIncrease(): void {
        this.increaseHandler.emit(true);
    }
    onClickDecrease(): void {
        this.decreaseHandler.emit(true);
    }

    onClickRemove(): void {
        this.removeHandler.emit(true);
    }

}
