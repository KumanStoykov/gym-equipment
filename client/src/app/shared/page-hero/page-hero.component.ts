import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-page-hero',
    templateUrl: './page-hero.component.html',
    styleUrls: ['./page-hero.component.scss']
})
export class PageHeroComponent implements OnInit {

    @Input() heroPageTitle!: string;

    constructor() { }

    ngOnInit(): void {
    }

}
