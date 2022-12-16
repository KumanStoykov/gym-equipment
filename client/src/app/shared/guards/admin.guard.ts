import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of } from 'rxjs';
import { IAuthState } from 'src/app/+store/reducers';
import { UserService } from 'src/app/user/user.service';
import * as authActions from '../../+store/actions';

@Injectable({
	providedIn: 'root'
})
export class AdminGuard implements CanActivate {
	constructor(
		private router: Router,
		private userService: UserService,
		private store: Store<IAuthState>
	) {}

	canActivate(): Observable<boolean | UrlTree> | boolean {
        return this.userService.loadProfile().pipe(
            catchError(() => {
                return of(null);
            }),
            map(user => {
                if(!user) {
                    this.store.dispatch(authActions.auth_fail());
                    return this.router.parseUrl('/auth/login');
                }
                if(user?.isAdmin) {
                    return true;
                } else {
                    return this.router.parseUrl('/');
                }
            })
        )
	}

}
