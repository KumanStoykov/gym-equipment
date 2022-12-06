import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';

import { faAnglesUp } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'app-btn-scroll-top',
    templateUrl: './btn-scroll-top.component.html',
    styleUrls: ['./btn-scroll-top.component.scss']
})
export class BtnScrollTopComponent {

    isShow: boolean = false;
    startShowing: number = 100;
    faAngelsUp = faAnglesUp;

    constructor(@Inject(DOCUMENT) private document: Document) { }

    @HostListener('window:scroll', [])

    checkScroll() {
        const scrollPosition = window.scrollX || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;

        if (scrollPosition >= this.startShowing) {
            this.isShow = true;

        } else {
            this.isShow = false;
        }
    }

    gotoTop() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

}
