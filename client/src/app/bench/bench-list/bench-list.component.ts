import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { IBench } from 'src/app/shared/interfaces';
import { BenchService } from '../bench.service';

@Component({
  selector: 'app-bench-list',
  templateUrl: './bench-list.component.html',
  styleUrls: ['./bench-list.component.scss']
})
export class BenchListComponent implements OnInit {

    heroTitle = 'BENCHES';
    pageTitle = 'SUPREME PERFORMANCE';

    benches: IBench[] = [];
    page: number = 1;
    count: number = 0;
    isLoading: boolean = false;
    error: string = '';

    constructor(
        private benchService: BenchService,
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

                return this.benchService.getAll(query);
            })
        ).subscribe({
            next: data => {
                this.benches = data.benches;
                this.count = data.benchesCount;
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
