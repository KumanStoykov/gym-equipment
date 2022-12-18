import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { add_comment } from 'src/app/+store/actions';
import { IRack } from 'src/app/shared/interfaces';
import { RackService } from '../rack.service';
import * as authActions from '../../+store/actions';
import { IAuthState } from 'src/app/+store/reducers';
@Component({
  selector: 'app-rack-details',
  templateUrl: './rack-details.component.html',
  styleUrls: ['./rack-details.component.scss']
})
export class RackDetailsComponent implements OnInit {

    heroTitle: string = 'DETAILS';

    rack!: IRack;
    isLoading: boolean = false;

    productId = this.router.url.split('/')[3];

    constructor(
        private rackService: RackService,
        private router: Router,
        private store: Store<IAuthState>,

    ) { }

    ngOnInit(): void {
        this.isLoading = true;
        this.rackService.getOne(this.productId).subscribe({
            next: rack => {
                this.store.dispatch(add_comment({
                    comments: rack.comments
                }));
                this.rack = rack;
                this.isLoading = false;
            },
            error: err => {
                console.log(err)
                this.isLoading = false;
                this.store.dispatch(authActions.add_message({typeMsg: 'error', text: err.error.message || 'Something went wrong, Please try again later.'}));
            }
        })

    }
}
