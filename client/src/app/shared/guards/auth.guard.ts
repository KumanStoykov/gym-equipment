import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of } from 'rxjs';
import { IAuthState } from 'src/app/+store/reducers';
import { UserService } from 'src/app/user/user.service';
import * as authActions from '../../+store/actions';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

    constructor(
        private router: Router,
        private userService: UserService,
        private store: Store<IAuthState>
    ) { }
    canActivateChild(
        childRoute: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | boolean {
        if (childRoute.url[0].path === 'cart' || childRoute.url[0].path === 'wishlist') {
            return true;
        }

        if (childRoute.url[0].path === 'login' || childRoute.url[0].path === 'register') {
            return this.userService.loadProfile().pipe(
                catchError(() => {
                    return of(null);
                }),
                map(user => {
                    if (user) {
                        return this.router.parseUrl('/');
                    } else {
                        return true;
                    }
                })
            )

        } else {

            return this.userService.checkUserCredential(childRoute.url[0].path).pipe(
                catchError(() => {
                    return of(null);
                }),
                map(user => {
                    if (!user) {
                        this.store.dispatch(authActions.auth_fail());
                        return this.router.parseUrl('/auth/login');
                    }
                    if (user) {
                        return true;
                    } else {
                        return this.router.parseUrl('/');
                    }
                })
            )
        }
    }

}
