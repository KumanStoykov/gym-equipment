import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
    @Input() cardType!: string;
    @Input() product: any;
    @Input() isHomeSale: boolean = false;

    hasPromo!: boolean

    strengthTypes: string[] = ['rack', 'bench', 'dumbbell'];

    constructor() {
    }

    ngOnInit(): void {
        this.cardType = this.cardType.toLowerCase();
        this.hasPromo = this.product.promoPrice > 0;

        if(this.strengthTypes.includes(this.cardType)) {
            this.cardType = `/strength/${this.cardType}`;
        }
    }

}
