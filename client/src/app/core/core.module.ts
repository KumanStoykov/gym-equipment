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
import { BtnScrollTopComponent } from './btn-scroll-top/btn-scroll-top.component';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { AboutComponent } from './about/about.component';



@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        HeroComponent,
        HomeComponent,
        HomeGalleryComponent,
        HomeSaleComponent,
        HomeServicesComponent,
        HomeSupportComponent,
        BtnScrollTopComponent,
        TopNavigationComponent,
        TermsAndConditionsComponent,
        AboutComponent
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
        HomeComponent,
        BtnScrollTopComponent
    ]
})
export class CoreModule { }
