import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { add_comment } from 'src/app/+store/authStore/actions';
import { IRack } from 'src/app/shared/interfaces';
import { RackService } from '../rack.service';

@Component({
  selector: 'app-rack-details',
  templateUrl: './rack-details.component.html',
  styleUrls: ['./rack-details.component.scss']
})
export class RackDetailsComponent implements OnInit {

    heroTitle: string = 'DETAILS';

    rack!: IRack;
    isLoading: boolean = false;
    error: string = '';

    productId = this.router.url.split('/')[3];

    constructor(
        private rackService: RackService,
        private router: Router,
        private store: Store,

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
                this.error = err.error.message || 'Something went wrong, Please try again later.';
            }
        })

    }

    onCloseNot(): void {
        this.error = '';
        if(this.error.includes('Something went wrong')) {
            this.router.navigate(['/'])
        }
    }
}
