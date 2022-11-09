import { Component, OnInit } from '@angular/core';

import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-sale',
  templateUrl: './home-sale.component.html',
  styleUrls: ['./home-sale.component.scss']
})
export class HomeSaleComponent implements OnInit {

    icons = {
        faDumbbell
    }

  constructor() { }

  ngOnInit(): void {
  }

}
