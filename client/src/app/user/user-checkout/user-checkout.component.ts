import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-checkout',
  templateUrl: './user-checkout.component.html',
  styleUrls: ['./user-checkout.component.scss']
})
export class UserCheckoutComponent implements OnInit {

    heroTitle = 'CHECKOUT';
    pageTitle = 'MAKE PAYMENT';

  constructor() { }

  ngOnInit(): void {
  }

}
