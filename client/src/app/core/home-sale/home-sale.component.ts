import { Component, OnInit } from '@angular/core';

import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { PromotionService } from 'src/app/promotion/promotion.service';
import { IPromotion } from 'src/app/shared/interfaces/promotion';

@Component({
    selector: 'app-home-sale',
    templateUrl: './home-sale.component.html',
    styleUrls: ['./home-sale.component.scss']
})
export class HomeSaleComponent implements OnInit {

    isLoading: boolean = false;
    promotions: IPromotion[] = [];
    page: number = 1;
    count: number = 0;
    error: string = '';

    faDumbbell = faDumbbell

    constructor(
        private promotionService: PromotionService,
    ) { }

    ngOnInit(): void {

        this.promotionService.getThreeLatest().subscribe({
            next: promotions => {
                this.promotions = promotions;
                this.isLoading = false;
            },
            error: err => {
                this.isLoading = false;
                this.error = err.error.message || 'Something went wrong. Please try again later.'
            }
        })
    }

    onCloseNot(): void {
        this.error = '';
    }

}
