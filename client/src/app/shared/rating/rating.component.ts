import { Component, Input, OnInit } from '@angular/core';

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { IComment } from '../interfaces';
import { Store } from '@ngrx/store';
import * as authSelectors from '../../+store/selectors';
import { Observable } from 'rxjs';
import { IAuthState } from 'src/app/+store/reducers';
import { commentProps } from 'src/app/+store/actions';
import { Router } from '@angular/router';

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
    isLoading: boolean = false;

    icons = {
        faStar,
        faStarEmpty
    };
    comment$: Observable<commentProps | null> = this.store.select(authSelectors.selectComment);

    constructor(
        private store: Store<IAuthState>,
        private router: Router

    ) { }

    ngOnInit(): void {
        const urlPath = this.router.url.split('?').filter(x => x.includes('page'));
        const isHomePage = this.router.url.split('?')[0] === '/';

        if (this.comment) {
            for (let i = 0; i < 5; i++) {
                if (Math.floor(this.comment.rating) > i) {
                    this.starsRating.push(true);
                } else {
                    this.starsRating.push(false);
                }
            }
        } else if (urlPath.length === 0 && !isHomePage) {

            this.comment$.subscribe({
                next: comment => {
                    this.countComments = comment?.comments.length || 0;
                    this.starsRating = []
                    let totalRating = 0;

                    if (comment?.comments.length! > 0) {
                        totalRating = comment?.comments.reduce((a: number, x: any) => {
                            a += x.rating / comment?.comments.length;
                            return a;
                        }, 0) || 0;
                    }

                    for (let i = 0; i < 5; i++) {
                        if (Math.floor(totalRating) > i) {
                            this.starsRating.push(true);
                        } else {
                            this.starsRating.push(false);
                        }
                    }

                }
            });

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
