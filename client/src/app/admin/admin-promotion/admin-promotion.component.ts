import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { IAuthState } from 'src/app/+store/reducers';

import { PromotionService } from 'src/app/promotion/promotion.service';
import { IPromotion } from 'src/app/shared/interfaces/promotion';
import * as authActions from '../../+store/actions';

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

    constructor(
        private promotionService: PromotionService,
        private activatedRoute: ActivatedRoute,
        private store: Store<IAuthState>

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
                this.store.dispatch(authActions.add_message({typeMsg: 'error', text: err.error.message}));
            }
        })
    }
}
