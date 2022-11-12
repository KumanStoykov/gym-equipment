import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dumbbell-details',
  templateUrl: './dumbbell-details.component.html',
  styleUrls: ['./dumbbell-details.component.scss']
})
export class DumbbellDetailsComponent implements OnInit {

    heroTitle = 'DETAILS';

  constructor() { }

  ngOnInit(): void {
  }

}
