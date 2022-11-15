import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../auth.service';

import { emailValidator, minLengthValidator, equalValueAsFactory } from '../../shared/validators';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {

    heroTitle = 'ACCOUNT';
    pageTitle = 'REGISTER';

    registerForm!: FormGroup;
    killSubscription = new Subject<void>();
    error: string = '';
    isLoading: boolean = false;


    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
    ) {

        this.registerForm = this.fb.group({
            email: ['', [Validators.required],  emailValidator()],
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
            next: (user) => {
                console.log(user)
                this.router.navigate(['/']);
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    ngOnDestroy(): void {
        this.killSubscription.next();
        this.killSubscription.complete();
    }
}
