import { Component, OnInit } from '@angular/core';
import { faCartShopping, faArrowRightFromBracket, faUser, faGears } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faUser as faUseRegular } from '@fortawesome/free-regular-svg-icons';
import { Observable } from 'rxjs';

import * as authSelectors from '../../+store/selectors';
import * as authActions from '../../+store/actions';
import { IUser } from 'src/app/shared/interfaces';
import { Store } from '@ngrx/store';
import { IAuthState } from 'src/app/+store/reducers';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { cartProps } from '../../+store/actions';
@Component({
    selector: 'app-top-navigation',
    templateUrl: './top-navigation.component.html',
    styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {

    icons = {
        faCartShopping,
        faHeart,
        faArrowRightFromBracket,
        faUseRegular,
        faUser,
        faGears

    }
    accountIsToggle: boolean = false;

    user$: Observable<IUser | null> = this.store.select(authSelectors.selectUser);
    cart$: Observable<cartProps[]> = this.store.select(authSelectors.selectCart);

    constructor(
        private store: Store<IAuthState>,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    handleOutsideClick(): void {
        this.accountIsToggle = false;
    }

    dropdownToggle(): void {
        this.accountIsToggle = !this.accountIsToggle;
    }

    logout(): void {
        this.authService.logout().subscribe({
            next: () => {
                this.store.dispatch(authActions.auth_logout());
                this.router.navigate(['/']);
            }
        })
    }
}
