import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { faXmark, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { IProduct } from 'src/app/shared/interfaces';


@Component({
  selector: 'app-wishlist-product-card',
  templateUrl: './wishlist-product-card.component.html',
  styleUrls: ['./wishlist-product-card.component.scss']
})
export class WishlistProductCardComponent implements OnInit {
  @Input() product!: IProduct;
  @Output('clickRemoved') clickRemoved: EventEmitter<boolean> = new EventEmitter(true);
  @Output('clickToCart') clickToCart: EventEmitter<boolean> = new EventEmitter(true);

  hasPromo: boolean = false;

  icons = {
    faXmark,
    faCartArrowDown
  }

  constructor() { }

  ngOnInit(): void {
    this.hasPromo = this.product.promoPrice > 0;
  }

  onClickCart(): void {
    this.clickToCart.emit(true);
  }
  onClickRemove(): void {
    this.clickRemoved.emit(true);
  }

}
