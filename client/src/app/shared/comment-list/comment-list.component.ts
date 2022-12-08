import { Component, Input, OnInit } from '@angular/core';
import { IComment } from '../interfaces';
import { SharedService } from '../shared.service';

@Component({
    selector: 'app-comment-list',
    templateUrl: './comment-list.component.html',
    styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
    @Input() productId: string = '';
    @Input() productName: string = '';
    @Input() commentFormIsOpen: boolean = false;

    count: number = 0;
    comments: IComment[] = [];
    isLoading: boolean = false;
    error: string = '';




    constructor(
        private sharedService: SharedService
    ) { }

    ngOnInit(): void {
        this.sharedService.getAllComments(this.productId).subscribe({
            next: data => {
                this.comments = data.comments;
                this.count = data.commentsCount;
                this.isLoading = false;
            },
            error: err => {
                this.error = err;
                this.isLoading = false;
            }
        })
    }

    closeFormHandel(): void {
        this.commentFormIsOpen = !this.commentFormIsOpen;
    }

}
