import { Component, Input, OnInit } from '@angular/core';

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { IComment } from '../interfaces';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

    @Input() showCount: boolean = false;
    @Input() product: any;
    @Input() comment!: IComment;

    countComments: number = 0;
    starsRating: boolean[] = [];

    icons = {
        faStar,
        faStarEmpty
    };

    constructor() { }

    ngOnInit(): void {
        if (this.comment) {
            for (let i = 0; i < 5; i++) {
                if (Math.floor(this.comment.rating) > i) {
                    this.starsRating.push(true);
                } else {
                    this.starsRating.push(false);
                }
            }
        } else {
            this.countComments = this.product.comments.length;
            let totalRating = 0;


            if (this.product.comments.length > 0) {
                totalRating = this.product.comments.reduce((a: number, x: any) => {
                    a += x.rating / this.product.comments.length;
                    return a;
                }, 0);
            }

            for (let i = 0; i < 5; i++) {
                if (Math.floor(totalRating) > i) {
                    this.starsRating.push(true);
                } else {
                    this.starsRating.push(false);
                }
            }
        }
    }

}
