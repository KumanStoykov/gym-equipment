import { Component, OnInit } from '@angular/core';

import { faXmark } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-wishlist-product-card',
  templateUrl: './wishlist-product-card.component.html',
  styleUrls: ['./wishlist-product-card.component.scss']
})
export class WishlistProductCardComponent implements OnInit {

  faXmark = faXmark;

  constructor() { }

  ngOnInit(): void {
  }

}
