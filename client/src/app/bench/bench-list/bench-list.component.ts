import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

import { IBench } from 'src/app/shared/interfaces';
import { BenchService } from '../bench.service';
import { IAuthState } from 'src/app/+store/reducers';
import * as authActions from '../../+store/actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-bench-list',
  templateUrl: './bench-list.component.html',
  styleUrls: ['./bench-list.component.scss']
})
export class BenchListComponent implements OnInit {

    heroTitle: string = 'BENCHES';
    pageTitle: string = 'SUPREME PERFORMANCE';

    benches: IBench[] = [];
    page: number = 1;
    count: number = 0;
    isLoading: boolean = false;

    constructor(
        private benchService: BenchService,
        private activationRouter: ActivatedRoute,
        private store: Store<IAuthState>,
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

                return this.benchService.getAll(query);
            })
        ).subscribe({
            next: data => {
                this.benches = data.benches;
                this.count = data.benchesCount;
                this.isLoading = false;
            },
            error: err => {
                this.isLoading = false;
                this.store.dispatch(authActions.add_message({typeMsg: 'error', text: err.error.message || 'Something went wrong, Please try again later.'}));

            }
        })
    }
}
