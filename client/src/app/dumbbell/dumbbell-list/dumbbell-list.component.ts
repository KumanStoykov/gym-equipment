import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Store } from '@ngrx/store';

import { IDumbbell } from 'src/app/shared/interfaces';
import { DumbbellService } from '../dumbbell.service';
import * as authActions from '../../+store/actions';
import { IAuthState } from 'src/app/+store/reducers';
@Component({
  selector: 'app-dumbbell-list',
  templateUrl: './dumbbell-list.component.html',
  styleUrls: ['./dumbbell-list.component.scss']
})
export class DumbbellListComponent implements OnInit {

    heroTitle: string = 'DUMBBELLS';
    pageTitle: string = 'SUPREME RUNNING PERFORMANCE';

    dumbbells: IDumbbell[] = [];
    page: number = 1;
    count: number = 0;
    isLoading: boolean = false;

    constructor(
        private dumbbellService: DumbbellService,
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

                return this.dumbbellService.getAll(query);
            })
        ).subscribe({
            next: data => {
                this.dumbbells = data.dumbbells;
                this.count = data.dumbbellsCount;
                this.isLoading = false;
            },
            error: err => {
                this.isLoading = false;
                this.store.dispatch(authActions.add_message({typeMsg: 'error', text: err.error.message || 'Something went wrong, Please try again later.'}));
            }
        })
    }
}
