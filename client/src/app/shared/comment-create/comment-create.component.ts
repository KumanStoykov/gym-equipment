import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from '../shared.service';
import { minLengthValidator } from '../validators';

@Component({
    selector: 'app-comment-create',
    templateUrl: './comment-create.component.html',
    styleUrls: ['./comment-create.component.scss']
})
export class CommentCreateComponent implements OnInit {

    @Input() productId: string = '';
    @Input() productName: string = '';
    @Input() showForm: boolean = false;
    @Output('closeForm') closeForm: EventEmitter<boolean> = new EventEmitter();

    commentForm!: FormGroup;
    isLoading: boolean = false;
    error: string = '';

    faXmark = faXmark;

    constructor(
        private fb: FormBuilder,
        private sharedService: SharedService
    ) {
        this.commentForm = this.fb.group({
            rating: ['', [Validators.required]],
            name: ['', [Validators.required]],
            comment: ['', [Validators.required], minLengthValidator(6)],
        })
     }

    ngOnInit(): void {
    }

    onSubmit() {
        if (this.commentForm.invalid || this.commentForm.pending) { return; }
        const comment = this.commentForm.value;
        console.log(comment)
        this.isLoading = true;

        this.sharedService.cratePost(comment, this.productId, this.productName).subscribe({
            next: comment => {
                this.isLoading = false;
                this.commentForm.reset();
                this.formClose();
            },
            error: err => {
                this.isLoading = false;
                this.error = err.error.message;
            }
        })

    }

    formClose(): void {
        this.showForm = false;
        this.closeForm.emit(false);
    }

    onCloseNot(): void {
        this.error = '';
    }
}
