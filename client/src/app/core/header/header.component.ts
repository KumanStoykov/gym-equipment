import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthService } from 'src/app/auth/auth.service';
import * as authSelectors from '../../+store/authStore/selector';
import * as authActions from '../../+store/authStore/actions';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces';
import { IAuthState } from 'src/app/+store/authStore/reducers';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    menuIsToggle: boolean = false;
    strengthIsToggle: boolean = false;
    accountIsToggle: boolean = false;

    user$: Observable<IUser | null> = this.store.select(authSelectors.selectUser);


    constructor(
       private authService: AuthService,
       private store: Store<IAuthState>,
       private router: Router
    ) { }

    ngOnInit(): void {
    }

    menuToggle(): void {
        this.menuIsToggle = !this.menuIsToggle;
        this.strengthIsToggle = false;
        this.accountIsToggle = false;
    }

    handleOutsideClick(): void {
        this.menuIsToggle = false;
        this.strengthIsToggle = false;
        this.accountIsToggle = false;
    }

    dropdownToggle(btnName: string): void {

        if (btnName === 'account') {
            this.accountIsToggle = !this.accountIsToggle;
            this.strengthIsToggle = false;

        } else {
            this.strengthIsToggle = !this.strengthIsToggle;
            this.accountIsToggle = false;
        }
    }

    logout():void {
        this.authService.logout().subscribe({
            next: () => {
                this.store.dispatch(authActions.auth_logout());
                this.router.navigate(['/']);
                this.menuToggle();
            }
        })
    }

}
