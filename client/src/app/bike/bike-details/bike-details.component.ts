import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-bike-details',
  templateUrl: './bike-details.component.html',
  styleUrls: ['./bike-details.component.scss']
})
export class BikeDetailsComponent implements OnInit {

    heroTitle = 'DETAILS';

  constructor() { }

  ngOnInit(): void {
  }

}
