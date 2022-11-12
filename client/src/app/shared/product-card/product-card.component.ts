import { Component, Input, OnInit } from '@angular/core';

import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

    icons = {
        faStar,
        faStarHalf
    }

    @Input() cardType!: string;

    constructor() { }

    ngOnInit(): void {
    }

}
