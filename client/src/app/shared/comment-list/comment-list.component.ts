import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as authSelectors from '../../+store/authStore/selector';
import { IComment, IUser } from '../interfaces';
import { SharedService } from '../shared.service';

@Component({
    selector: 'app-comment-list',
    templateUrl: './comment-list.component.html',
    styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit, OnDestroy {
    @Input() productId: string = '';
    @Input() productName: string = '';
    @Input() commentFormIsOpen: boolean = false;

    user$: Observable<IUser | null> = this.store.select(authSelectors.selectUser);

    count: number = 0;
    comments: IComment[] = [];
    isEditForm: boolean = false;
    isLoading: boolean = false;
    error: string = '';

    newCommentsSub: Subscription = new Subscription;


    constructor(
        private sharedService: SharedService,
        private store: Store,
        private router: Router
    ) { }

    ngOnInit(): void {

        this.newCommentsSub = this.sharedService.subCommentCreated$$.subscribe(comment => {
            this.comments = [comment, ...this.comments];
        });
        this.newCommentsSub = this.sharedService.subCommentEdit$$.subscribe(comment => {
            let currentComments = this.comments.filter(current => current._id != comment._id);
            this.comments = [comment, ...currentComments];
        });
        this.newCommentsSub = this.sharedService.subCommentDelete$$.subscribe(comment => {
            let currentComments = this.comments.filter(current => current._id != comment._id);
            this.comments = currentComments;
        });


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
        this.user$.subscribe({
            next: user => {
                if (user) {
                    this.commentFormIsOpen = !this.commentFormIsOpen;
                } else {
                    this.router.navigate(['/auth/login'])
                }
            }
        })

    }

    editForm(isOpen: boolean): void {
        this.isEditForm = isOpen;
        this.commentFormIsOpen = isOpen;
    }

    ngOnDestroy(): void {
        this.newCommentsSub.unsubscribe();
    }

}
