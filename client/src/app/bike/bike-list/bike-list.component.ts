import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bike-list',
  templateUrl: './bike-list.component.html',
  styleUrls: ['./bike-list.component.scss']
})
export class BikeListComponent implements OnInit {

    heroTitle = 'BIKES';
    pageTitle = 'SUPREME BIKE PERFORMANCE';

  constructor() { }

  ngOnInit(): void {
  }

}
