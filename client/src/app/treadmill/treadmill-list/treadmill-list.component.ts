import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-treadmill-list',
  templateUrl: './treadmill-list.component.html',
  styleUrls: ['./treadmill-list.component.scss']
})
export class TreadmillListComponent implements OnInit {

    heroTitle = 'TREADMILLS';
    pageTitle = 'SUPREME RUNNING PERFORMANCE';

  constructor() { }

  ngOnInit(): void {
  }

}
