import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { add_comment } from 'src/app/+store/authStore/actions';
import { IDumbbell } from 'src/app/shared/interfaces';
import { DumbbellService } from '../dumbbell.service';

@Component({
  selector: 'app-dumbbell-details',
  templateUrl: './dumbbell-details.component.html',
  styleUrls: ['./dumbbell-details.component.scss']
})
export class DumbbellDetailsComponent implements OnInit {

    heroTitle: string = 'DETAILS';

    dumbbell!: IDumbbell;
    isLoading: boolean = false;
    error: string = '';

    productId = this.router.url.split('/')[3];

    constructor(
        private dumbbellService: DumbbellService,
        private router: Router,
        private store: Store,
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
