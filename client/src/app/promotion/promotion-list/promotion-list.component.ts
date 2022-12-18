import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Store } from '@ngrx/store';

import { IPromotion } from 'src/app/shared/interfaces/promotion';
import { PromotionService } from '../promotion.service';
import * as authActions from '../../+store/actions';
import { IAuthState } from 'src/app/+store/reducers';
@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.scss']
})
export class PromotionListComponent implements OnInit {

    heroTitle: string = 'SALES';
    pageTitle: string = 'SALE FOR ALL';

    promotions: IPromotion[] = [];
    page: number = 1;
    count: number = 0;
    isLoading: boolean = false;
    error: string = '';

    constructor(
        private promotionService: PromotionService,
        private store: Store<IAuthState>,
        private activationRouter: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.activationRouter.queryParams.pipe(
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
                this.store.dispatch(authActions.add_message({typeMsg: 'error', text: err.error.message || 'Something went wrong, Please try again later.'}));
            }
        })
    }
}
