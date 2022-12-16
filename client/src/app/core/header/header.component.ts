import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { faCartShopping , faArrowRightFromBracket, faUser, faGears } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faUser as faUseRegular } from '@fortawesome/free-regular-svg-icons';


import { AuthService } from 'src/app/auth/auth.service';
import * as authSelectors from '../../+store/selectors';
import * as authActions from '../../+store/actions';
import { IUser } from 'src/app/shared/interfaces';
import { IAuthState } from 'src/app/+store/reducers';
import { cartProps } from '../../+store/actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    icons = {
        faCartShopping,
        faHeart,
        faArrowRightFromBracket,
        faUseRegular,
        faUser,
        faGears

    }

    menuIsToggle: boolean = false;
    strengthIsToggle: boolean = false;
    accountIsToggle: boolean = false;

    user$: Observable<IUser | null> = this.store.select(authSelectors.selectUser);
    cart$: Observable<cartProps[]> = this.store.select(authSelectors.selectCart);


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
            this.menuIsToggle = false;

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
