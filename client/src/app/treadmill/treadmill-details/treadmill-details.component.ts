import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { add_comment } from 'src/app/+store/actions';
import { ITreadmill } from 'src/app/shared/interfaces';
import { TreadmillService } from '../treadmill.service';
import * as authActions from '../../+store/actions';
import { IAuthState } from 'src/app/+store/reducers';

@Component({
    selector: 'app-treadmill-details',
    templateUrl: './treadmill-details.component.html',
    styleUrls: ['./treadmill-details.component.scss']
})
export class TreadmillDetailsComponent implements OnInit {

    heroTitle: string = 'DETAILS';

    treadmill!: ITreadmill;
    isLoading: boolean = false;

    productId = this.router.url.split('/')[2];

    constructor(
        private treadmillService: TreadmillService,
        private router: Router,
        private store: Store<IAuthState>,
    ) { }

    ngOnInit(): void {
        this.isLoading = true;
        this.treadmillService.getOne(this.productId).subscribe({
            next: treadmill => {
                this.store.dispatch(add_comment({
                    comments: treadmill.comments
                }));
                this.treadmill = treadmill;
                this.isLoading = false;
            },
            error: err => {
                this.isLoading = false;
                this.store.dispatch(authActions.add_message({typeMsg: 'error', text: err.error.message || 'Something went wrong, Please try again later.'}));
            }
        })
    }
}
