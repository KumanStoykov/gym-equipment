import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ItemCardComponent } from './item-card/item-card.component';
import { RatingComponent } from './rating/rating.component';
import { LoaderComponent } from './loader/loader.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { PageHeroComponent } from './page-hero/page-hero.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { SearchComponent } from './search/search.component';
import { FilterBrandComponent } from './filter-brand/filter-brand.component';
import { FilterPriceComponent } from './filter-price/filter-price.component';
import { FilterProductComponent } from './filter-product/filter-product.component';
import { FilterOrderComponent } from './filter-order/filter-order.component';



@NgModule({
  declarations: [
    ItemCardComponent,
    RatingComponent,
    LoaderComponent,
    ClickOutsideDirective,
    PageHeroComponent,
    PageTitleComponent,
    SearchComponent,
    FilterBrandComponent,
    FilterPriceComponent,
    FilterProductComponent,
    FilterOrderComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    ItemCardComponent,
    RatingComponent,
    LoaderComponent,
    PageHeroComponent,
    PageTitleComponent,
    SearchComponent,
    ClickOutsideDirective
  ]
})
export class SharedModule { }
