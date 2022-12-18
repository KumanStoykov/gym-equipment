import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { add_comment } from 'src/app/+store/actions';
import { IDumbbell } from 'src/app/shared/interfaces';
import { DumbbellService } from '../dumbbell.service';
import * as authActions from '../../+store/actions';
import { IAuthState } from 'src/app/+store/reducers';
@Component({
  selector: 'app-dumbbell-details',
  templateUrl: './dumbbell-details.component.html',
  styleUrls: ['./dumbbell-details.component.scss']
})
export class DumbbellDetailsComponent implements OnInit {

    heroTitle: string = 'DETAILS';

    dumbbell!: IDumbbell;
    isLoading: boolean = false;

    productId = this.router.url.split('/')[3];

    constructor(
        private dumbbellService: DumbbellService,
        private router: Router,
        private store: Store<IAuthState>,
    ) { }

    ngOnInit(): void {
        this.isLoading = true;
        this.dumbbellService.getOne(this.productId).subscribe({
            next: dumbbell => {
                this.store.dispatch(add_comment({
                    comments: dumbbell.comments
                }));
                this.dumbbell = dumbbell;
                this.isLoading = false;
            },
            error: err => {
                this.isLoading = false;
                this.store.dispatch(authActions.add_message({typeMsg: 'error', text: err.error.message || 'Something went wrong, Please try again later.'}));
            }
        })
    }

}
