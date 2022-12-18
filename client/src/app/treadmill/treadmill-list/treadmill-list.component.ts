import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Store } from '@ngrx/store';

import { ITreadmill } from 'src/app/shared/interfaces';
import { TreadmillService } from '../treadmill.service';
import * as authActions from '../../+store/actions';
import { IAuthState } from 'src/app/+store/reducers';
@Component({
    selector: 'app-treadmill-list',
    templateUrl: './treadmill-list.component.html',
    styleUrls: ['./treadmill-list.component.scss']
})
export class TreadmillListComponent implements OnInit {

    heroTitle: string = 'TREADMILLS';
    pageTitle: string = 'SUPREME RUNNING PERFORMANCE';

    treadmills: ITreadmill[] = [];
    page: number = 1;
    count: number = 0;
    isLoading: boolean = false;

    constructor(
        private treadmillService: TreadmillService,
        private activateRoute: ActivatedRoute,
        private store: Store<IAuthState>,

    ) { }

    ngOnInit(): void {

        this.activateRoute.queryParams.pipe(
            switchMap(params => {
                let query = '';
                Object.entries(params).forEach(([k, v]) => {
                    query += '&' + k + '=' + v;
                });
                this.page = params['page'];

                this.isLoading = true;
                return this.treadmillService.getAll(query);
            })
        ).subscribe({
            next: data => {
                this.treadmills = data.treadmills;
                this.count = data.treadmillsCount;
                this.isLoading = false;
            },
            error: err => {
                this.isLoading = false;
                this.store.dispatch(authActions.add_message({typeMsg: 'error', text: err.error.message || 'Something went wrong, Please try again later.'}));
            }
        })

    }


}
