import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBike } from 'src/app/shared/interfaces';
import { BikeService } from '../bike.service';


@Component({
    selector: 'app-bike-details',
    templateUrl: './bike-details.component.html',
    styleUrls: ['./bike-details.component.scss']
})
export class BikeDetailsComponent implements OnInit {

    heroTitle: string = 'DETAILS';

    bike!: IBike;
    isLoading: boolean = false;
    error: string = '';

    productId = this.router.url.split('/')[2];

    constructor(
        private bikeService: BikeService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.isLoading = true;
        this.bikeService.getOne(this.productId).subscribe({
            next: bike => {
                this.bike = bike;
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
