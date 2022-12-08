import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITreadmill } from 'src/app/shared/interfaces';
import { TreadmillService } from '../treadmill.service';


@Component({
    selector: 'app-treadmill-details',
    templateUrl: './treadmill-details.component.html',
    styleUrls: ['./treadmill-details.component.scss']
})
export class TreadmillDetailsComponent implements OnInit {

    heroTitle = 'DETAILS';

    treadmill!: ITreadmill;
    isLoading: boolean = false;
    error: string = '';

    productId = this.router.url.split('/')[2];

    constructor(
        private treadmillService: TreadmillService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.isLoading = true;
        this.treadmillService.getOne(this.productId).subscribe({
            next: treadmill => {
                this.treadmill = treadmill;
                this.isLoading = false;
            },
            error: err => {
                this.isLoading = false;
                this.error = err.error.message || 'Something went wrong, Please try again later.'
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
