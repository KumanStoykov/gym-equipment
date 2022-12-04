import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { IDumbbell } from 'src/app/shared/interfaces';
import { DumbbellService } from '../dumbbell.service';

@Component({
  selector: 'app-dumbbell-list',
  templateUrl: './dumbbell-list.component.html',
  styleUrls: ['./dumbbell-list.component.scss']
})
export class DumbbellListComponent implements OnInit {

    heroTitle = 'DUMBBELLS';
    pageTitle = 'SUPREME RUNNING PERFORMANCE';

    dumbbells: IDumbbell[] = [];
    page: number = 1;
    count: number = 0;
    isLoading: boolean = false;
    error: string = '';

    constructor(
        private dumbbellService: DumbbellService,
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

                return this.dumbbellService.getAll(query);
            })
        ).subscribe({
            next: data => {
                this.dumbbells = data.dumbbells;
                this.count = data.dumbbellsCount;
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
