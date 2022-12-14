import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take } from 'rxjs';
import { SharedService } from '../shared.service';

@Component({
	selector: 'app-filter-brand',
	templateUrl: './filter-brand.component.html',
	styleUrls: ['./filter-brand.component.scss']
})
export class FilterBrandComponent implements OnInit {
	brands: string[] = [];
	selectedBrands: string[] = [];
	isLoading: boolean = false;

	constructor(
		private activateRoute: ActivatedRoute,
		private router: Router,
		private sharedService: SharedService,
	) { }

	ngOnInit(): void {
		const url = this.router.routerState.snapshot.url.split('?')[0];

		const urlRequestPath = {
			'/treadmill': 'treadmill',
			'/bike': 'bike',
			'/promotion': 'promotion',
			'/strength/rack': 'rack',
			'/strength/bench': 'bench',
			'/strength/dumbbell': 'dumbbell'
		}
		const productCategory = urlRequestPath[url as keyof object];

        this.activateRoute.queryParams.pipe(
            take(1),
            switchMap(
                params => {
                    let query = '?';
                    Object.entries(params).forEach(([k, v]) => {
                        query += '&' + k + '=' + v;
                        if(k === 'brands') {
                            this.selectedBrands = v.split(',');
                        }
                });
                    this.isLoading = true;
                    return this.sharedService.getByBrands(productCategory, query);
                }
            )
        ).subscribe({
            next: data => {
                this.brands = data.brands;
                this.isLoading = false;
            },
            error: err => {
                this.isLoading = false;
                console.log(err.error.message);
            }
        })
	}

    onCheckClick(event: any): void {
        const isCheck = event.target.checked;
        const checkValue = event.target.value;

        if(isCheck) {
            this.selectedBrands.push(checkValue);
        } else {
            const index = this.selectedBrands.indexOf(checkValue);
            this.selectedBrands.splice(index, 1);
        }

        let queryParams = this.activateRoute.snapshot.queryParams;

        queryParams = {
            ...queryParams,
            brands: this.selectedBrands.join(',')
        }

        if(this.selectedBrands.length === 0) {
            delete queryParams['brands'];
        }

        queryParams['page'] = 1;

        const url = this.router.routerState.snapshot.url.split('?')[0];
        this.router.navigate([url], { queryParams });
    }

}
