import { Component, Input, OnInit } from '@angular/core';
import { ITreadmill } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-treadmill-info',
  templateUrl: './treadmill-info.component.html',
  styleUrls: ['./treadmill-info.component.scss']
})
export class TreadmillInfoComponent implements OnInit {
    @Input() treadmill!: ITreadmill;

  constructor() { }

  ngOnInit(): void {
  }

}
