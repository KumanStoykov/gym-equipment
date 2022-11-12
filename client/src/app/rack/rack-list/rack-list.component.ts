import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rack-list',
  templateUrl: './rack-list.component.html',
  styleUrls: ['./rack-list.component.scss']
})
export class RackListComponent implements OnInit {

    heroTitle = 'RACKS';
    pageTitle = 'SUPREME RUNNING PERFORMANCE';

  constructor() { }

  ngOnInit(): void {
  }

}
