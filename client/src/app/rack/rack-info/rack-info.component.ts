import { Component, Input, OnInit } from '@angular/core';
import { IRack } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-rack-info',
  templateUrl: './rack-info.component.html',
  styleUrls: ['./rack-info.component.scss']
})
export class RackInfoComponent implements OnInit {
    @Input() rack!: IRack;

  constructor() { }

  ngOnInit(): void {
  }

}
