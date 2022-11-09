import { Component, OnInit } from '@angular/core';

import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-item-card',
    templateUrl: './item-card.component.html',
    styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

    icons = {
        faStar,
        faStarHalf
    }

    constructor() { }

    ngOnInit(): void {
    }

}
