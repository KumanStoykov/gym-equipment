import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { IComment } from '../interfaces';
import { SharedService } from '../shared.service';

@Component({
    selector: 'app-comment-create',
    templateUrl: './comment-create.component.html',
    styleUrls: ['./comment-create.component.scss']
})
export class CommentCreateComponent implements OnInit {
    @ViewChild('form') form!: NgForm;

    @Input() productId: string = '';
    @Input() productName: string = '';
    @Input() editCommentId: string = '';
    @Output('closeForm') closeForm: EventEmitter<boolean> = new EventEmitter(false);

    comment!: IComment | undefined;
    commentId: string = '';
    isLoading: boolean = false;
    error: string = '';
    isEdit: boolean = false;
    ratingIsValid: boolean = false;

    faXmark = faXmark;

    constructor(
        private sharedService: SharedService
    ) { }

    ngOnInit(): void {
        if (this.editCommentId) {
            this.isLoading = true;
            this.sharedService.getById(this.editCommentId).subscribe({
                next: comment => {
                    this.comment = comment;
                    this.isLoading = false;
                    this.isEdit = true;
                    this.commentId = comment._id;
                },
                error: err => {
                    this.isLoading = false;
                    this.error = err.error.message;
                }
            })

        }

    }

    onSubmit() {

        const commentValue = this.form.value;
        this.isLoading = true;

        if (!this.isEdit && commentValue.rating === '') {
            this.ratingIsValid = true;
            return;
        }

        if (commentValue.rating == '') {
            commentValue.rating = this.comment?.rating;
        }

        // if(!this.isEdit && this.form.invalid) { return; }

        if (!this.isEdit) {

            this.ratingIsValid = false;

            this.sharedService.crateComment(commentValue, this.productId, this.productName).subscribe({
                next: comment => {
                    this.isLoading = false;
                    this.form.reset();
                    this.closeFormHandler()
                },
                error: err => {
                    this.isLoading = false;
                    this.error = "All Fields is required!";
                }
            });
        } else {
            this.sharedService.editPost(commentValue, this.commentId).subscribe({
                next: comment => {
                    this.isLoading = false;
                    this.form.reset();
                    this.isEdit = false;
                    this.closeFormHandler();
                },
                error: err => {
                    this.isLoading = false;
                    this.error = err.error.message;
                }
            });
        }


    }

    closeFormHandler(): void {
        this.closeForm.emit(false);
    }

    onCloseNot(): void {
        this.error = '';
    }
}


