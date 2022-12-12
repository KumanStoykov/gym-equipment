import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';


import { AuthService } from '../auth.service';
import { emailValidator, minLengthValidator, equalValueAsFactory } from '../../shared/validators';
import { IAuthState } from 'src/app/+store/authStore/reducers';
import { auth_success } from 'src/app/+store/authStore/actions';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {

    heroTitle: string = 'ACCOUNT';
    pageTitle: string = 'REGISTER';

    registerForm!: FormGroup;
    killSubscription = new Subject<void>();
    error: string = '';
    isLoading: boolean = false;


    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private store: Store<IAuthState>
    ) {

        this.registerForm = this.fb.group({
            email: ['', [Validators.required], emailValidator()],
            password: ['', [Validators.required], minLengthValidator(6)],
            repeatPassword: ['', [Validators.required], equalValueAsFactory(
                () => this.registerForm?.get('password'), this.killSubscription
            )]
        });
    }



    onSubmit(): void {

        if (this.registerForm.invalid || this.registerForm.pending) { return; }

        const email = this.registerForm.value.email;
        const password = this.registerForm.value.password;

        this.isLoading = true;

        this.authService.register({ email, password }).subscribe({
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
                this.registerForm.reset();
                this.router.navigate(['/']);
            },
            error: (err) => {
                this.registerForm.get('password')?.reset();
                this.registerForm.get('repeatPassword')?.reset();
                this.isLoading = false;
                this.error = err.error.message;
            }
        })
    }


    onCloseNot(): void {
        this.error = '';
    }

    ngOnDestroy(): void {
        this.killSubscription.next();
        this.killSubscription.complete();
    }
}
