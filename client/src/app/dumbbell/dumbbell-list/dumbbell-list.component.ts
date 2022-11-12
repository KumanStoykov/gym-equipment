import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dumbbell-list',
  templateUrl: './dumbbell-list.component.html',
  styleUrls: ['./dumbbell-list.component.scss']
})
export class DumbbellListComponent implements OnInit {

    heroTitle = 'DUMBBELLS';
    pageTitle = 'SUPREME RUNNING PERFORMANCE';

  constructor() { }

  ngOnInit(): void {
  }

}
