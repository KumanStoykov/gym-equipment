import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Store } from '@ngrx/store';

import { IRack } from 'src/app/shared/interfaces';
import { RackService } from '../rack.service';
import * as authActions from '../../+store/actions';
import { IAuthState } from 'src/app/+store/reducers';

@Component({
  selector: 'app-rack-list',
  templateUrl: './rack-list.component.html',
  styleUrls: ['./rack-list.component.scss']
})
export class RackListComponent implements OnInit {

    heroTitle: string = 'RACKS';
    pageTitle: string = 'TRAINING YOUR STRENGTH';

    racks: IRack[] = [];
    page: number = 1;
    count: number = 0;
    isLoading: boolean = false;

    constructor(
        private rackService: RackService,
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

                return this.rackService.getAll(query);
            })
        ).subscribe({
            next: data => {
                this.racks = data.racks;
                this.count = data.racksCount;
                this.isLoading = false;
            },
            error: err => {
                this.isLoading = false;
                this.store.dispatch(authActions.add_message({typeMsg: 'error', text: err.error.message || 'Something went wrong, Please try again later.'}));
            }
        })
    }

}
