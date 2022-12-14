import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-filter-price',
	templateUrl: './filter-price.component.html',
	styleUrls: ['./filter-price.component.scss']
})
export class FilterPriceComponent implements OnInit {
	@ViewChild('form') form!: NgForm;

	priceFrom!: number | null;
	priceTo!: number | null;

	constructor(
		private activateRoute: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit(): void {
		this.priceFrom = Number(this.activateRoute.snapshot.queryParams['priceFrom']);
		this.priceTo = Number(this.activateRoute.snapshot.queryParams['priceTo']);
	}

    onSubmit(): void {
        let queryParams = this.activateRoute.snapshot.queryParams;

        if(isNaN(this.priceFrom!) === false) {
            queryParams = {
                ...queryParams,
                priceFrom: this.priceFrom
            };
        }
        if(isNaN(this.priceTo!) === false) {
            queryParams = {
                ...queryParams,
                priceTo: this.priceTo
            };
        }


        Object.assign(queryParams, queryParams['page'] = 1)
        const url = this.router.routerState.snapshot.url.split('?')[0];
        this.router.navigate([url], { queryParams });
        this.form.reset('');
    }

}
