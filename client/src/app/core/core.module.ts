import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { HomeComponent } from './home/home.component';
import { HomeGalleryComponent } from './home-gallery/home-gallery.component';
import { HomeSaleComponent } from './home-sale/home-sale.component';
import { HomeServicesComponent } from './home-services/home-services.component';
import { HomeSupportComponent } from './home-support/home-support.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        HeroComponent,
        HomeComponent,
        HomeGalleryComponent,
        HomeSaleComponent,
        HomeServicesComponent,
        HomeSupportComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        SharedModule,
        RouterModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        HomeComponent
    ]
})
export class CoreModule { }
