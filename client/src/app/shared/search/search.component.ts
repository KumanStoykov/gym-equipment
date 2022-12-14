import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  isPromotion: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isPromotion = this.router.url.split('?')[0] === '/promotion';

  }

}
