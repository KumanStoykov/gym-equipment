import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as authActions from '../../+store/actions';
import * as authSelectors from '../../+store/selectors';

import { clear_message } from 'src/app/+store/actions';
import { BenchService } from 'src/app/bench/bench.service';
import { BikeService } from 'src/app/bike/bike.service';
import { DumbbellService } from 'src/app/dumbbell/dumbbell.service';
import { RackService } from 'src/app/rack/rack.service';
import { TreadmillService } from 'src/app/treadmill/treadmill.service';
import { UserService } from 'src/app/user/user.service';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

    message$: Observable<authActions.messageProps | null> = this.store.select(authSelectors.selectMessage);

    isLoading: boolean = false;
    productType: string = '';
    productId: string = '';

    deleteRequests: {
        treadmill: TreadmillService,
        bike: BikeService,
        bench: BenchService,
        dumbbell: DumbbellService,
        rack: RackService,
        user: UserService,
    }



    constructor(
        private store: Store,
        private router: Router,
        private treadmillService: TreadmillService,
        private bikeService: BikeService,
        private rackService: RackService,
        private benchService: BenchService,
        private dumbbellService: DumbbellService,
        private userService: UserService,

    ) {
        this.deleteRequests = {
            'treadmill': this.treadmillService,
            'bike': this.bikeService,
            'bench': this.benchService,
            'dumbbell': this.dumbbellService,
            'rack': this.rackService,
            'user': this.userService,
        }
    }

    ngOnInit(): void {
        this.message$.subscribe({
            next: message => {
                this.productType = message?.product!;
                this.productId = message?._id!;
            }
        });

    }

    cancelHandler(): void {
        this.store.dispatch(clear_message());

    }
    deleteHandler(): void {
        this.isLoading = true;

        if (this.productType == 'treadmill'
            || this.productType == 'bike'
            || this.productType == 'bench'
            || this.productType == 'rack'
            || this.productType == 'dumbbell'
            || this.productType == 'user'
        ) {
            console.log(this.productId)
            this.deleteRequests[this.productType].delete(this.productId).subscribe({
                next: () => {
                    this.isLoading = false;
                    this.router.navigate(['/admin'])
                    this.store.dispatch(clear_message());
                },
                error: err => {
                    this.isLoading = false;
                    this.store.dispatch(clear_message());
                    console.log(err.error.message);
                }
            })
        }
    }

}
