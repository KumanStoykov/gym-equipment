import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from './auth/auth.service';
import * as authSelectors from './+store/authStore/selector';
import * as authActions from './+store/authStore/actions';
import { IAuthState } from './+store/authStore/reducers';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    message$: Observable<authActions.messageProps | null> = this.store.select(authSelectors.selectMessage);



    constructor(
        private authService: AuthService,
        private store: Store<IAuthState>
    ) { }

    ngOnInit(): void {
        this.authService.checkUser();
    }
}
