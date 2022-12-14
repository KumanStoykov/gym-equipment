import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-filter-order',
	templateUrl: './filter-order.component.html',
	styleUrls: ['./filter-order.component.scss']
})
export class FilterOrderComponent implements OnInit {

	selected: string | undefined;

	constructor(
		private activateRoute: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit(): void {
		this.activateRoute.queryParams.subscribe({
			next: params => {
				if (params) {
					this.selected = params['sort'];
				}
			}
		})
	}


	onSelectChange(event: any): void {
		this.selected = event.target.value;

		let queryParams = this.activateRoute.snapshot.queryParams;

		queryParams = {
			...queryParams,
			sort: this.selected
		}

		queryParams['page'] = 1;
		const url = this.router.routerState.snapshot.url.split('?')[0];
		this.router.navigate([url], { queryParams });
	}

}
