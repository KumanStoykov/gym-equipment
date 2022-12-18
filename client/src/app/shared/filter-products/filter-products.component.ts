import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take, switchMap } from 'rxjs';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-filter-products',
  templateUrl: './filter-products.component.html',
  styleUrls: ['./filter-products.component.scss']
})
export class FilterProductsComponent implements OnInit {
  productsType: string[] = [];
  selectedTypes: string[] = [];
  isLoading: boolean = false;

  constructor(
      private activateRoute: ActivatedRoute,
      private router: Router,
      private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
      const url = this.router.routerState.snapshot.url.split('?')[0];

      this.activateRoute.queryParams.pipe(
          take(1),
          switchMap(
              params => {
                  let query = '?';
                  Object.entries(params).forEach(([k, v]) => {
                      query += '&' + k + '=' + v;
                      if(k === 'product') {
                          this.selectedTypes = v.split(',');
                      }
              });
                  this.isLoading = true;
                  return this.sharedService.getByProducts(query);
              }
          )
      ).subscribe({
          next: data => {
              this.productsType = data.products;
              this.isLoading = false;
          },
          error: err => {
              this.isLoading = false;
          }
      })
  }

  onCheckClick(event: any): void {
      const isCheck = event.target.checked;
      const checkValue = event.target.value;

      if(isCheck) {
          this.selectedTypes.push(checkValue);
      } else {
          const index = this.selectedTypes.indexOf(checkValue);
          this.selectedTypes.splice(index, 1);
      }

      let queryParams = this.activateRoute.snapshot.queryParams;

      queryParams = {
          ...queryParams,
          product: this.selectedTypes.join(',')
      }

      if(this.selectedTypes.length === 0) {
          delete queryParams['product'];
      }

      queryParams['page'] = 1;

      const url = this.router.routerState.snapshot.url.split('?')[0];
      this.router.navigate([url], { queryParams });
  }
}
