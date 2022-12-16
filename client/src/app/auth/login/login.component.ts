import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { auth_success } from 'src/app/+store/actions';
import { emailValidator, minLengthValidator } from 'src/app/shared/validators';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    heroTitle: string = 'ACCOUNT';
    pageTitle: string = 'LOGIN';

    loginForm!: FormGroup;
    error: string = '';
    isLoading: boolean = false;
    notIsOpen: boolean = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private store: Store,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required], emailValidator()],
            password: ['', [Validators.required], minLengthValidator(6)]
        });
    }

    onSubmit(): void {

        if (this.loginForm.invalid || this.loginForm.pending) { return; }

        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;

        this.isLoading = true;

        this.authService.login({ email, password }).subscribe({
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
                this.loginForm.reset();
                this.router.navigate(['/']);
            },
            error: err => {
                this.loginForm.get('password')?.reset();
                this.isLoading = false;
                this.error = err.error.message;
            }
        })
    }

    onCloseNot(): void {
        this.error = '';
    }

}
