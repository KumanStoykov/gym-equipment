import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAuthState } from 'src/app/+store/reducers';

import * as authActions from '../../+store/actions';
import { IProduct, IUser } from 'src/app/shared/interfaces';
import { emailValidator } from '../../shared/validators';
import { UserService } from '../user.service';
import { auth_success } from 'src/app/+store/actions';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
    @Input() isEdit: boolean = false;
    @Input() products: IProduct[] = [];
    @Output('cancelEdit') cancelEdit: EventEmitter<boolean> = new EventEmitter;

    user: IUser | undefined;
    userForm!: FormGroup;
    error: string = '';
    isLoading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private store: Store<IAuthState>,
        private router: Router
    ) {
        if (this.isEdit) {
            this.userForm = this.fb.group({
                firstName: [''],
                lastName: [''],
                email: ['', [Validators.required], emailValidator()],
                phone: [''],
                address: ['']

            });

        } else {
            this.userForm = this.fb.group({
                firstName: ['', [Validators.required]],
                lastName: ['', [Validators.required]],
                email: ['', [Validators.required], emailValidator()],
                phone: ['', [Validators.required]],
                address: ['', [Validators.required]]

            });
        }
    }

    ngOnInit(): void {

        if (this.isEdit) {
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

        if (this.isEdit) {
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
        } else {
            formValue.products = [...this.products];

            this.userService.createOrder(formValue).subscribe({
                next: data => {
                    this.isLoading = false;
                    this.store.dispatch(authActions.empty_cart());

                    if(this.user) {
                        this.router.navigateByUrl(`user/${this.user._id}/orders`)
                    } else {
                        this.router.navigateByUrl('/')
                    }

                },
                error: err => {
                    this.isLoading = false;
                    this.error = err.error.message;
                }
            })
        }
    }


    cancelHandler(): void {
        this.cancelEdit.emit(true);
    }

    onCloseNot(): void {
        this.error = '';
    }

}
