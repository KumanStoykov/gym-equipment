import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    @Input() countPages: number | undefined;
    @Input() productCount: number | undefined

    currentPage: number = 1;
    currentUrl: string = '';
    pages: string[] = [];
    totalPages: number = 1;
    currentStarPage: number = 0;

    params: [{ page: number | string }] = [{ page: 1 }];

    icons = {
        faAngleLeft,
        faAngleRight
    }

    constructor(
        private router: Router,
        private activateRouter: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.totalPages = Math.ceil(this.productCount! / this.countPages!);
        let viewPages: number = this.totalPages > 5 ? 5 : this.totalPages;

        this.activateRouter.queryParams.subscribe({
            next: params => {
                this.currentUrl = this.router.url.split('?')[0];

                this.params = [{ ...params, page: params['page'] }];

                params['page'] !== undefined ? this.currentPage = params['page'] : '';

                const { start, end } = this.pageRange(Number(this.currentPage), this.totalPages);

                this.currentStarPage = start;

                this.pages = Array(viewPages).fill(1).map((_, i) => (i + start).toString());

                for (let i = 0; i < this.pages.length; i++) {
                    if (this.totalPages === i) {
                        return;
                    } else {
                        this.params[i + 1] = { ...this.params[i], page: i + start };
                    }
                };

            }
        });
    }

    pageRange(page: number, pageCount: number) {

        let start = page - 2;
        let end = page + 2;

        if (end > pageCount) {
            start -= (end - pageCount);
            end = pageCount;
        }
        if (start <= 0) {
            end += ((start - 1) * (-1));
            start = 1;
        }

        end = end > pageCount ? pageCount : end;

        return { start, end };
    };
}
