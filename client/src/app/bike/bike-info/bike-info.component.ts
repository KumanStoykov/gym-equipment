import { Component, Input, OnInit } from '@angular/core';
import { IBike } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-bike-info',
  templateUrl: './bike-info.component.html',
  styleUrls: ['./bike-info.component.scss']
})
export class BikeInfoComponent implements OnInit {
    @Input() bike!: IBike;

  constructor() { }

  ngOnInit(): void {
  }

}
