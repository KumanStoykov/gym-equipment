import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { IBike } from 'src/app/shared/interfaces';
import { BikeService } from '../bike.service';

@Component({
    selector: 'app-bike-list',
    templateUrl: './bike-list.component.html',
    styleUrls: ['./bike-list.component.scss']
})
export class BikeListComponent implements OnInit {

    heroTitle = 'BIKES';
    pageTitle = 'SUPREME BIKE PERFORMANCE';

    bikes: IBike[] = [];
    page: number = 1;
    count: number = 0;
    isLoading: boolean = false;
    error: string = '';

    constructor(
        private bikeService: BikeService,
        private activationRouter: ActivatedRoute
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

                return this.bikeService.getAll(query);
            })
        ).subscribe({
            next: data => {
                this.bikes = data.bikes;
                this.count = data.bikesCount;
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
    }

}
