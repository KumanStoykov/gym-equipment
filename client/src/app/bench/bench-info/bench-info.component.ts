import { Component, Input, OnInit } from '@angular/core';
import { IBench } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-bench-info',
  templateUrl: './bench-info.component.html',
  styleUrls: ['./bench-info.component.scss']
})
export class BenchInfoComponent implements OnInit {
    @Input() bench!: IBench;

  constructor() { }

  ngOnInit(): void {
  }

}
