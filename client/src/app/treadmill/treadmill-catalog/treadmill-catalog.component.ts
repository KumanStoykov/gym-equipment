import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-treadmill-catalog',
  templateUrl: './treadmill-catalog.component.html',
  styleUrls: ['./treadmill-catalog.component.scss']
})
export class TreadmillCatalogComponent implements OnInit {

    heroTitle = 'TREADMILLS';
    pageTitle = 'SUPREME RUNNING PERFORMANCE';

  constructor() { }

  ngOnInit(): void {
  }

}
