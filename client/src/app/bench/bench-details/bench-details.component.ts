import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { add_comment } from 'src/app/+store/actions';
import { IBench } from 'src/app/shared/interfaces';
import { BenchService } from '../bench.service';
import * as authActions from '../../+store/actions';
import { IAuthState } from 'src/app/+store/reducers';

@Component({
  selector: 'app-bench-details',
  templateUrl: './bench-details.component.html',
  styleUrls: ['./bench-details.component.scss']
})
export class BenchDetailsComponent implements OnInit {

    heroTitle: string = 'DETAILS';

    bench!: IBench;
    isLoading: boolean = false;

    productId = this.router.url.split('/')[3];

    constructor(
        private benchService: BenchService,
        private router: Router,
        private store: Store<IAuthState>,

    ) { }

    ngOnInit(): void {
        this.isLoading = true;
        this.benchService.getOne(this.productId).subscribe({
            next: bench => {
                this.store.dispatch(add_comment({
                    comments: bench.comments
                }));
                this.bench = bench;
                this.isLoading = false;
            },
            error: err => {
                this.isLoading = false;
                this.store.dispatch(authActions.add_message({typeMsg: 'error', text: err.error.message || 'Something went wrong, Please try again later.'}));
            }
        })

    }
}
