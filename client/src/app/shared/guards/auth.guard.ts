import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of } from 'rxjs';
import { IAuthState } from 'src/app/+store/authStore/reducers';
import { UserService } from 'src/app/user/user.service';
import * as authActions from '../../+store/authStore/actions';

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
        if (childRoute.url[0].path === 'checkout' || childRoute.url[0].path === 'wishlist') {
            return true;
        }

        if (childRoute.url[0].path === 'login' || childRoute.url[0].path === 'register') {
            return this.userService.loadProfile().pipe(
                catchError(() => {
                    return of(null);
                }),
                map(user => {
                    console.log(childRoute.url[0])
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
