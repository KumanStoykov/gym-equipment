import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ITreadmill } from 'src/app/shared/interfaces';
import { TreadmillService } from '../treadmill.service';

@Component({
    selector: 'app-treadmill-list',
    templateUrl: './treadmill-list.component.html',
    styleUrls: ['./treadmill-list.component.scss']
})
export class TreadmillListComponent implements OnInit {

    heroTitle = 'TREADMILLS';
    pageTitle = 'SUPREME RUNNING PERFORMANCE';

    treadmills: ITreadmill[] = [];
    page: number = 1;
    count: number = 0;
    isLoading: boolean = false;
    error: string = '';

    constructor(
        private treadmillService: TreadmillService,
        private activateRouter: ActivatedRoute
    ) { }

    ngOnInit(): void {

        this.activateRouter.queryParams.pipe(
            switchMap(params => {
                let query = '';
                Object.entries(params).forEach(([k, v]) => {
                    query += '&' + k + '=' + v;
                });
                this.page = params['page'];

                this.isLoading = true;
                return this.treadmillService.getAll(query);
            })
        ).subscribe({
            next: data => {
                this.treadmills = data.treadmills;
                this.count = data.treadmillsCount;
                this.isLoading = false;
            },
            error: err => {
                this.isLoading = false;
                this.error = err.error.message || 'Something went wrong. Please try again later.'
            }
        })

    }

    onCloseNot(): void {
        this.error = '';
    }



}
