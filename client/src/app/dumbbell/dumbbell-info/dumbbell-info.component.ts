import { Component, Input, OnInit } from '@angular/core';
import { IDumbbell } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-dumbbell-info',
  templateUrl: './dumbbell-info.component.html',
  styleUrls: ['./dumbbell-info.component.scss']
})
export class DumbbellInfoComponent implements OnInit {
    @Input() dumbbell!: IDumbbell;

  constructor() { }

  ngOnInit(): void {
  }

}
