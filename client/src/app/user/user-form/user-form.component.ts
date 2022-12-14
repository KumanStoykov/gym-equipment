import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAuthState } from 'src/app/+store/authStore/reducers';

import { IUser } from 'src/app/shared/interfaces';
import { emailValidator } from '../../shared/validators';
import { UserService } from '../user.service';
import { auth_success } from 'src/app/+store/authStore/actions';

@Component({
	selector: 'app-user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
	@Input() isEdit: boolean = false;
    @Output('cancelEdit') cancelEdit: EventEmitter<boolean> = new EventEmitter;

	user: IUser | undefined;
	userForm!: FormGroup;
	error: string = '';
	isLoading: boolean = false;

	constructor(
		private fb: FormBuilder,
		private userService: UserService,
		private router: Router,
		private store: Store<IAuthState>
	) {
		this.userForm = this.fb.group({
            firstName: [''],
            lastName: [''],
			email: ['', [Validators.required], emailValidator()],
			phone: [''],
			address: [''],

		});
	}

	ngOnInit(): void {
        if(this.isEdit) {
            this.isLoading = true;
            this.userService.loadProfile().subscribe({
                next: user => {
                    this.user = user;
                    this.userForm.patchValue({
                        firstName: user?.firstName,
                        lastName: user?.lastName,
                        email: user?.email,
                        phone: user?.phone,
                        address: user?.address,
                    });
                    this.isLoading = false
                },
                error: err => {
                    this.isEdit = false;
                    this.isLoading = false;
                }
            })


        }
	}

	onSubmit(): void {

        if (this.userForm.invalid || this.userForm.pending) { return; }

        const formValue = this.userForm.value;

        this.isLoading = true;

        this.userService.editUser(this.user?._id!, formValue).subscribe({
            next: user => {
                this.store.dispatch(auth_success({
                    _id: user._id,
                    email: user.email,
                    firstName: user.firstName || '',
                    lastName: user.lastName || '',
                    phone: user.phone || '',
                    address: user.address || '',
                    isAdmin: user.isAdmin
                }));
                this.isLoading = false;
                this.userForm.reset();
                this.cancelEdit.emit(true);

            },
            error: (err) => {
                this.isLoading = false;
                this.error = err.error.message;
            }
        })
	}


	cancelHandler(): void {
        this.cancelEdit.emit(true);
	}

    onCloseNot(): void {
        this.error = '';
    }

}
