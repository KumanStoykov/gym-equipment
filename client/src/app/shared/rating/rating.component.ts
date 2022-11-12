import { Component, Input, OnInit } from '@angular/core';

import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

    @Input() showCount: boolean = false;

    icons = {
        faStar,
        faStarHalf
    };

    constructor() { }

    ngOnInit(): void {
    }

}
