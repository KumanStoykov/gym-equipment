import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ProductCardComponent } from './product-card/product-card.component';
import { RatingComponent } from './rating/rating.component';
import { LoaderComponent } from './loader/loader.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { PageHeroComponent } from './page-hero/page-hero.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { SearchComponent } from './search/search.component';
import { FilterBrandComponent } from './filter-brand/filter-brand.component';
import { FilterPriceComponent } from './filter-price/filter-price.component';
import { FilterOrderComponent } from './filter-order/filter-order.component';
import { CommentComponent } from './comment/comment.component';
import { SliderComponent } from './slider/slider.component';
import { RouterModule } from '@angular/router';
import { DetailsPageHeaderComponent } from './details-page-header/details-page-header.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { NotificationComponent } from './notification/notification.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CommentCreateComponent } from './comment-create/comment-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterProductsComponent } from './filter-products/filter-products.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { MixedContentPipe } from './pipes/mixed-content.pipe';



@NgModule({
  declarations: [
    ProductCardComponent,
    RatingComponent,
    LoaderComponent,
    ClickOutsideDirective,
    PageHeroComponent,
    PageTitleComponent,
    SearchComponent,
    FilterBrandComponent,
    FilterPriceComponent,
    FilterOrderComponent,
    CommentComponent,
    SliderComponent,
    DetailsPageHeaderComponent,
    CommentListComponent,
    NotificationComponent,
    PaginationComponent,
    CommentCreateComponent,
    FilterProductsComponent,
    ConfirmComponent,
    MixedContentPipe,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ProductCardComponent,
    RatingComponent,
    LoaderComponent,
    PageHeroComponent,
    PageTitleComponent,
    SearchComponent,
    CommentComponent,
    SliderComponent,
    ClickOutsideDirective,
    DetailsPageHeaderComponent,
    CommentListComponent,
    NotificationComponent,
    PaginationComponent,
    ConfirmComponent,
    MixedContentPipe
  ]
})
export class SharedModule { }
