import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from './auth/auth.service';
import * as authSelectors from './+store/selectors';
import * as authActions from './+store/actions';
import { IAuthState } from './+store/reducers';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    message$: Observable<authActions.messageProps | null> = this.store.select(authSelectors.selectMessage);
    title = 'GYM Equipment';


    constructor(
        private authService: AuthService,
        private store: Store<IAuthState>
    ) { }

    ngOnInit(): void {
        this.authService.checkUser();
        this.authService.fetchWishlist();
        this.authService.fetchCart();
    }
}
