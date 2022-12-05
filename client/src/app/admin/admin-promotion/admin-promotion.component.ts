import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { PromotionService } from 'src/app/promotion/promotion.service';
import { IPromotion } from 'src/app/shared/interfaces/promotion';

@Component({
    selector: 'app-admin-promotion',
    templateUrl: './admin-promotion.component.html',
    styleUrls: ['./admin-promotion.component.scss']
})
export class AdminPromotionComponent implements OnInit {
    promotions: IPromotion[] = [];
    page: number = 1;
    count: number = 0;
    isLoading: boolean = false;
    error: string = '';

    constructor(
        private promotionService: PromotionService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {

        this.activatedRoute.queryParams.pipe(
            switchMap(params => {
                let query = '';
                Object.entries(params).forEach(([k, v]) => {
                    query += '&' + k + '=' + v;
                });

                this.page = params['page'];
                this.isLoading = true;
                return this.promotionService.getAllPromo(query);
            })
        ).subscribe({
            next: data => {
                this.promotions = data.promotions;
                this.count = data.promotionsCount;
                this.isLoading = false;
            },
            error: err => {
                this.isLoading = false;
                this.error = err.error.message || 'Something went wrong, Please try again later.';
            }
        })
    }

    onCloseNot(): void {
        this.error = '';
    }

}
